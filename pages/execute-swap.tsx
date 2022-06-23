import	React, {ReactElement, useState}	from	'react';
import	Link							from	'next/link';
import	Image							from	'next/image';
import	{Card, Button}					from	'@yearn-finance/web-lib/components';
import	WithShadow						from	'components/WithShadow';

function	DisclaimerPage(): ReactElement {
	const [isShowingArrow] = useState(false);
	return (
		<div className={'flex items-start pl-0 mt-4 w-full h-full md:items-center md:pl-4 md:mt-0 md:w-6/12'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-[544px] h-[544px]'}>
					<div>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'Final step'}</h2>
						</div>
						<div className={'space-y-6 w-10/12 text-justify'}>
							<p>
								{'For real this time. Let’s just swap your ETH (WETH) to USDC and then you’re done.'}
							</p>
							<p>
								{'Promise'}
							</p>
						</div>
					</div>
					<div className={'flex justify-start'}>
						<Link href={'/final-final-step'}>
							<div>
								<WithShadow role={'button'}>
									<Button className={'w-[176px]'}>
										{'Slam'}
									</Button>
								</WithShadow>
							</div>
						</Link>
					</div>
				</Card>
			</WithShadow>
			<div className={'flex justify-center items-start min-w-[500px] h-[544px]'}>
				<Image width={320} height={285} quality={90} src={'/execute-swap.svg'} className={`transition duration-1000 ease-in-out ${isShowingArrow ? 'opacity-100' : 'opacity-0'}`} />
			</div>
		</div>
	);
}

export default DisclaimerPage;