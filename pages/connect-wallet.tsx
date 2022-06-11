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
						<div className={'flex flex-row justify-between pb-6 w-full'}>
							<h2 className={'font-bold'}>{'Connect project'}</h2>
						</div>
						<div className={'space-y-6 w-10/12 text-justify'}>
							<p>
								{'Connect your NFT project wallet that has money you want to invest.'}
							</p>
							<p>
								{'We know you like clicking buttons.'}
							</p>
						</div>
					</div>
					<div className={'flex justify-start'}>
						<div>
							<WithShadow role={'button'}>
								<Link href={'/keep-eth'}>
									<Button className={'w-[176px]'}>
										{'Click'}
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