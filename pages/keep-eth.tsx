import	React, {ReactElement}	from	'react';
import	Link					from	'next/link';
import	{Card, Button}			from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';

function	DisclaimerPage(): ReactElement {
	return (
		<div className={'flex items-center w-6/12 h-full'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-full h-[500px]'}>
					<div>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'You have'}</h2>
							<h2 className={'font-bold'}>{'123.12345678 ETH'}</h2>
						</div>
						<div className={'space-y-6 w-10/12 text-justify'}>
							<p>
								{'How much ETH do you wanna keep in your wallet? The rest will be sent to Yearn vault.'}
							</p>
							<p>
								{'Next step we’ll swap some ETH to USDC.'}
							</p>
						</div>
					</div>
					<div className={'flex justify-start'}>
						<div>
							<WithShadow role={'button'}>
								<Link href={'/swap-eth'}>
									<Button className={'w-[176px]'}>
										{'Click-click'}
									</Button>
								</Link>
							</WithShadow>
						</div>
					</div>
				</Card>
			</WithShadow>
		</div>
	);
}

export default DisclaimerPage;