import	React, {ReactElement}	from	'react';
import	{Button}				from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';
import	Link					from	'next/link';

function	Index(): ReactElement {
	return (
		<section className={'flex items-center h-full'}>
			<div className={'w-8/12'}>
				<div>
					<h1>{'NFTreasury.'}</h1>
					<h3 className={'mt-6'}>{'A treasury management tool for NFT projects.'}</h3>
					<h3>{'Powered by Yearn.'}</h3>
				</div>
				<div className={'flex justify-start mt-8'}>
					<div>
						<WithShadow role={'button'} >
							<Link href={'/create-treasury'}>
								<Button className={'w-[176px]'}>
									{'Lets Start'}
								</Button>
							</Link>
						</WithShadow>
					</div>

					<div className={'ml-8'}>
						<WithShadow role={'button'}>
							<Link href={'/learn-more'}>
								<Button variant={'outlined'} className={'w-[176px]'}>
									{'Learn More'}
								</Button>
							</Link>
						</WithShadow>
					</div>
				</div>
			</div>
			<WithShadow role={'large'}>
				<div>
					<img className={'w-[480px] h-[480px]'} src={'./placeholder.gif'}></img>
				</div>
			</WithShadow>
		</section>
	);
}

export default Index;
