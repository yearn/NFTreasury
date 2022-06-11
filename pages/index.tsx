import	React, {ReactElement}	from	'react';
import	{motion}				from	'framer-motion';
import	{Button}				from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';
import	Link					from	'next/link';
import	Image					from	'next/image';

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
						<Link href={'/connect-wallet'}>
							<div>
								<WithShadow role={'button'} >
									<Button className={'w-[176px]'}>
										{'Lets Start'}
									</Button>
								</WithShadow>
							</div>
						</Link>
					</div>

					<div className={'ml-8'}>
						<Link href={'/learn-more'}>
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
			<motion.div
				initial={{scale: 0, opacity: 0}}
				animate={{scale: 1, opacity: 1, transition: {duration: 0.4, type: 'spring', bounce: 0.5, damping: 6, restSpeed: 0.5}}}
				exit={{scale: 0, opacity: 0, transition: {duration: 0.3, ease: [0.17, 0.67, 0.83, 0.67]}}}>
				<WithShadow role={'large'}>
					<Image
						width={480}
						height={480}
						className={'w-[480px] h-[480px] align-middle'}
						src={'/placeholder.gif'}
					/>
				</WithShadow>
			</motion.div>
		</section>
	);
}

export default Index;
