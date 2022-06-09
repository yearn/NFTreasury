import	React, {ReactElement}	from	'react';
import	{Button}				from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';
import { useRouter } 			from 	'next/router'


function	Index(): ReactElement {
	const router = useRouter()
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
						<WithShadow role={'button'} >
							<Button className={'w-[176px]'} onClick={(e: React.MouseEvent) => { e.preventDefault(); router.push('/create-treasury') }}>
								{'Lets Start'}
							</Button>
						</WithShadow>
					</div>

					<div className={'ml-8'}>
						<WithShadow role={'button'}>
							<Button variant={'outlined'} className={'w-[176px]'} onClick={(e: React.MouseEvent) => { e.preventDefault(); router.push('/about2') }}>
								{'Learn More'}
							</Button>
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
