import	React, {ReactElement}		from	'react';
import	Link						from	'next/link';
import	{useRouter}					from	'next/router';

const disclaimerPathnames: string[] = [
	'/what-are-the-risks',
	'/what-are-yearn-vaults',
	'/what-is-cowswap',
	'/what-is-mev',
]

function	Footer(): ReactElement {
	const router = useRouter();
	const isDisclaimerPage = disclaimerPathnames.includes(router.pathname)
	return (
		<footer className={'hidden flex-row items-center py-8 mx-auto mt-auto w-full max-w-6xl md:flex'}>
			<Link href={'/what-are-yearn-vaults'}>
				<p className={`cursor-pointer ${isDisclaimerPage ? 'text-typo-primary dot-below' : 'text-typo-secondary' }`}>{'Disclaimer'}</p>
			</Link>

			<div className={'px-2 ml-auto'}>
				<a href={'https://twitter.com/iearnfinance'} target={'_blank'} rel={'noreferrer'} className={'text-base hover:underline transition-colors cursor-pointer'}>
					{'Twitter'}
				</a>
			</div>
			<div className={'px-2'}>
				<a href={'https://discord.yearn.finance/'} target={'_blank'} rel={'noreferrer'} className={'text-base hover:underline transition-colors cursor-pointer'}>
					{'Discord'}
				</a>
			</div>
		</footer>
	);
}

export default Footer;
