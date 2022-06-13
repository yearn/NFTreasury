import	React, {ReactElement, useState}	from	'react';
import	Image					from	'next/image';
import	{Card, Button}			from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';


function	DisclaimerPage(): ReactElement {
	const [isShowingArrow, set_isShowingArrow] = useState(false);
	return (
		<div className={'flex items-start pl-0 mt-4 w-full h-full md:items-center md:pl-4 md:mt-0 md:w-6/12'}>
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
						{/* <Link href={'/keep-eth'}> */}
						<div onClick={(): void => {
							set_isShowingArrow(true);
						}}>
							<WithShadow role={'button'}>
								<Button className={'w-[176px]'}>
									{'Click'}
								</Button>
							</WithShadow>
						</div>
						{/* </Link> */}
					</div>
				</Card>
			</WithShadow>
			<div className={'flex justify-center items-start min-w-[500px] h-[600px]'}>
				<Image width={254} height={315} quality={90} src={'/connect-wallet.svg'} className={`transition duration-1000 ease-in-out ${isShowingArrow? 'opacity-100' : 'opacity-0'}`} />
			</div>
		</div>
	);
}

export default DisclaimerPage;