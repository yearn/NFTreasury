import	React, {ReactElement}		from	'react';
import	Link						from	'next/link';
import	{useRouter}					from	'next/router';
import	LogoNFTreasury				from	'components/icons/LogoNFTreasury';
import 	LogoNFTreasurySmall 		from 	'./icons/LogoNFTreasurySmall';
import	{useWeb3}					from	'@yearn-finance/web-lib/contexts';
import	{truncateHex}				from	'@yearn-finance/web-lib/utils';
import	{Cross}						from	'@yearn-finance/web-lib/icons';

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

	const	{isActive, address, ens, openLoginModal, onDesactivate} = useWeb3();
	const	[walletIdentity, set_walletIdentity] = React.useState('Connect wallet');

	React.useEffect((): void => {
		if (!isActive) {
			set_walletIdentity('Connect wallet');
		} else if (ens) {
			set_walletIdentity(ens);
		} else if (address) {
			set_walletIdentity(truncateHex(address, 4));
		} else {
			set_walletIdentity('Connect wallet');
		}
	}, [ens, address, isActive]);

	return (
		<>
			<header className={'hidden flex-row justify-between items-center py-10 md:flex'}>
				<Link href={'/'}>
					<div className={'cursor-pointer'}>
						<LogoNFTreasury />
					</div>
				</Link>
				<div className={'flex flex-row items-center space-x-6'}>
					<Link href={'/'}>
						<p className={`link-with-dot ${isAboutPage ? 'active' : '' }`}>
							{'about'}
						</p>
					</Link>
					<Link href={'/connect-wallet'}>
						<p className={`link-with-dot ${isCreateTreasuryPage || isPortfolioPage ? 'active' : '' }`}>
							{(isActive && isPortfolioPage) ? 'portfolio' : 'create treasury'}
						</p>
					</Link>
				</div>
				<div className={'flex'} onClick={(): void => {
					if (isActive)
						router.push('/treasury');
					else
						openLoginModal();
				}}>
					<p className={`link-no-dot ${isActive ? 'active' : '' }`}>
						{isActive ? walletIdentity :  'connect project'}
					</p>
					{isActive && <Cross
						className={'ml-2 transition-colors cursor-pointer text-neutral-500 hover:text-neutral-700'}
						onClick={(e: React.MouseEvent): void => {
							e.stopPropagation();
							onDesactivate();
						}}
					/>}
				</div>
			</header>
			<header className={'flex flex-row justify-between items-center py-4 mb-4 border-b-2 md:hidden border-primary-500'}>
				<Link href={'/'}>
					<div className={'cursor-pointer'}>
						<LogoNFTreasurySmall className={'w-10 h-10'}/>
					</div>
				</Link>
				<div>
					<p className={'text-sm'}>{'connect project'}</p>
				</div>
			</header>
		</>
	);
}

export default Header;
