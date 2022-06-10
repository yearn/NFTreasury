import	React, {ReactElement}		from	'react';
import	Link						from	'next/link';
import	LogoNFTreasury				from	'components/icons/LogoNFTreasury';

function	Header(): ReactElement {
	return (
		<header className={'flex flex-row justify-between items-center py-10'}>
			<Link href={'/'}>
				<div className={'cursor-pointer'}>
					<LogoNFTreasury />
				</div>
			</Link>
			<div className={'flex flex-row items-center space-x-6'}>
				<Link href={'/'}>
					<p className={'cursor-pointer text-neutral-700'}>{'about'}</p>
				</Link>
<<<<<<< HEAD
				<Link href={'/create-treasury'}>
					<p className={'cursor-pointer text-neutral-500'}>{'create treasury'}</p>
=======
				<Link href={'/connect-wallet'}>
					<p className={'cursor-pointer text-typo-secondary'}>{'create treasury'}</p>
>>>>>>> c24d089 (fix: rename create-treasury to connect-wallet)
				</Link>
			</div>
			<div>
				<p>{'connect project'}</p>
			</div>
		</header>
	);
}

export default Header;
