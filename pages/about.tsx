import	React, {ReactElement}	from	'react';
import	{Button}				from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';

function	Index(): ReactElement {
	return (
		<section className={'flex h-full items-center'}>
			<div className={'w-8/12'}>
				<div>
					<h1>{'NFTreasury.'}</h1>
					<h3 className={'mt-6'}>{'A treasury management tool for NFT projects.'}</h3>
					<h3>{'Powered by Yearn.'}</h3>
				</div>
				<div className={'flex justify-start mt-8'}>
					<div>
						<WithShadow role={'button'}>
							<Button className={'w-[176px]'}>
								{'Lets Start'}
							</Button>
						</WithShadow>
					</div>

					<div className={'ml-6'}>
						<WithShadow role={'button'}>
							<Button variant={'outlined'} className={'w-[176px]'}>
								{'Learn More'}
							</Button>
						</WithShadow>
					</div>
				</div>
			</div>
			<WithShadow>
				<div>
					<img className={'w-[480px] h-[480px]'} src={'./placeholder.gif'}></img>
				</div>
			</WithShadow>
		</section>
	);
}

export default Index;
