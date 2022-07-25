import	React, {ReactElement, useState}	from	'react';
import	Image							from	'next/image';
import	{useRouter}						from	'next/router';
import	{Card, Button}					from	'@yearn-finance/web-lib/components';
import	{useWeb3}						from	'@yearn-finance/web-lib/contexts';
import	WithShadow						from	'components/WithShadow';


function	DisclaimerPage(): ReactElement {
	const [isShowingArrow, set_isShowingArrow] = useState(false);
	const {openLoginModal, isActive} = useWeb3();
	const router = useRouter();

	React.useEffect((): void => {
		if (isActive)
			router.push('/keep-eth');
	}, [isActive, router]);

	return (
		<div className={'mt-4 flex h-full w-full items-start pl-0 md:mt-0 md:w-6/12 md:items-center md:pl-4'}>
			<WithShadow role={'large'}>
				<Card className={'flex h-[544px] w-[544px] flex-col justify-between'}>
					<div>
						<div className={'flex w-full flex-row justify-between pb-6'}>
							<h2 className={'font-bold'}>{'Connect project'}</h2>
						</div>
						<div className={'w-10/12 space-y-6 text-justify'}>
							<p>
								{'Connect your NFT project wallet that has money you want to invest.'}
							</p>
							<p>
								{'We know you like clicking buttons.'}
							</p>
						</div>
					</div>
					<div className={'flex justify-start'}>
						<div onClick={(): void => {
							set_isShowingArrow(true);
							openLoginModal();
						}}>
							<WithShadow role={'button'}>
								<Button className={'w-[176px]'}>
									{'Click'}
								</Button>
							</WithShadow>
						</div>
					</div>
				</Card>
			</WithShadow>
			<div className={'flex h-[544px] min-w-[500px] items-start justify-center'}>
				<Image width={254} height={315} quality={90} src={'/connect-wallet.svg'} className={`transition duration-1000 ease-in-out ${isShowingArrow ? 'opacity-100' : 'opacity-0'}`} />
			</div>
		</div>
	);
}

export default DisclaimerPage;