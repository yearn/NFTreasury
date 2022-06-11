import	React, {ReactElement}	from	'react';
import	Link					from	'next/link';
import	{Card, Button}			from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';

function	DisclaimerPage(): ReactElement {
	return (
		<div className={'flex items-center h-full'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-[700px] h-[600px]'}>
					<div>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'Your Treasury'}</h2>
						</div>
						<div className={'flex justify-between items-center'}>
							<div className={'m-0'}>
								<p>
									{'Holdings, ETH'}
								</p>
								<p className={'font-bold'}>
									{'1234.12345678'}
								</p>
							</div>
							<div className={'m-0'}>
								<p>
									{'Holdings, $'}
								</p>
								<p className={'font-bold'}>
									{'51234.12'}
								</p>
							</div>
							<div>
								<p>
									{'Earnings, ETH'}
								</p>
								<p className={'font-bold'}>
									{'1234.12345678'}
								</p>
							</div>
							<div>
								<p>
									{'Est. Yield, %'}
								</p>
								<p className={'font-bold'}>
									{'12.4'}
								</p>
							</div>
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
						<div className={'ml-6'}>
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
					</div>
				</Card>
			</WithShadow>
			<div className={'ml-24'}>
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