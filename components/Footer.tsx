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
		<footer className={'flex flex-row items-center py-8 mx-auto w-full text-sm md:text-base mt-2 md:mt-0'}>
			<Link href={'/what-are-yearn-vaults'}>
				<p className={`nftreasury--link-with-dot ${isDisclaimerPage ? 'active' : '' }`}>
					{'disclaimer'}
				</p>
			</Link>

			<div className={'px-2 ml-auto'}>
				<a href={'https://twitter.com/iearnfinance'} target={'_blank'} rel={'noreferrer'} className={'text-base hover:underline transition-colors cursor-pointer'}>
					{'twitter'}
				</a>
			</div>
			<div className={'px-2'}>
				<a href={'https://discord.yearn.finance/'} target={'_blank'} rel={'noreferrer'} className={'text-base hover:underline transition-colors cursor-pointer'}>
					{'discord'}
				</a>
			</div>
		</footer>
	);
}

export default Footer;
