import	React, {ReactElement, useState}				from	'react';
import	{useRouter}									from	'next/router';
import	{ethers, BigNumber}							from	'ethers';
import	useSWR										from	'swr';
import	axios										from	'axios';
import	{useWeb3}									from	'@yearn-finance/web-lib/contexts';
import	{Card, Button}								from	'@yearn-finance/web-lib/components';
import	{format, performBatchedUpdates, toAddress}	from	'@yearn-finance/web-lib/utils';
import	useWallet									from	'contexts/useWallet';
import	WithShadow									from	'components/WithShadow';
import	useCowSwap									from	'contexts/useCowSwap';
import	type {TCowSwapQuote}						from	'types/types';

const fetcher = async (url: string, data: unknown): Promise<TCowSwapQuote> => axios.post(url, data).then((res): TCowSwapQuote => res.data);

function	EstimateGasRow({cowswapFees = 0}): ReactElement {
	const	{currentGasPrice} = useWallet();
	const	[currentEstimate, set_currentEstimate] = React.useState(0);

	React.useEffect((): void => {
		const	gas = Number(format.units(currentGasPrice, 'ether'));
		const	zapCost = gas * 111753;
		const	approveCost = gas * 46076;
		set_currentEstimate(zapCost + approveCost + cowswapFees); 
	}, [currentGasPrice, cowswapFees]);

	return (
		<div className={'flex flex-col justify-between md:flex-row'}>
			<span>
				<p>{'Est. gas cost for all steps'}</p>
				<p>{'(wrap, approve, sign)'}</p>
			</span>
			<span className={'font-bold'}>
				{`${format.amount(Number(currentEstimate.toFixed(8)), 8, 8)} ETH`}
			</span>
		</div>
	);
}

