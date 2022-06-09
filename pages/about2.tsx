import	React, {ReactElement}	from	'react';
import	{Button}				from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';
import { useRouter } 			from 	'next/router'


function	Index(): ReactElement {
	const router = useRouter()
	return (
		<section className={'flex h-full items-center'}>
			<div className={''}>
				<div>
					<h2>{'We don’t have a discord'}</h2>
					<h2>{'with 10,000 KRAZY koalas in.'}</h2>
					<h2 className={'mt-8 text-right'}>{'Just The world’s best defi developers.'}</h2>
					<h2 className={'text-right'}>{'Wanna TEAM UP?'}</h2>
				</div>
				<p className={'mt-8 w-7/12'}>
					{'NFTreasury is a simple yet powerful treasury management tool, powered by Yearn. We’ll give you a mix of stables and Eth for your short term project needs, and put your long term assets in a vault to earn yield until you need them. Ready to roll?'}
				</p>
				<div className={'flex justify-start mt-10'}>
					<div>
						<WithShadow role={'button'}>
							<Button className={'w-[176px]'} onClick={(e) => { e.preventDefault(); router.push('/create-treasury') }}>
								{'Create Treasury'}
							</Button>
						</WithShadow>
					</div>

					<div className={'ml-8'}>
						<WithShadow role={'button'}>
							<Button variant={'outlined'} className={'w-[176px]'} onClick={(e) => { e.preventDefault(); router.push('/about3') }}>
								{'Learn More'}
							</Button>
						</WithShadow>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Index;
