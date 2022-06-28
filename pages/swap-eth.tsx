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

function	SwapEthPage(): ReactElement {
	const	router = useRouter();
	const	{address, isActive} = useWeb3();
	const	{balances, useWalletNonce} = useWallet();
	const	{set_cowSwapQuote} = useCowSwap();
	const	[ethToWrap, set_ethToWrap] = useState<BigNumber>(ethers.constants.Zero);
	const	[inputValue, set_inputValue] = useState('0');
	const	[percentage, set_percentage] = useState(0);
	const	[balance, set_balance] = useState({raw: ethers.constants.Zero, normalized: 0});

	const	quote = {
		sellToken: process.env.WETH_TOKEN_ADDRESS,
		buyToken: process.env.USDC_TOKEN_ADDRESS,
		receiver: address,
		appData: process.env.COW_APP_DATA,
		partiallyFillable: false,
		from: address,
		kind: 'sell',
		sellAmountBeforeFee: ethers.utils.parseEther(Number(inputValue).toFixed(18)).toString()
	};
	const	{data: quoteData, error} = useSWR(inputValue !== '0' ? ['https://barn.api.cow.fi/mainnet/api/v1/quote', quote] : null, fetcher);

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


	return (
		<div className={'nftreasury--app-wrapper'}>
			<WithShadow role={'large'}>
				<Card className={'nftreasury--app-card'}>
					<div className={'w-full'}>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'You are keeping'}</h2>
							<h2 className={'font-bold'}>
								{`${(balance.normalized).toFixed(8)} ETH`}
							</h2>
						</div>
						<div className={'space-y-4 w-full text-justify'}>
							<p>{'How much of it do you wanna swap to USDC?'}</p>
							<div className={'flex items-center'}>
								<input
									className={'p-2 w-6/12 h-10 border-2 focus:!outline-none ring-0 focus:!ring-0 border-primary-500 focus:border-primary-500'}
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
					<div className={'p-4 mt-4 mb-6 nftreasury--grey-box'}>
						<p className={'flex justify-between mb-4 flex-col md:flex-row'}>
							<span>{'You’ll get'}</span>
							<span className={'font-bold'}>
								{!quoteData || error ? '- USDC' : `${format.amount(Number(format.units(quoteData?.quote?.buyAmount, 6)), 2, 2)} USDC`}
							</span>
						</p>
						<p className={'flex justify-between mb-4 flex-col md:flex-row'}>
							<span>{'You’ll keep'}</span>
							<span className={'font-bold'}>
								{format.bigNumberAsAmount((balance.raw).sub(ethToWrap), 18, 8, 'ETH')}
							</span>
						</p>
						<div className={'flex justify-between flex-col md:flex-row'}>
							<span>
								<p>{'Est. gas cost for all steps'}</p>
								<p>{'(wrap, approve, sign)'}</p>
							</span>
							<span className={'font-bold'}>{'0,0323445 ETH'}</span>
						</div>
					</div>
					<div className={'hidden justify-start mt-auto md:flex'}>
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