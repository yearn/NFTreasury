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
							<h2 className={'font-bold'}>{'Wrap ETH'}</h2>
						</div>
						<div className={'space-y-6 w-10/12 text-justify'}>
							<p>
								{'You have to sign one more transaction. That’s just how it works. Don’t ask...'}
							</p>
						</div>
					</div>
					<div className={'flex justify-start'}>
						<div>
							<WithShadow role={'button'}>
								<Link href={'/execute-swap'}>
									<Button className={'w-[176px]'}>
										{'Hit'}
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