function	SwapEthPage(): ReactElement {
	const	router = useRouter();
	const	{address, isActive} = useWeb3();
	const	{balances, useWalletNonce} = useWallet();
	const	{set_cowSwapQuote} = useCowSwap();
	const	[ethToWrap, set_ethToWrap] = useState<BigNumber>(ethers.constants.Zero);
	const	[inputValue, set_inputValue] = useState('0');
	const	[percentage, set_percentage] = useState(0);
	const	[balance, set_balance] = useState({raw: ethers.constants.Zero, normalized: 0});
	const	[validTo, set_validTo] = useState(Math.round((new Date().setMinutes(new Date().getMinutes() + 10) / 1000)));

	const	quote = {
		from: address,
		sellToken: process.env.WETH_TOKEN_ADDRESS,
		buyToken: process.env.USDC_TOKEN_ADDRESS,
		receiver: address,
		appData: process.env.COW_APP_DATA,
		partiallyFillable: false,
		kind: 'sell',
		validTo,
		sellAmountBeforeFee: ethers.utils.parseEther(Number(inputValue).toFixed(18)).toString()
	};
	const	{data: quoteData, error} = useSWR(inputValue !== '0' ? ['https://api.cow.fi/mainnet/api/v1/quote', quote] : null, fetcher);

	// Update validTo every minutes
	React.useEffect((): () => void => {
		const	interval = setInterval((): void => {
			set_validTo(Math.round((new Date().setMinutes(new Date().getMinutes() + 10) / 1000)));
		}, 60000);
		return (): void => clearInterval(interval);
	}, []);

	// Init the balance once available
	React.useEffect((): void => {
		set_balance({
			raw:  balances[toAddress('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')]?.raw || ethers.constants.Zero,
			normalized:  balances[toAddress('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')]?.normalized || 0
		});
	}, [balances, useWalletNonce]);

	//check if value match a percentage. ValueN could be set as useMemo
	React.useEffect((): void => {
		const value20 = String((balance.normalized / 100) * 20);
		const value40 = String((balance.normalized / 100) * 40);
		const value60 = String((balance.normalized / 100) * 60);
		const value80 = String((balance.normalized / 100) * 80);
		if (inputValue === value20) {
			set_percentage(20);
		} else if  (inputValue === value40) {
			set_percentage(40);
		} else if  (inputValue === value60) {
			set_percentage(60);
		} else if  (inputValue === value80) {
			set_percentage(80);
		} else {
			set_percentage(0);
		}
	}, [balance, inputValue]);

	const	onStartSwap = (): void => {
		if (quoteData) {
			set_cowSwapQuote(quoteData);
			router.push('/wrap-eth');
			// router.push('/final-final-step');
		}
	};

	const	onInputChange = (_newValue: string): void => {
		performBatchedUpdates((): void => {
			const	newValue = _newValue;
			const	newRawValue = ethers.utils.parseUnits(Number(_newValue).toFixed(18), 18);

			if ((balance.raw).sub(newRawValue).isNegative()) {
				set_inputValue(String(balance.normalized));
				set_ethToWrap(balance.raw);
				return;
			}
			set_inputValue(newValue);
			set_ethToWrap(newRawValue);
		});
	};

	const	onPercentageChange = (_percentage: number): void => {
		const value = String((balance.normalized / 100) * _percentage);
		set_inputValue(value);
		set_ethToWrap(ethers.utils.parseUnits(Number(value).toFixed(18), 18));
	};

	const	buyAmountWithSlippage = (): string => {
		if (quoteData?.quote?.buyAmount) {
			const	buyAmount = Number(ethers.utils.formatUnits(quoteData?.quote?.buyAmount, 6));
			const	buyAmountWithSlippage = ethers.utils.parseUnits((buyAmount * (1 - Number(process.env.DEFAULT_SLIPPAGE_COWSWAP))).toFixed(6), 6);
			return (format.amount(Number(format.units(buyAmountWithSlippage, 6)), 2, 2));
		}
		return '';
	};

	return (
		<div className={'nftreasury--app-wrapper'}>
			<WithShadow role={'large'}>
				<Card className={'nftreasury--app-card'}>
					<div className={'w-full'}>
						<div className={'w-full pb-6'}>
							<h2 className={'font-bold'}>{'You are keeping'}</h2>
							<h2 className={'font-bold'}>
								{`${(balance.normalized).toFixed(8)} ETH`}
							</h2>
						</div>
						<div className={'w-full space-y-4 text-justify'}>
							<p>{'How much of it do you wanna swap to USDC?'}</p>
							<div className={'flex items-center'}>
								<input
									className={'h-10 w-6/12 border-2 border-primary-500 p-2 ring-0 focus:border-primary-500 focus:!outline-none focus:!ring-0'}
									type={'number'}
									min={0}
									max={Number(balance.normalized)}
									value={inputValue}
									onChange={(e): void => onInputChange(e.target.value)} />
								<button
									aria-selected={percentage === 20}
									className={'nftreasury--button-percentage'}
									onClick={(): void => onPercentageChange(20)}>
									{'20 %'}
								</button>
								<button
									aria-selected={percentage === 40}
									className={'nftreasury--button-percentage'}
									onClick={(): void => onPercentageChange(40)}>
									{'40 %'}
								</button>
								<button
									aria-selected={percentage === 60}
									className={'nftreasury--button-percentage'}
									onClick={(): void => onPercentageChange(60)}>
									{'60 %'}
								</button>
								<button
									aria-selected={percentage === 80}
									className={'nftreasury--button-percentage'}
									onClick={(): void => onPercentageChange(80)}>
									{'80 %'}
								</button>
							</div>
						</div>
					</div>
					<div className={'nftreasury--grey-box mt-4 mb-6 p-4'}>
						<p className={'mb-4 flex flex-col justify-between md:flex-row'}>
							<span>{'You’ll get'}</span>
							<span className={'font-bold'}>
								{!quoteData || error ? '- USDC' : `~ ${buyAmountWithSlippage()} USDC`}
							</span>
						</p>
						<p className={'mb-4 flex flex-col justify-between md:flex-row'}>
							<span>{'You’ll keep'}</span>
							<span className={'font-bold'}>
								{format.bigNumberAsAmount((balance.raw).sub(ethToWrap), 18, 8, 'ETH')}
							</span>
						</p>
						<EstimateGasRow
							cowswapFees={quoteData ? format.toNormalizedValue(format.BN(quoteData.quote.feeAmount as string), 18) : 0} />
					</div>
					<div className={'mt-auto hidden justify-start md:flex'}>
						<WithShadow
							role={'button'}
							isDisabled={!isActive || !address || !quoteData?.quote}
							onClick={onStartSwap}>
							<Button
								isDisabled={!isActive || !address || !quoteData?.quote}
								className={'w-[176px]'}>
								{'Tap'}
							</Button>
						</WithShadow>
					</div>
				</Card>
			</WithShadow>
		</div>
	);
}

export default SwapEthPage;