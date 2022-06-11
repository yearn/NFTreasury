import	React, {ReactElement}	from	'react';
import	Link					from	'next/link';
import	{Card, Button}			from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';

function	DisclaimerPage(): ReactElement {
	return (
		<div className={'flex items-center h-full'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-[600px] h-[500px]'}>
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
						<WithShadow role={'button'}>
							<Link href={'/keep-eth'}>
								<Button className={'w-[176px]'}>
									{'Deposit'}
								</Button>
							</Link>
						</WithShadow>
						<WithShadow role={'button'}>
							<Link href={'/withdraw'}>
								<Button className={'w-[176px]'}>
									{'Withdraw'}
								</Button>
							</Link>
						</WithShadow>
					</div>
				</Card>
			</WithShadow>
		</div>
	);
}

export default DisclaimerPage;