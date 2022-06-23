import	React, {ReactElement, useState}		from	'react';
import	{useRouter}							from	'next/router';
import	Image								from	'next/image';
import	{ethers}							from	'ethers';
import	useSWR								from	'swr';
import	axios, {AxiosResponse}				from	'axios';
import	{useWeb3}							from	'@yearn-finance/web-lib';
import	{Card, Button}						from	'@yearn-finance/web-lib/components';
import	{format, performBatchedUpdates}		from	'@yearn-finance/web-lib/utils';
import	{domain, SigningScheme, signOrder}	from	'@gnosis.pm/gp-v2-contracts';
import	GPv2SettlementArtefact				from	'@gnosis.pm/gp-v2-contracts/deployments/mainnet/GPv2Settlement.json';
import	WithShadow							from	'components/WithShadow';
import	useFlow								from	'contexts/useFlow';


const fetcher = async (url: string, data: unknown): Promise<any> => axios.post(url, data).then((res): AxiosResponse => res.data);

function	SwapEthPage(): ReactElement {
	const	router = useRouter();
	const	{provider, address, isActive} = useWeb3();
	const	{ethToSwap, set_ethToSwap, keptEth} = useFlow();
	const	[isShowingArrow] = useState(false);
	const	[inputValue, set_inputValue] = useState('0');
	const	[percentage, set_percentage] = useState(0);

	const	quote = {
		sellToken: process.env.WETH_TOKEN_ADDRESS,
		buyToken: process.env.USDC_TOKEN_ADDRESS,
		receiver: address,
		appData: '0x0000000000000000000000000000000000000000000000000000000000000000',
		partiallyFillable: false,
		from: address,
		kind: 'sell',
		sellAmountBeforeFee: ethers.utils.parseEther(inputValue).toString()
	};
	const	{data: quoteData, error} = useSWR(inputValue !== '0' ? ['https://barn.api.cow.fi/rinkeby/api/v1/quote', quote] : null, fetcher);

	//check if value match a percentage. ValueN could be set as useMemo
	React.useEffect((): void => {
		const normalizedKeepEth = format.toNormalizedValue(keptEth, 18);
		const value20 = String((normalizedKeepEth / 100) * 20);
		const value40 = String((normalizedKeepEth / 100) * 40);
		const value60 = String((normalizedKeepEth / 100) * 60);
		const value80 = String((normalizedKeepEth / 100) * 80);
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
	}, [keptEth, inputValue]);

	console.log(quoteData);
	async function	onSignOrder(): Promise<void> {
		if (quoteData?.quote) {
			const	signer = provider.getSigner();
			const rawSignature = await signOrder(
				domain(1, '0x9008D19f58AAbD9eD0D60971565AA8510560ab41'),
				quoteData.quote,
				signer,
				// "signingScheme": "presign"
				SigningScheme.PRESIGN as any
			);
			const signature = ethers.utils.joinSignature(rawSignature.data);
			console.log(signature);

			const	{data} = await axios.post('https://barn.api.cow.fi/rinkeby/api/v1/transaction', {
				...quoteData?.quote,
				quoteId: quoteData.quote.id,
				signature
			});
			if (data.status === 201) {
				console.log('order accepted');
				const uid = quoteData.quote.id;
				const TRADE_TIMEOUT_SECONDS = 30*60;
				const cowSettlementContract = new ethers.Contract('0x9008D19f58AAbD9eD0D60971565AA8510560ab41', GPv2SettlementArtefact.abi, provider);
				const traded = new Promise((resolve: (value: boolean) => void): void => {
					provider.on(cowSettlementContract.filters.Trade(signer), (log: any): void => {
						// Hacky way to verify that the UID is part of the event data
						if (log.data.includes(uid.substring(2))) {
							resolve(true);
						}
					});
				});

				const timeout = new Promise((resolve: (value: boolean) => void): void => {
					setTimeout(resolve, TRADE_TIMEOUT_SECONDS*1000, false);
				});
					
				const hasTraded = await Promise.race([traded, timeout]);
				console.log({hasTraded});

			}
		}
	}

	const onInputChange = (_newValue: string): void => {
		performBatchedUpdates((): void => {
			const	newValue = _newValue;
			const	newRawValue = ethers.utils.parseUnits(Number(_newValue).toFixed(18), 18);

			if ((keptEth).sub(newRawValue).isNegative()) {
				const normalizedKeepEth = format.toNormalizedValue(keptEth, 18);
				set_inputValue(String(normalizedKeepEth));
				set_ethToSwap(keptEth);
				return;
			}
			set_inputValue(newValue);
			set_ethToSwap(newRawValue);
		});
	};

	const onPercentageChange = (_percentage: number): void => {
		const value = String((format.toNormalizedValue(keptEth, 18) / 100) * _percentage);
		set_inputValue(value);
		set_ethToSwap(ethers.utils.parseUnits(Number(value).toFixed(18), 18));
	};

	return (
		<div className={'flex items-start pl-0 mt-4 w-full h-full md:items-center md:pl-4 md:mt-0 md:w-6/12'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col w-[544px] h-[544px]'}>
					<div className={'w-full'}>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'You are keeping'}</h2>
							<h2 className={'font-bold'}>
								{format.bigNumberAsAmount(keptEth, 18, 8, 'ETH')}
							</h2>
						</div>
						<div className={'space-y-4 w-full text-justify'}>
							<p>{'How much of it do you wanna swap to USDC?'}</p>
							<div className={'flex items-center'}>
								<input
									className={'p-2 w-6/12 h-10 border-2 focus:!outline-none ring-0 focus:!ring-0 border-primary-500 focus:border-primary-500'}
									type={'number'}
									min={0}
									max={format.toNormalizedValue(keptEth, 18)}
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
					<div className={'p-4 mt-4 mb-6 grey-box'}>
						<p className={'flex justify-between mb-4'}>
							<span>{'You’ll get'}</span>
							<span className={'font-bold'}>
								{!quoteData || error ? '- USDC' : `${format.amount(Number(format.units(quoteData?.quote?.buyAmount, 6)), 2, 2)} USDC`}
							</span>
						</p>
						<p className={'flex justify-between mb-4'}>
							<span>{'You’ll keep'}</span>
							<span className={'font-bold'}>
								{format.bigNumberAsAmount(keptEth.sub(ethToSwap), 18, 8, 'ETH')}
							</span>
						</p>
						<div className={'flex justify-between'}>
							<span>
								<p>{'Est. gas cost for all steps'}</p>
								<p>{'(wrap, approve, sign)'}</p>
							</span>
							<span className={'font-bold'}>{'0,0323445 ETH'}</span>
						</div>
					</div>
					<div className={'flex justify-start mt-auto'}>
						<WithShadow role={'button'} isDisabled={!quoteData?.quote} onClick={onSignOrder}>
							<Button isDisabled={!quoteData?.quote} className={'w-[176px]'}>
								{'Tap'}
							</Button>
						</WithShadow>
					</div>
				</Card>
			</WithShadow>
			<div className={'flex justify-center items-start min-w-[500px] h-[544px]'}>
				<Image
					width={367}
					height={271}
					quality={90}
					src={'/swap-eth.svg'}
					className={`transition duration-1000 ease-in-out ${isShowingArrow ? 'opacity-100' : 'opacity-0'}`} />
			</div>
		</div>
	);
}

export default SwapEthPage;