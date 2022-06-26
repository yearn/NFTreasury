import	React, {ReactElement}		from	'react';
import	Link						from	'next/link';
import	{useRouter}					from	'next/router';
import	LogoNFTreasury				from	'components/icons/LogoNFTreasury';
import 	LogoNFTreasurySmall 		from 	'./icons/LogoNFTreasurySmall';
import	{useWeb3}					from	'@yearn-finance/web-lib/contexts';
import	{truncateHex}				from	'@yearn-finance/web-lib/utils';

const aboutPathnames: string[] = [
	'/',
	'/learn-more',
	'/how-it-works'
];

const createTreasuryPathnames: string[] = [
	'/connect-wallet',
	'/keep-eth',
	'/swap-eth',
	'/wrap-eth',
	'/execute-swap',
	'/final-final-step',
	'/woohoo'
];

const portfolioPathnames: string[] = [
	'/treasury'
];

function	Header(): ReactElement {
	const router = useRouter();
	const isAboutPage = aboutPathnames.includes(router.pathname);
	const isCreateTreasuryPage = createTreasuryPathnames.includes(router.pathname);
	const isPortfolioPage = portfolioPathnames.includes(router.pathname);

	const	{isActive, address, ens, openLoginModal, onDesactivate, onSwitchChain} = useWeb3();
	const	[walletIdentity, set_walletIdentity] = React.useState('connect project');

	React.useEffect((): void => {
		console.log(isActive, address);
		if (!isActive && address) {
			set_walletIdentity('invalid network');
		} else if (ens) {
			set_walletIdentity(ens);
		} else if (address) {
			set_walletIdentity(truncateHex(address, 4));
		} else {
			set_walletIdentity('connect project');
		}
	}, [ens, address, isActive]);

	return (
		<>
			<header className={'flex flex-row justify-between items-center py-4 mb-2 md:py-10 md:mb-0'}>
				<div className={'hidden md:block'}>
					<Link href={'/'}>
						<div className={'cursor-pointer'}>
							<LogoNFTreasury />
						</div>
					</Link>
				</div>
				<div className={'md:hidden'}>
					<Link href={'/'}>
						<div className={'cursor-pointer'}>
							<LogoNFTreasurySmall className={'w-10 h-10'}/>
						</div>
					</Link>
				</div>
				<div className={'flex flex-row items-center space-x-3 text-sm md:space-x-6 md:text-base '}>
					<Link href={'/'}>
						<p className={`nftreasury--link-with-dot ${isAboutPage ? 'active' : '' }`}>
							{'about'}
						</p>
					</Link>
					<Link href={isActive ? '/keep-eth' : '/connect-wallet'}>
						<p className={`nftreasury--link-with-dot ${isCreateTreasuryPage || isPortfolioPage ? 'active' : '' }`}>
							{(isActive && isPortfolioPage) ? 'portfolio' : 'create treasury'}
						</p>
					</Link>
				</div>
				<div className={'flex'} onClick={(): void => {
					if (isActive) {
						onDesactivate();
					} else if (!isActive && address) {
						onSwitchChain(1, true);
					} else {
						openLoginModal();
					}
				}}>
					<p className={`nftreasury--link-no-dot ${isActive ? 'active' : '' }`}>
						{walletIdentity}
					</p>
				</div>
			</header>
		</>
	);
}

export default Header;
