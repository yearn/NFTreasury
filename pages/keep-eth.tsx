import	React, {ReactElement}	from	'react';
import	Link					from	'next/link';
import	{Card, Button}			from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';

function	DisclaimerPage(): ReactElement {
	return (
		<div className={'flex items-start pl-0 mt-4 w-full h-full md:items-center md:pl-4 md:mt-0 md:w-6/12'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-[600px] h-[600px]'}>
					<div className={'w-full'}>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'You have'}</h2>
							<h2 className={'font-bold'}>{'123.12345678 ETH'}</h2>
						</div>
						<div className={'space-y-6 w-full text-justify'}>
							<p  className={'w-10/12'}>
								{'How much ETH do you wanna keep in your wallet? The rest will be sent to Yearn vault.'}
							</p>
							<div className={'flex items-center'}>
								<input className={'w-6/12 h-10 border-2 border-primary'}>
								</input>
								<button className={'block px-1 w-14 h-10 font-bold whitespace-nowrap border-2 !border-l-0'}>
									{'20 %'}
								</button>
								<button className={'block px-1 w-14 h-10 font-bold whitespace-nowrap border-2 !border-l-0'}>
									{'40 %'}
								</button>
								<button className={'block px-1 w-14 h-10 font-bold whitespace-nowrap border-2 !border-l-0'}>
									{'60 %'}
								</button>
								<button className={'block px-1 w-14 h-10 font-bold whitespace-nowrap border-2 !border-l-0'}>
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
							<span className={'font-bold'}>{'98,4320982 ETH'}</span>
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
		</div>
	);
}

export default DisclaimerPage;