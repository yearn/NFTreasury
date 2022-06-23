import	React, {ReactElement, useState}	from	'react';
import	Link							from	'next/link';
import	Image							from	'next/image';
import	{ethers}						from	'ethers';
import	useSWR							from	'swr';
import	axios, {AxiosResponse}			from	'axios';
import	{useWeb3}						from	'@yearn-finance/web-lib';
import	{Card, Button}					from	'@yearn-finance/web-lib/components';
import	{format, performBatchedUpdates}	from	'@yearn-finance/web-lib/utils';
import	WithShadow						from	'components/WithShadow';
import	useFlow							from	'contexts/useFlow';


const fetcher = async (url: string, data: unknown): Promise<any> => axios.post(url, data).then((res): AxiosResponse => res.data);


function	SwapEthPage(): ReactElement {
	const	{address} = useWeb3();
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
	const	{data: quoteData, error} = useSWR(inputValue !== '0' ? ['https://barn.api.cow.fi/mainnet/api/v1/quote', quote] : null, fetcher);

	console.log(quoteData, error);


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
				<Card className={'flex flex-col justify-between w-[600px] h-[600px]'}>
					<div className={'w-full'}>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'You are keeping'}</h2>
							<h2 className={'font-bold'}>
								{format.bigNumberAsAmount(keptEth, 18, 8, 'ETH')}
							</h2>
						</div>
						<div className={'space-y-6 w-full text-justify'}>
							<p  className={'w-10/12'}>
								{'How much of it do you wanna swap to USDC?'}
							</p>
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
					<div className={'p-4 grey-box'}>
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
							<span className={'font-bold'}>{'00,0323445 ETH'}</span>
						</div>
					</div>
					<div className={'flex justify-start'}>
						<Link href={'/wrap-eth'}>
							<div>
								<WithShadow role={'button'}>
									<Button className={'w-[176px]'}>
										{'Tap'}
									</Button>
								</WithShadow>
							</div>
						</Link>
					</div>
				</Card>
			</WithShadow>
			<div className={'flex justify-center items-start min-w-[500px] h-[600px]'}>
				<Image width={367} height={271} quality={90} src={'/swap-eth.svg'} className={`transition duration-1000 ease-in-out ${isShowingArrow ? 'opacity-100' : 'opacity-0'}`} />
			</div>
		</div>
	);
}

export default SwapEthPage;