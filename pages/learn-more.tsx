import	React, {ReactElement}	from	'react';
import	{Button}				from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';
import	Link					from	'next/link';

function	Index(): ReactElement {
	return (
		<section className={'flex items-center h-full'}>
			<div>
				<div>
					<h2>{'We don’t have a discord'}</h2>
					<h2>{'with 10,000 KRAZY koalas in.'}</h2>
					<h2 className={'mt-8 text-right'}>{'Just The world’s best defi developers.'}</h2>
					<h2 className={'text-right'}>{'Wanna TEAM UP?'}</h2>
				</div>
				<p className={'mt-8 w-full md:w-7/12'}>
					{'NFTreasury is a simple yet powerful treasury management tool, powered by Yearn. We’ll give you a mix of stables and Eth for your short term project needs, and put your long term assets in a vault to earn yield until you need them. Ready to roll?'}
				</p>
				<div className={'flex justify-start mt-10'}>
					<div>
						<Link href={'/connect-wallet'}>
							<div>
								<WithShadow role={'button'}>
									<Button className={'w-[176px]'}>
										{'Create Treasury'}
									</Button>
								</WithShadow>
							</div>
						</Link>
					</div>

					<div className={'ml-8'}>
						<Link href={'/how-it-works'}>
							<div>
								<WithShadow role={'button'}>
									<Button variant={'outlined'} className={'w-[176px]'}>
										{'Learn More'}
									</Button>
								</WithShadow>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Index;
