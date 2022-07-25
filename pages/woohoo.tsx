import	React, {ReactElement}	from	'react';
import	Link					from	'next/link';
import	{Card, Button}			from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';

function	DisclaimerPage(): ReactElement {
	return (
		<div className={'flex h-full items-center'}>
			<WithShadow role={'large'}>
				<Card className={'flex h-[544px] w-[544px] flex-col justify-between'}>
					<div>
						<div className={'w-full pb-6'}>
							<h2 className={'font-bold'}>{'Woohoo!'}</h2>
						</div>
						<div className={'w-10/12 space-y-6 text-justify'}>
							<p>
								{'You’re great and now you have a treasury!'}
							</p>
						</div>
					</div>
					<div className={'flex justify-start'}>
						<Link href={'/treasury'}>
							<div>
								<WithShadow role={'button'}>
									<Button className={'w-[176px]'}>
										{'Check It'}
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