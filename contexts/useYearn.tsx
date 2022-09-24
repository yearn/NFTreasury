import	React, {useContext, createContext}		from	'react';
import	useSWR									from	'swr';
import	{BigNumber}								from	'ethers';
import	axios									from	'axios';
import	{request}								from	'graphql-request';
import	{useWeb3}								from	'@yearn-finance/web-lib/contexts';
import	{format, toAddress}						from	'@yearn-finance/web-lib/utils';
import	{toNumber}								from	'utils';
import	type {TYearnVault}						from	'types/types';

type TDepositOrWithdraw = {
	timestamp: string,
	tokenAmount: BigNumber,
	kind: 'withdraw' | 'deposit'
}
type TDailyInfo = {
	timestamp: string,
	pricePerShare: BigNumber,
	tokenPriceUSDC: string
}
type TBalanceData = {
	tokenPriceUSDC: number,
	pricePerShare: BigNumber,
	normalizedPricePerShare: number,
	accumulatedBalance: number,
	timestamp: string
}

export type	TYearnContext = {
	yvEthData: TYearnVault | undefined,
	balanceData: TBalanceData[] | undefined,
	earnings: number
}
const	defaultProps: TYearnContext = {
	yvEthData: undefined,
	balanceData: undefined,
	earnings: 0
};

const restFetcherV1 = async (url: string): Promise<TYearnVault> => axios.get(url).then((res): TYearnVault => {
	return res.data.find((item: TYearnVault): boolean => toAddress(item.address) === toAddress(process.env.ETH_VAULT_ADDRESS));
});
// const restFetcher = async (url: string): Promise<any> => axios.get(url).then((res): any => res.data);

const graphFetcher = async (url: string, query: string): Promise<{deposits: TDepositOrWithdraw[], withdraws: TDepositOrWithdraw[], vaultDailySnapshots: TDailyInfo[]}> => request(url, query);

