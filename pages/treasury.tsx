import	React, {ReactElement}	from	'react';
import	Link					from	'next/link';
import	{Card, Button}			from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';

function	DisclaimerPage(): ReactElement {
	return (
		<div className={'flex items-center h-full'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-[600px] h-[600px]'}>
					<div>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'Your Treasury'}</h2>
						</div>
						<div className={'space-y-6 w-10/12 text-justify'}>
							<p>
								{'Holdings, ETH'}
							</p>
						</div>
					</div>
					<div className={'flex justify-start'}>
						<Link href={'/keep-eth'}>
							<div>
								<WithShadow role={'button'}>
										<Button className={'w-[176px]'}>
											{'Deposit'}
										</Button>
								</WithShadow>
							</div>
						</Link>
						<Link href={'/withdraw'}>
							<div>
								<WithShadow role={'button'}>
										<Button className={'w-[176px]'}>
											{'Withdraw'}
										</Button>
								</WithShadow>
							</div>
						</Link>
					</div>
				</Card>
			</WithShadow>
			<div className={'ml-32'}>
				<WithShadow role={'large'}>
					<Card className={'flex flex-col justify-between w-[400px] h-[600px]'}>
						<div>
							<div className={'pb-6 w-full'}>
								<h2 className={'font-bold'}>{'Your Wallet'}</h2>
							</div>
							<div className={'space-y-6 w-10/12 text-justify'}>
								<p>
									{'ETH'}
								</p>
							</div>
						</div>
						<div className={'flex justify-start'}>
							<Link href={'/keep-eth'}>
								<div>
									<WithShadow role={'button'}>
											<Button className={'w-[176px]'}>
												{'Swap'}
											</Button>
									</WithShadow>
								</div>
							</Link>
						</div>
					</Card>
				</WithShadow>
			</div>
		</div>
	);
}

export default DisclaimerPage;