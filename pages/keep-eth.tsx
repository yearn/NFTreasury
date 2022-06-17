import	React, {ReactElement, useState}	from	'react';
import	Link							from	'next/link';
import	Image							from	'next/image';
import	{Card, Button}					from	'@yearn-finance/web-lib/components';
import	WithShadow						from	'components/WithShadow';
import	{useWeb3}						from	'@yearn-finance/web-lib/contexts';
import	{useLocalStorage}				from	'@yearn-finance/web-lib/hooks';
import 	{ethers}						from 	'ethers';

function	DisclaimerPage(): ReactElement {
	const [isShowingArrow] = useState(false);
	const {provider, address, isActive} = useWeb3();
	const [balance, set_balance] = useState('0');
	const [inputValue, set_inputValue] = useState('0');
	const [keptEth, set_keptEth] = useLocalStorage('keptEth', '0');

	React.useEffect((): void => {
		isActive && provider.getBalance(address).then((balance: number): void => {
			const balanceInEth = ethers.utils.formatEther(balance);
			set_balance(balanceInEth);
		});
	}, [isActive, address, provider]);

	const set_balancePercentage = (percentage: number): void => {
		const value = String((Number(balance) / 100) * percentage);
		set_inputValue(value);
		set_keptEth(value);
	};
	
	return (
		<div className={'flex items-start pl-0 mt-4 w-full h-full md:items-center md:pl-4 md:mt-0 md:w-6/12'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-[600px] h-[600px]'}>
					<div className={'w-full'}>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'You have'}</h2>
							<h2 className={'font-bold'}>{`${balance} ETH`}</h2>
						</div>
						<div className={'space-y-6 w-full text-justify'}>
							<p  className={'w-10/12'}>
								{'How much ETH do you wanna keep in your wallet? The rest will be sent to Yearn vault.'}
							</p>
							<div className={'flex items-center'}>
								<input
									className={'p-2 w-6/12 h-10 border-2 border-primary'}
									value={inputValue}
									onChange={(e): void => {
										set_inputValue(e.target.value);
										set_keptEth(e.target.value);
									}}
								></input>
								<button className={'block px-1 w-14 h-10 font-bold whitespace-nowrap border-2 !border-l-0'} onClick={(): void => set_balancePercentage(20)}>
									{'20 %'}
								</button>
								<button className={'block px-1 w-14 h-10 font-bold whitespace-nowrap border-2 !border-l-0'} onClick={(): void => set_balancePercentage(40)}>
									{'40 %'}
								</button>
								<button className={'block px-1 w-14 h-10 font-bold whitespace-nowrap border-2 !border-l-0'} onClick={(): void => set_balancePercentage(60)}>
									{'60 %'}
								</button>
								<button className={'block px-1 w-14 h-10 font-bold whitespace-nowrap border-2 !border-l-0'} onClick={(): void => set_balancePercentage(80)}>
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
							<span className={'font-bold'}>{`${Number(balance) - Number(keptEth)} ETH`}</span>
						</p>
						<p className={'flex justify-between mb-4'}>
							<span>{'APR'}</span>
							<span className={'font-bold'}>{'69,69 %'}</span>
						</p>
						<p className={'flex justify-between'}>
							<span>{'Est. gas cost for deposit'}</span>
							<span className={'font-bold'}>{'00,03 ETH'}</span>
						</p>
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

export default DisclaimerPage;