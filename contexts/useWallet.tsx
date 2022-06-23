import	React, {ReactElement, useContext, createContext}		from	'react';
import	{Contract}												from	'ethcall';
import	{BigNumber, ethers}										from	'ethers';
import	{useSettings, useWeb3}									from	'@yearn-finance/web-lib/contexts';
import	{format, toAddress, providers, performBatchedUpdates}	from	'@yearn-finance/web-lib/utils';
import	ERC20_ABI												from	'utils/abi/erc20.abi';
import	LENS_ABI												from	'utils/abi/lens.abi';
import type * as TWalletTypes									from	'contexts/useWallet.d';

const	defaultProps = {
	balances: {},
	allowances: {},
	prices: {},
	currentGasPrice: ethers.constants.Zero,
	useWalletNonce: 0,
	updateWallet: async (): Promise<void> => undefined
};

/* 🔵 - Yearn Finance **********************************************************
** This context controls most of the user's wallet data we may need to
** interact with our app, aka mostly the balances, the allowances and the token
** prices.
** All theses data are fetched on chain via a multicall, using the lens contract
** for the prices, and it populates an object {[token.address]: element} for an
** easy access through our app.
** On disconnect or network change, data are re-fetched and replaced.
******************************************************************************/
const	WalletContext = createContext<TWalletTypes.TWalletContext>(defaultProps);

export const WalletContextApp = ({children}: {children: ReactElement}): ReactElement => {
	const	{provider, isDisconnected, address, chainID, isActive} = useWeb3();
	const	{networks} = useSettings();
	const	[balances, set_balances] = React.useState<TWalletTypes.TBalances>(defaultProps.balances);
	const	[allowances, set_allowances] = React.useState<TWalletTypes.TBalances>(defaultProps.allowances);
	const	[prices, set_prices] = React.useState<TWalletTypes.TPrices>(defaultProps.prices);
	const	[currentGasPrice, set_currentGasPrice] = React.useState<BigNumber>(ethers.constants.Zero);
	const	[nonce, set_nonce] = React.useState(0);

	/* 🔵 - Yearn Finance ******************************************************
	**	On disconnect, status
	***************************************************************************/
	React.useEffect((): void => {
		if (isDisconnected) {
			performBatchedUpdates((): void => {
				set_balances(defaultProps.balances);
				set_allowances(defaultProps.allowances);
			});
		}
	}, [isDisconnected]);

	/* 🔵 - Yearn Finance ******************************************************
	**	Once the wallet is connected and a provider is available, we can fetch
	**	the informations for a specific wallet.
	***************************************************************************/
	const getWalletStatus = React.useCallback(async (): Promise<void> => {
		if (!isActive || !address || !provider) {
			return;
		}
		const	tokenList: string[] = [
			toAddress(process.env.ETH_TOKEN_ADDRESS),
			toAddress(process.env.WETH_TOKEN_ADDRESS)
		];

		const	currentProvider = provider || providers.getProvider(chainID || 1);
		const	ethcallProvider = await providers.newEthCallProvider(currentProvider);
		const	userAddress = address;
		const	calls = [];

		for (const token of tokenList) {
			if (token === toAddress(process.env.ETH_TOKEN_ADDRESS)) {
				continue;
			}

			const	tokenContract = new Contract(token, ERC20_ABI);
			const	lensPriceContract = new Contract(networks[chainID === 1337 || chainID === 4 ? 1 : chainID || 1].lensAddress, LENS_ABI);
			calls.push(...[
				tokenContract.balanceOf(userAddress),
				tokenContract.balanceOf(userAddress)
				// lensPriceContract.getPriceUsdcRecommended(token)
			]);
		}

		const	[balanceOfEth, results] = await Promise.all([
			currentProvider.getBalance(userAddress),
			ethcallProvider.tryAll(calls)
		]) as [BigNumber, [BigNumber]];
		const	_balances: TWalletTypes.TBalances = {};
		const	_allowances: TWalletTypes.TAllowances = {};
		const	_prices: TWalletTypes.TPrices = {};
		let		rIndex = 0;
		for (const token of tokenList) {
			if (token === toAddress(process.env.ETH_TOKEN_ADDRESS)) {
				_balances[toAddress(process.env.ETH_TOKEN_ADDRESS)] = { //eth
					raw: balanceOfEth,
					normalized: format.toNormalizedValue(balanceOfEth, 18)
				};
				continue;
			}
			const	tokenBalance = results[rIndex++];
			const	tokenPrice = results[rIndex++];

			_balances[toAddress(token)] = {
				raw: tokenBalance,
				normalized: format.toNormalizedValue(tokenBalance, 18)
			};
			_prices[toAddress(token)] = {
				raw: tokenPrice,
				normalized: format.toNormalizedValue(tokenPrice, 6)
			};
		}

		performBatchedUpdates((): void => {
			set_balances(_balances);
			set_allowances(_allowances);
			set_prices(_prices);
			set_nonce((n: number): number => n + 1);
		});
	}, [provider, address, chainID, networks, isActive]);

	React.useEffect((): void => {
		getWalletStatus();
	}, [getWalletStatus]);

	/* 🔵 - Yearn Finance ******************************************************
	**	As some estimate are computed, fetch the current gasPrice. This
	**	function should be called in an interval.
	***************************************************************************/
	const getGasPrice = React.useCallback(async (): Promise<void> => {
		if (!provider) {
			return;
		}
		const	currentProvider = provider || providers.getProvider(chainID || 1);
		const	[gasPrice] = await Promise.all([
			currentProvider.getGasPrice()
		]) as [BigNumber];
		
		set_currentGasPrice(gasPrice);
	}, [provider, chainID]);

	React.useEffect((): () => void => {
		const interval = setInterval(getGasPrice, 5000);
		return (): void => {
			clearInterval(interval);
		};
	}, [getGasPrice]);


	/* 🔵 - Yearn Finance ******************************************************
	**	Setup and render the Context provider to use in the app.
	***************************************************************************/
	return (
		<WalletContext.Provider
			value={{
				balances,
				allowances,
				prices,
				currentGasPrice,
				updateWallet: getWalletStatus,
				useWalletNonce: nonce
			}}>
			{children}
		</WalletContext.Provider>
	);
};


export const useWallet = (): TWalletTypes.TWalletContext => useContext(WalletContext);
export default useWallet;