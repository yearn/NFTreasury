import	React, {ReactElement}		from	'react';
import	Link						from	'next/link';
import	LogoNFTreasury				from	'components/icons/LogoNFTreasury';
import LogoNFTreasurySmall from './icons/LogoNFTreasurySmall';

function	Header(): ReactElement {
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
						<p className={'cursor-pointer text-neutral-700'}>{'about'}</p>
					</Link>
					<Link href={'/create-treasury'}>
						<p className={'cursor-pointer text-neutral-500'}>{'create treasury'}</p>
					</Link>
				</div>
				<div>
					<p>{'connect project'}</p>
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
