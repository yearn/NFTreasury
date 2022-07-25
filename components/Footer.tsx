import	React, {ReactElement}		from	'react';
import	Link						from	'next/link';
import	{useRouter}					from	'next/router';

const disclaimerPathnames: string[] = [
	'/what-are-the-risks',
	'/what-are-yearn-vaults',
	'/what-is-cowswap',
	'/what-is-mev'
];

function	Footer(): ReactElement {
	const router = useRouter();
	const isDisclaimerPage = disclaimerPathnames.includes(router.pathname);
	return (
		<footer className={'mx-auto mt-auto hidden w-full max-w-6xl flex-row items-center py-8 md:flex'}>
			<Link href={'/what-are-yearn-vaults'}>
				<p className={`link-with-dot ${isDisclaimerPage ? 'active' : '' }`}>
					{'disclaimer'}
				</p>
			</Link>

			<div className={'ml-auto px-2'}>
				<a href={'https://twitter.com/iearnfinance'} target={'_blank'} rel={'noreferrer'} className={'cursor-pointer text-base transition-colors hover:underline'}>
					{'twitter'}
				</a>
			</div>
			<div className={'px-2'}>
				<a href={'https://discord.yearn.finance/'} target={'_blank'} rel={'noreferrer'} className={'cursor-pointer text-base transition-colors hover:underline'}>
					{'discord'}
				</a>
			</div>
		</footer>
	);
}

export default Footer;
