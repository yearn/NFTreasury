import	React, {useContext, createContext}		from	'react';
import	useSWR, {SWRResponse}									from	'swr';
import	{BigNumber}								from	'ethers';
import	axios									from	'axios';
import	{request}								from	'graphql-request';
import	{useWeb3}								from	'@yearn-finance/web-lib/contexts';
import	{format}								from	'@yearn-finance/web-lib/utils';
import	{toNumber}								from	'utils';
import	type {TYearnVault}						from	'types/types';

type TDepositOrWithdraw = {
	timestamp: string,
	tokenAmount: BigNumber,
	kind: 'withdraw' | 'deposit'
}
type TDailyInfo = {
	timestamp: string,
	pricePerShare: string | BigNumber,
	tokenPriceUSDC: string
}
type TBalanceData = {
	tokenPriceUSDC: number,
	pricePerShare: BigNumber,
	normalizedPricePerShare: number,
	accumulatedBalance: number,
	timestamp: string
}
type TVautDayData = {
	vaultDayDatas: TDailyInfo[]
}
type TBalanceRawData = {
	deposits: TDepositOrWithdraw[],
	withdraws: TDepositOrWithdraw[],
	vaultDailySnapshots: TDailyInfo[]
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

const restFetcher = async (url: string): Promise<any> => axios.get(url).then((res): any => res.data);

const graphFetcher = async (url: string, query: string): Promise<TBalanceRawData | TVautDayData> => request(url, query);

const	YearnContext = createContext<TYearnContext>(defaultProps);
export const YearnContextApp = ({children}: {children: React.ReactElement}): React.ReactElement => {
	const	{address} = useWeb3();

	/* 🔵 - Yearn Finance ******************************************************
	**	We will play with the yvETH vault. To correctly play with it, we need to
	**	fetch the data from the API, especially to get the apy.net_apy
	***************************************************************************/
	const	{data: yvEthData} = useSWR(`https://ydaemon.yearn.finance/1/vaults/${process.env.ETH_VAULT_ADDRESS}`, restFetcher);

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
	] : null, graphFetcher) as SWRResponse<TBalanceRawData>;

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
	] : null, graphFetcher) as SWRResponse<TVautDayData>;

	console.log(dailyData);

	const	balanceData = React.useMemo((): TBalanceData[] | undefined => {
		const	depositsOrWithdraws = [
			...(rawBalanceData?.deposits || []).map((deposit: TDepositOrWithdraw): TDepositOrWithdraw => ({...deposit, kind: 'deposit'})),
			...(rawBalanceData?.withdraws || []).map((withdraw: TDepositOrWithdraw): TDepositOrWithdraw => ({...withdraw, kind: 'withdraw'}))
		];

		const	memoizeMeBalanceData = dailyData?.vaultDayDatas?.map((dailyInfo: TDailyInfo): TBalanceData => ({
			...dailyInfo,
			tokenPriceUSDC: Number(dailyInfo.tokenPriceUSDC),
			pricePerShare: format.BN(dailyInfo.pricePerShare),
			normalizedPricePerShare: format.toNormalizedValue(format.BN(dailyInfo.pricePerShare), 18),
			accumulatedBalance: depositsOrWithdraws
				.filter(({timestamp}: {timestamp: string}): boolean => Number(timestamp) < Number(dailyInfo.timestamp))
				.reduce((acc: number, {kind, tokenAmount}: TDepositOrWithdraw): number => (
					kind === 'deposit' ? acc + toNumber(tokenAmount) : acc - toNumber(tokenAmount)
				), 0)
				* toNumber(dailyInfo.pricePerShare)
				// * Number(lastEthPrice)
		}));
		return memoizeMeBalanceData;
	}, [dailyData?.vaultDayDatas, rawBalanceData]);


	const	earnings = React.useMemo((): number => {
		const	lastPPS = (dailyData?.vaultDayDatas?.[dailyData?.vaultDayDatas?.length - 1]?.pricePerShare) || 0;
		const	depositsOrWithdraws = [
			...(rawBalanceData?.deposits || []).map((deposit: TDepositOrWithdraw): TDepositOrWithdraw => ({...deposit, kind: 'deposit'})),
			...(rawBalanceData?.withdraws || []).map((withdraw: TDepositOrWithdraw): TDepositOrWithdraw => ({...withdraw, kind: 'withdraw'}))
		];

		const	timeStampToIgnore: [number] = [0];
		const	dailySnapshots = [];
		const	revertedVaultDayDatas = dailyData?.vaultDayDatas?.reverse() || [];
		for (const kind of depositsOrWithdraws) {
			if (timeStampToIgnore.includes(Number(kind.timestamp)))
				continue;
			for (const dailyInfo of revertedVaultDayDatas) {
				if (Number(kind.timestamp) > Number(dailyInfo.timestamp)) {
					timeStampToIgnore.push(Number(kind.timestamp));
					dailySnapshots.push({
						...dailyInfo,
						tokenAmount: kind.tokenAmount,
						kind: kind.kind
					});
					break;
				}
			}
		}

		const	accumulatedDeposits = dailySnapshots.reduce((acc: number, dailyInfo: TDepositOrWithdraw & TDailyInfo): number => {
			if (dailyInfo.kind === 'withdraw')
				return (acc - (toNumber(dailyInfo.tokenAmount) * toNumber(dailyInfo.pricePerShare)));
			return (acc + (toNumber(dailyInfo.tokenAmount) * toNumber(dailyInfo.pricePerShare)));
		}, 0);
		const	accumulatedDepositsNow = dailySnapshots.reduce((acc: number, dailyInfo: TDepositOrWithdraw & TDailyInfo): number => {
			if (dailyInfo.kind === 'withdraw')
				return (acc - (toNumber(dailyInfo.tokenAmount) * toNumber(lastPPS)));
			return (acc + (toNumber(dailyInfo.tokenAmount) * toNumber(lastPPS)));
		}, 0);
		
		return (accumulatedDepositsNow - accumulatedDeposits);
	}, [dailyData?.vaultDayDatas, rawBalanceData]);


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