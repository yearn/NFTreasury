import	React, {ReactElement}				from	'react';
import	Head								from	'next/head';
import	{AppProps}							from	'next/app';
import	{DefaultSeo}						from	'next-seo';
import	{WithYearn}							from	'@yearn-finance/web-lib/contexts';
import	Header								from	'components/Header';
import	Footer								from	'components/Footer';

import	'../style.css';

function	AppHead(): ReactElement {
	return (
		<>
			<Head>
				<title>{process.env.WEBSITE_NAME}</title>
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
				<meta name={'description'} content={process.env.WEBSITE_NAME} />
				<meta name={'msapplication-TileColor'} content={'#62688F'} />
				<meta name={'theme-color'} content={'#ffffff'} />
				<meta charSet={'utf-8'} />

				<link rel={'shortcut icon'} type={'image/x-icon'} href={'/favicons/favicon.ico'} />
				<link rel={'apple-touch-icon'} sizes={'180x180'} href={'/favicons/apple-touch-icon.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'32x32'} href={'/favicons/favicon-32x32.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'16x16'} href={'/favicons/favicon-16x16.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'192x192'} href={'/favicons/android-chrome-192x192.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'512x512'} href={'/favicons/android-chrome-512x512.png'} />

				<meta name={'robots'} content={'index,nofollow'} />
				<meta name={'googlebot'} content={'index,nofollow'} />
				<meta charSet={'utf-8'} />

				<script src={'/feedback.source.js'} defer />
				<script src={'/feedback.js'} defer />
				<script src={'/prism.js'} />
			</Head>
			<DefaultSeo
				title={process.env.WEBSITE_NAME}
				defaultTitle={process.env.WEBSITE_NAME}
				description={process.env.WEBSITE_DESCRIPTION}
				openGraph={{
					type: 'website',
					locale: 'en_US',
					url: process.env.WEBSITE_URI,
					site_name: process.env.WEBSITE_NAME,
					title: process.env.WEBSITE_NAME,
					description: process.env.WEBSITE_DESCRIPTION,
					images: [
						{
							url: `${process.env.WEBSITE_URI}og.png`,
							width: 1200,
							height: 675,
							alt: 'Yearn'
						}
					]
				}}
				twitter={{
					handle: '@iearnfinance',
					site: '@iearnfinance',
					cardType: 'summary_large_image'
				}} />
		</>
	);
}

function	AppWrapper(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;

	return (
		<>
			<AppHead />
			<div id={'app'} className={'grid flex-col grid-cols-12 gap-x-4 mx-auto mb-0 max-w-6xl md:flex-row'}>
				<div className={'flex flex-col col-span-12 px-4 w-full min-h-[100vh]'}>
					<Header />
					<Component
						key={router.route}
						router={props.router}
						{...pageProps} />
					<Footer />
				</div>
			</div>
		</>
	);
}

function	MyApp(props: AppProps): ReactElement {
	const	{Component, pageProps} = props;
	
	return (
		<WithYearn
			options={{
				ui: {
					shouldUseDefaultToaster: false,
					shouldUseTheme: false
				},
				web3: {
					defaultChainID: 1,
					supportedChainID: [1, 1337]
				}
			}}>
			<AppWrapper
				Component={Component}
				pageProps={pageProps}
				router={props.router} />
		</WithYearn>
	);
}

export default MyApp;
