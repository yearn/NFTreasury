import	React, {ReactElement}		from	'react';
import	Link						from	'next/link';
import	{useRouter}					from	'next/router';
import	LogoNFTreasury				from	'components/icons/LogoNFTreasury';

const aboutPathnames: string[] = [
	'/',
	'/learn-more',
	'/how-it-works',
]

const createTreasuryPathnames: string[] = [
	'/connect-wallet',
	'/keep-eth',
	'/swap-eth',
	'/wrap-eth',
	'/execute-swap',
	'/final-final-step',
	'/woohoo',
]

const portfolioPathnames: string[] = [
	'/treasury',
]

function	Header(): ReactElement {
	const router = useRouter();
	const isAboutPage = aboutPathnames.includes(router.pathname)
	const isCreateTreasuryPage = createTreasuryPathnames.includes(router.pathname)
	const isPortfolioPage = portfolioPathnames.includes(router.pathname)
	return (
		<header className={'flex flex-row justify-between items-center py-10'}>
			<Link href={'/'}>
				<div className={'cursor-pointer'}>
					<LogoNFTreasury />
				</div>
			</Link>
			<div className={'flex flex-row items-center space-x-6'}>
				<Link href={'/'}>
<<<<<<< HEAD
					<p className={'cursor-pointer text-neutral-700'}>{'about'}</p>
=======
					<p className={`cursor-pointer ${isAboutPage ? 'text-typo-primary' : 'text-typo-secondary' }`}>{'about'}</p>
>>>>>>> ae4221e (add new pages)
				</Link>
<<<<<<< HEAD
				<Link href={'/create-treasury'}>
					<p className={'cursor-pointer text-neutral-500'}>{'create treasury'}</p>
=======
				<Link href={'/connect-wallet'}>
<<<<<<< HEAD
					<p className={'cursor-pointer text-typo-secondary'}>{'create treasury'}</p>
>>>>>>> c24d089 (fix: rename create-treasury to connect-wallet)
=======
					<p className={`cursor-pointer  ${isCreateTreasuryPage || isPortfolioPage ? 'text-typo-primary' : 'text-typo-secondary' }`}>
						{isPortfolioPage ? 'portfolio' : 'create treasury'}
					</p>
>>>>>>> ae4221e (add new pages)
				</Link>
			</div>
			<div>
				<p>{'connect project'}</p>
			</div>
		</header>
	);
}

export default Header;
