import	React, {ReactElement}				from	'react';
import	{AppProps}							from	'next/app';
import	{AnimatePresence, motion}			from	'framer-motion';
import	{WithYearn}							from	'@yearn-finance/web-lib/contexts';
import	{WalletContextApp}					from	'contexts/useWallet';
import	{CowSwapContextApp}					from	'contexts/useCowSwap';
import	{YearnContextApp}					from	'contexts/useYearn';
import	Header								from	'components/Header';
import	Footer								from	'components/Footer';

import	'../style.css';
import Meta from 'components/Meta';

const transition = {duration: 0.3, ease: [0.17, 0.67, 0.83, 0.67]};
const variants = {
	initial: {y: 20, opacity: 0},
	enter: {y: 0, opacity: 1, transition},
	exit: {y: -20, opacity: 0, transition}
};

function	WithLayout(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;

	function handleExitComplete(): void {
		if (typeof window !== 'undefined') {
			window.scrollTo({top: 0});
		}
	}

	return (
		<div id={'app'} className={'mx-auto mb-0 flex max-w-6xl'}>
			<div className={'flex min-h-[100vh] w-full flex-col'}>
				<Header />
				<AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
					<motion.div
						key={router.asPath}
						initial={'initial'}
						animate={'enter'}
						exit={'exit'}
						className={'h-full'}
						variants={variants}>
						<Component
							router={props.router}
							{...pageProps} />
					</motion.div>
				</AnimatePresence>
				<Footer />
			</div>
		</div>
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
					shouldUseWallets: true,
					shouldUseStrictChainMode: false,
					defaultChainID: 1,
					supportedChainID: [1, 1337]
				}
			}}>
			<WalletContextApp>
				<YearnContextApp>
					<CowSwapContextApp>
						<React.Fragment>
							<Meta />
							<WithLayout
								Component={Component}
								pageProps={pageProps}
								router={props.router} />
						</React.Fragment>
					</CowSwapContextApp>
				</YearnContextApp>
			</WalletContextApp>
		</WithYearn>
	);
}

export default MyApp;
