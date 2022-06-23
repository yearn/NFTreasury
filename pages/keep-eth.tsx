import	React, {ReactElement, useState}				from	'react';
import	Link										from	'next/link';
import	Image										from	'next/image';
import	{ethers}									from	'ethers';
import	{Card, Button}								from	'@yearn-finance/web-lib/components';
import	{format, performBatchedUpdates, toAddress}	from	'@yearn-finance/web-lib/utils';
import	WithShadow									from	'components/WithShadow';
import	useFlow										from	'contexts/useFlow';
import	useWallet									from	'contexts/useWallet';

function	EstimateGasRow(): ReactElement {
	const	{currentGasPrice} = useWallet();
	const	[currentEstimate, set_currentEstimate] = React.useState(0);

	React.useEffect((): void => {
		const	gas = Number(format.units(currentGasPrice, 'ether'));
		set_currentEstimate(gas * 88600);
	}, [currentGasPrice]);

	return (
		<p className={'flex justify-between'}>
			<span>{'Est. gas cost for deposit'}</span>
			<span className={'font-bold'}>
				{`${currentEstimate.toFixed(8)} ETH`}
			</span>
		</p>
	);
}

function	KeepEthPage(): ReactElement {
	const	{keptEth, set_keptEth} = useFlow();
	const	{balances, useWalletNonce} = useWallet();
	const	[isShowingArrow] = useState(false);
	const	[balance, set_balance] = useState({raw: ethers.constants.Zero, normalized: 0});
	const	[percentage, set_percentage] = useState(0);
	const	[inputValue, set_inputValue] = useState('0');

	//Init the balance once available
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

	//trigger the update of inputValue (as string) and keptEth (as BigNumber) on input type
	const onInputChange = (_newValue: string): void => {
		performBatchedUpdates((): void => {
			const	newValue = _newValue;
			const	newRawValue = ethers.utils.parseUnits(Number(_newValue).toFixed(18), 18);

			if ((balance.raw).sub(newRawValue).isNegative()) {
				set_inputValue(String(balance.normalized));
				set_keptEth(balance.raw);
				return;
			}
			set_inputValue(newValue);
			set_keptEth(newRawValue);
		});
	};

	const onPercentageChange = (_percentage: number): void => {
		const value = String((balance.normalized / 100) * _percentage);
		set_inputValue(value);
		set_keptEth(ethers.utils.parseUnits(Number(value).toFixed(18), 18));
	};
	
	return (
		<div className={'flex items-start pl-0 mt-4 w-full h-full md:items-center md:pl-4 md:mt-0 md:w-6/12'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-[600px] h-[600px]'}>
					<div className={'w-full'}>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'You have'}</h2>
							<h2 className={'font-bold'}>
								{`${(balance.normalized).toFixed(8)} ETH`}
							</h2>
						</div>
						<div className={'space-y-6 w-full text-justify'}>
							<p  className={'w-10/12'}>
								{'How much ETH do you wanna keep in your wallet? The rest will be sent to Yearn vault.'}
							</p>
							<div className={'flex items-center'}>
								<input
									className={'p-2 w-6/12 h-10 border-2 focus:!outline-none ring-0 focus:!ring-0 border-primary-500 focus:border-primary-500'}
									type={'number'}
									min={0}
									max={Number(balance)}
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
					<p>
						{'Next step we’ll swap some ETH to USDC.'}
					</p>
					<div className={'p-4 grey-box'}>
						<p className={'flex justify-between mb-4'}>
							<span>{'Deposit into Vault'}</span>
							<span className={'font-bold'}>
								{format.bigNumberAsAmount((balance.raw).sub(keptEth), 18, 8, 'ETH')}
							</span>
						</p>
						<p className={'flex justify-between mb-4'}>
							<span>{'APY'}</span>
							<span className={'font-bold'}>{'69,69 %'}</span>
						</p>
						<EstimateGasRow />
					</div>
					<div className={'flex justify-start'}>
						<Link href={'/swap-eth'}>
							<div>
								<WithShadow role={'button'}>
									<Button className={'w-[176px]'}>
										{'Click-click'}
									</Button>
								</WithShadow>
							</div>
						</Link>
					</div>
				</Card>
			</WithShadow>
			<div className={'flex justify-center items-start min-w-[500px] h-[600px]'}>
				<Image width={322} height={258} quality={90} src={'/keep-eth.svg'} className={`transition duration-1000 ease-in-out ${isShowingArrow ? 'opacity-100' : 'opacity-0'}`} />
			</div>
		</div>
	);
}

export default KeepEthPage;