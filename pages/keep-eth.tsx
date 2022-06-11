import	React, {ReactElement}	from	'react';
import	Link					from	'next/link';
import	{Card, Button}			from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';

function	DisclaimerPage(): ReactElement {
	return (
		<div className={'flex items-center h-full'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-[600px] h-[500px]'}>
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
								<input className={' w-6/12 h-10 border-2 border-primary'}>
								</input>
								<Button variant={'outlined'} className={'w-14 p-1 font-bold'}>
									{'20 %'}
								</Button>
								<Button variant={'outlined'} className={'w-14 p-1 font-bold'}>
									{'40 %'}
								</Button>
								<Button variant={'outlined'} className={'w-14 p-1 font-bold'}>
									{'60 %'}
								</Button>
								<Button variant={'outlined'} className={'w-14 p-1 font-bold'}>
									{'80 %'}
								</Button>
							</div>
							<p>
								{'Next step we’ll swap some ETH to USDC.'}
							</p>
						</div>
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