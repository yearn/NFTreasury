import	React, {ReactElement, useState}	from	'react';
import	Link							from	'next/link';
import	Image							from	'next/image';
import	{Card, Button}					from	'@yearn-finance/web-lib/components';
import	WithShadow						from	'components/WithShadow';
import	{useLocalStorage}				from	'@yearn-finance/web-lib/hooks';

function	SwapEthPage(): ReactElement {
	const [isShowingArrow] = useState(false);
	const [inputValue, set_inputValue] = useState('0');
	const [keptEth, set_keptEth] = useLocalStorage("keptEth", "0");
	const [ethToSwap, set_ethToSwap] = useLocalStorage("ethToSwap", "0");

	const set_balancePercentage = (percentage: number): void => {
		const value = String((Number(keptEth) / 100) * percentage)
		set_inputValue(value);
		set_ethToSwap(value);
	};
	

	return (
		<div className={'flex items-start pl-0 mt-4 w-full h-full md:items-center md:pl-4 md:mt-0 md:w-6/12'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-[600px] h-[600px]'}>
					<div className={'w-full'}>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'You are keeping'}</h2>
							<h2 className={'font-bold'}>{`${keptEth} ETH`}</h2>
						</div>
						<div className={'space-y-6 w-full text-justify'}>
							<p  className={'w-10/12'}>
								{'How much of it do you wanna swap to USDC?'}
							</p>
							<div className={'flex items-center'}>
								<input
									className={'p-2 w-6/12 h-10 border-2 border-primary'}
									value={inputValue}
									onChange={(e): void => {
										set_inputValue(e.target.value);
										set_ethToSwap(e.target.value);
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
					<div className={'p-4 grey-box'}>
						<p className={'flex justify-between mb-4'}>
							<span>{'You’ll get'}</span>
							<span className={'font-bold'}>{'2.534,53 USDC'}</span>
						</p>
						<p className={'flex justify-between mb-4'}>
							<span>{'You’ll keep'}</span>
							<span className={'font-bold'}>{`${Number(keptEth) - Number(ethToSwap)} ETH`}</span>
						</p>
						<p className={'flex justify-between'}>
							<span>
								<p>{'Est. gas cost for all steps'}</p>
								<p>{'(wrap, approve, sign)'}</p>
							</span>
							<span className={'font-bold'}>{'00,0323445 ETH'}</span>
						</p>
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