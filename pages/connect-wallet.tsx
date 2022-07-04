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
		<div className={'nftreasury--app-wrapper'}>
			<WithShadow role={'large'}>
				<Card className={'nftreasury--app-card'}>
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
					<div className={'flex justify-start mt-auto'}>
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
			<div className={'hidden justify-center items-start min-w-[500px] h-[544px] md:flex'}>
				<Image width={254} height={315} quality={90} src={'/connect-wallet.svg'} className={`transition duration-1000 ease-in-out ${isShowingArrow ? 'opacity-100' : 'opacity-0'}`} />
			</div>
		</div>
	);
}

export default DisclaimerPage;