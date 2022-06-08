import	React, {ReactElement}		from	'react';
import	Link						from	'next/link';
import	LogoNFTreasury				from	'components/icons/LogoNFTreasury';

function	Header(): ReactElement {
	return (
		<header className={'flex flex-row justify-between items-center py-10'}>
			<div>
				<LogoNFTreasury />
			</div>
			<div className={'flex flex-row items-center space-x-6'}>
				<Link href={'/about'}>
					<p className={'cursor-pointer text-typo-primary'}>{'about'}</p>
				</Link>
				<Link href={'/create-treasury'}>
					<p className={'cursor-pointer text-typo-secondary'}>{'create treasury'}</p>
				</Link>
			</div>
			<div>
				<p>{'connect project'}</p>
			</div>
		</header>
	);
}

export default Header;
