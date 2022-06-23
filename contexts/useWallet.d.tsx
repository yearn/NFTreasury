import 	{BigNumber}		from	'ethers';

export type	TBalances = {
	[address: string]: {
		raw: BigNumber,
		normalized: number
	}
}
export type	TAllowances = {
	[address: string]: {
		raw: BigNumber,
		normalized: number
	}
}
export type	TPrices = {
	[address: string]: {
		raw: BigNumber,
		normalized: number
	}
}

export type	TWalletContext = {
	balances: TBalances,
	allowances: TAllowances,
	prices: TPrices,
	currentGasPrice: BigNumber,
	useWalletNonce: number,
	updateWallet: () => Promise<void>
}