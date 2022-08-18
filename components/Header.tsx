import	React, {ReactElement}		from	'react';
import	Link						from	'next/link';
import	{useRouter}					from	'next/router';
import	LogoNFTreasury				from	'components/icons/LogoNFTreasury';
import 	LogoNFTreasurySmall 		from 	'./icons/LogoNFTreasurySmall';
import	{useWeb3}					from	'@yearn-finance/web-lib/contexts';
import	{truncateHex}				from	'@yearn-finance/web-lib/utils';
import useWallet from 'contexts/useWallet';

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
	const	{balances} = useWallet();
	const router = useRouter();
	const isAboutPage = aboutPathnames.includes(router.pathname);
	const isCreateTreasuryPage = createTreasuryPathnames.includes(router.pathname);
	const isPortfolioPage = portfolioPathnames.includes(router.pathname);

	const	{isActive, address, ens, openLoginModal, onDesactivate, onSwitchChain} = useWeb3();
	const	[walletIdentity, set_walletIdentity] = React.useState('connect project');

	React.useEffect((): void => {
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
			<header className={'mb-2 flex flex-row items-center justify-between py-4 text-xs sm:text-sm md:mb-0 md:py-10 md:text-base'}>
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
							<LogoNFTreasurySmall className={'h-10 w-10'}/>
						</div>
					</Link>
				</div>
				<div className={'flex flex-row items-center space-x-3 md:space-x-6'}>
					<Link href={'/'}>
						<p className={`nftreasury--link-with-dot ${isAboutPage ? 'active' : '' }`}>
							{'about'}
						</p>
					</Link>
					<Link href={!isActive ? '/connect-wallet' : (isActive && balances?.[process.env.ETH_VAULT_ADDRESS as string]?.normalized > 0) ? '/treasury' : '/keep-eth'}>
						<p className={`nftreasury--link-with-dot ${isCreateTreasuryPage || isPortfolioPage ? 'active' : '' }`}>
							{(isActive && balances?.[process.env.ETH_VAULT_ADDRESS as string]?.normalized > 0) ? 'portfolio' : 'create treasury'}
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