const	YearnContext = createContext<TYearnContext>(defaultProps);
export const YearnContextApp = ({children}: {children: React.ReactElement}): React.ReactElement => {
	const	{address} = useWeb3();

	/* 🔵 - Yearn Finance ******************************************************
	**	We will play with the yvETH vault. To correctly play with it, we need to
	**	fetch the data from the API, especially to get the apy.net_apy
	***************************************************************************/
	const	{data: yvEthData} = useSWR('https://api.yearn.finance/v1/chains/1/vaults/all', restFetcherV1);
	// const	{data: yvEthData} = useSWR(`https://api.ycorpo.com/1/vaults/${process.env.ETH_VAULT_ADDRESS}`, restFetcher);

	/* 🔵 - Yearn Finance ******************************************************
	**	Use the subgraph to get the user's treasury informations
	***************************************************************************/
	const	{data: rawBalanceData} = useSWR(address ? [
		'https://api.thegraph.com/subgraphs/name/rareweasel/yearn-vaults-v2-subgraph-mainnet',
		`{
			deposits(
				orderBy: timestamp
				orderDirection: asc
				where: {
					account: "${address.toLowerCase()}"
					vault: "${process.env.ETH_VAULT_ADDRESS?.toLowerCase()}"
				}
			) {
				timestamp
				tokenAmount
			}
			withdrawals(
				orderBy: timestamp
				orderDirection: asc
				where: {
					account: "${address.toLowerCase()}"
					vault: "${process.env.ETH_VAULT_ADDRESS?.toLowerCase()}"
				}
			) {
				timestamp
				tokenAmount
			}
		}`
	] : null, graphFetcher);

	const	{data: dailyData} = useSWR((address && rawBalanceData?.deposits?.[0]) ? [
		'https://api.thegraph.com/subgraphs/name/rareweasel/yearn-vaults-v2-subgraph-mainnet',
		`{
			vaultDayDatas(
				orderBy: timestamp
				orderDirection: desc
				where: {
					vault: "${process.env.ETH_VAULT_ADDRESS?.toLowerCase()}",
					timestamp_gte: ${Number(rawBalanceData.deposits[0].timestamp) - 150000}
				}
			) {
				timestamp
				pricePerShare
				tokenPriceUSDC
			}
		}`
	] : null, graphFetcher);

	const	balanceData = React.useMemo((): TBalanceData[] | undefined => {
		const	depositsOrWithdraws = [
			...(rawBalanceData?.deposits || []).map((deposit: TDepositOrWithdraw): TDepositOrWithdraw => ({...deposit, kind: 'deposit'})),
			...(rawBalanceData?.withdraws || []).map((withdraw: TDepositOrWithdraw): TDepositOrWithdraw => ({...withdraw, kind: 'withdraw'}))
		];

		const	memoizeMeBalanceData = dailyData?.vaultDailySnapshots?.map((dailyInfo: TDailyInfo): TBalanceData => ({
			...dailyInfo,
			tokenPriceUSDC: Number(dailyInfo.tokenPriceUSDC),
			pricePerShare: format.BN(dailyInfo.pricePerShare),
			normalizedPricePerShare: format.toNormalizedValue(format.BN(dailyInfo.pricePerShare), 18),
			accumulatedBalance: depositsOrWithdraws
				.filter(({timestamp}: {timestamp: number}): boolean => timestamp < Number(dailyInfo.timestamp))
				.reduce((acc: number, {kind, tokenAmount}: TDepositOrWithdraw): number => (
					kind === 'deposit' ? acc + toNumber(tokenAmount) : acc - toNumber(tokenAmount)
				), 0)
				* toNumber(dailyInfo.pricePerShare)
				// * Number(lastEthPrice)
		}));
		return memoizeMeBalanceData;
	}, [dailyData?.vaultDailySnapshots, rawBalanceData]);


	const	earnings = React.useMemo((): number => {
		const	lastPPS = (dailyData?.vaultDailySnapshots?.[dailyData?.vaultDailySnapshots?.length - 1]?.pricePerShare) || 0;
		const	depositsOrWithdraws = [
			...(rawBalanceData?.deposits || []).map((deposit: TDepositOrWithdraw): TDepositOrWithdraw => ({...deposit, kind: 'deposit'})),
			...(rawBalanceData?.withdraws || []).map((withdraw: TDepositOrWithdraw): TDepositOrWithdraw => ({...withdraw, kind: 'withdraw'}))
		];

		const	timeStampToIgnore: [number] = [0];
		const	dailySnapshots = [];
		const	revertedVaultDailySnapshots = dailyData?.vaultDailySnapshots?.reverse() || [];
		for (const kind of depositsOrWithdraws) {
			if (timeStampToIgnore.includes(Number(kind.timestamp)))
				continue;
			for (const dailyInfo of revertedVaultDailySnapshots) {
				if (Number(kind.timestamp) > Number(dailyInfo.timestamp)) {
					timeStampToIgnore.push(Number(kind.timestamp));
					dailySnapshots.push({
						...dailyInfo,
						amount: kind.tokenAmount,
						kind: kind.kind
					});
					break;
				}
			}
		}

		const	accumulatedDeposits = dailySnapshots.reduce((acc: number, dailyInfo: TDepositOrWithdraw & TDailyInfo): number => {
			if (dailyInfo.kind === 'withdraw')
				return (acc - (toNumber(dailyInfo.amount) * toNumber(dailyInfo.pricePerShare)));
			return (acc + (toNumber(dailyInfo.amount) * toNumber(dailyInfo.pricePerShare)));
		}, 0);
		const	accumulatedDepositsNow = dailySnapshots.reduce((acc: number, dailyInfo: TDepositOrWithdraw & TDailyInfo): number => {
			if (dailyInfo.kind === 'withdraw')
				return (acc - (toNumber(dailyInfo.amount) * toNumber(lastPPS)));
			return (acc + (toNumber(dailyInfo.amount) * toNumber(lastPPS)));
		}, 0);
		
		
		return (accumulatedDepositsNow - accumulatedDeposits);
	}, [dailyData?.vaultDailySnapshots, rawBalanceData]);


	/* 🔵 - Yearn Finance ******************************************************
	**	Setup and render the Context provider to use in the app.
	***************************************************************************/
	return (
		<YearnContext.Provider value={{
			yvEthData,
			balanceData,
			earnings
		}}>
			{children}
		</YearnContext.Provider>
	);
};


export const useYearn = (): TYearnContext => useContext(YearnContext);
export default useYearn;