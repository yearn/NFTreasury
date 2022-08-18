import	React, {ReactElement}	from	'react';
import	{motion}				from	'framer-motion';
import	{Button}				from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';
import	Link					from	'next/link';
import	Image					from	'next/image';
import	{useWeb3}				from	'@yearn-finance/web-lib/contexts';

function	Gif({
	width = 480,
	height = 480,
	bounce = 0.5,
	damping = 6,
	restSpeed = 0.5
}): ReactElement {
	return (
		<motion.div
			initial={{scale: 0, opacity: 0}}
			animate={{scale: 1, opacity: 1, transition: {duration: 0.4, type: 'spring', bounce, damping, restSpeed}}}
			exit={{scale: 0, opacity: 0, transition: {duration: 0.3, ease: [0.17, 0.67, 0.83, 0.67]}}}>
			<WithShadow role={'large'}>
				<Image
					width={width}
					height={height}
					className={'align-middle'}
					src={'/placeholder.gif'}
				/>
			</WithShadow>
		</motion.div>
	);
}

function	Index(): ReactElement {
	const {isActive} = useWeb3();

	return (
		<section className={'flex h-full flex-col items-center md:flex-row'}>
			<div className={'w-full md:w-8/12'}>
				<div className={'text-center md:text-left'}>
					<h1>{'NFTreasury.'}</h1>
					<h3 className={'mt-1 md:mt-6'}>{'A treasury management tool for NFT projects.'}</h3>
					<h3>{'Powered by Yearn.'}</h3>
				</div>
				<div className={'mx-auto mt-2 mb-4 flex w-full justify-center md:hidden'}>
					<Gif bounce={2} damping={24} />
				</div>
				<div className={'mt-8 flex justify-around space-x-4 md:justify-start md:space-x-8'}>
					<div>
						<Link href={isActive ? '/keep-eth' : '/connect-wallet'}>
							<div>
								<WithShadow role={'button'}>
									<Button>
										{'Lets Start'}
									</Button>
								</WithShadow>
							</div>
						</Link>
					</div>
					<div>
						<Link href={'/learn-more'}>
							<div>
								<WithShadow role={'button'}>
									<Button variant={'outlined'}>
										{'Learn More'}
									</Button>
								</WithShadow>
							</div>
						</Link>
					</div>
				</div>
			</div>
			<div className={'ml-4 hidden md:flex md:w-4/12'}>
				<Gif />
			</div>
		</section>
	);
}

export default Index;
