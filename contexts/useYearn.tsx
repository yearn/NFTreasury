import	React, {useContext, createContext}		from	'react';
import	useSWR									from	'swr';
import	axios									from	'axios';
import	{request}								from	'graphql-request';
import	type {TYearnVault}						from	'types/types';
import	{useWeb3}								from	'@yearn-finance/web-lib/contexts';

export type	TYearnContext = {
	yvEthData: TYearnVault | undefined,
	balanceData: any | undefined,
}

const	defaultProps: TYearnContext = {
	yvEthData: undefined,
	balanceData: undefined
};

const restFetcher = async (url: string): Promise<any> => axios.get(url).then((res): any => res.data);
const graphFetcher = async (url: string, query: string): Promise<any> => request(url, query);

const	YearnContext = createContext<TYearnContext>(defaultProps);
export const YearnContextApp = ({children}: {children: React.ReactElement}): React.ReactElement => {
	const	{address} = useWeb3();

	/* 🔵 - Yearn Finance ******************************************************
	**	We will play with the yvETH vault. To correctly play with it, we need to
	**	fetch the data from the API, especially to get the apy.net_apy
	***************************************************************************/
	const	{data: yvEthData} = useSWR(`https://api.ycorpo.com/1/vaults/${process.env.ETH_VAULT_ADDRESS}`, restFetcher);

	/* 🔵 - Yearn Finance ******************************************************
	**	Use the subgraph to get the user's treasury informations
	***************************************************************************/
	const	{data: rawBalanceData} = useSWR(address ? [
		'https://api.thegraph.com/subgraphs/name/messari/yearn-v2-ethereum',
		`{
			deposits(where: {from: "${address.toLowerCase()}", vault: "${process.env.ETH_VAULT_ADDRESS?.toLowerCase()}"}) {
			 timestamp
			 amount
			}
			withdraws(where: {from: "${address.toLowerCase()}", vault: "${process.env.ETH_VAULT_ADDRESS?.toLowerCase()}"}) {
			 timestamp
			 amount
			}
		}`
	] : null, graphFetcher);

	const	{data: dailyData} = useSWR((address && rawBalanceData?.deposits?.[0]) ? [
		'https://api.thegraph.com/subgraphs/name/messari/yearn-v2-ethereum',
		`{
			vaultDailySnapshots(
				orderBy: timestamp,
				orderDirection: desc,
				where: {
				vault: "${process.env.ETH_VAULT_ADDRESS?.toLowerCase()}",
				timestamp_gte: ${rawBalanceData.deposits[0].timestamp}
				}
			) {
				timestamp
				pricePerShare
				outputTokenPriceUSD
			}
		}`
	] : null, graphFetcher);

	type deposit = { timestamp:number, amount:number }
	type withdraw = { timestamp:number, amount:number }
	type dailyInfo = { timestamp:number, pricePerShare:number, outputTokenPriceUSD:number, accumulatedBalance?:number }

	const lastEthPrice = dailyData?.vaultDailySnapshots?.[dailyData?.vaultDailySnapshots?.length - 1]?.outputTokenPriceUSD
	
	console.log(rawBalanceData)

	const balanceData = dailyData?.vaultDailySnapshots
		?.map((dailyInfo:dailyInfo) => ({
			...dailyInfo,
			accumulatedBalance: rawBalanceData.deposits
				.filter((deposit:deposit) => deposit.timestamp < dailyInfo.timestamp)
				.reduce((acc:number, deposit:deposit) => acc + Number(deposit.amount), 0)
		}))
		?.map((dailyInfo:dailyInfo) => ({
			...dailyInfo,
			accumulatedBalance: (dailyInfo?.accumulatedBalance || 0) - rawBalanceData.withdraws
				.filter((withdraw:withdraw) => withdraw.timestamp < dailyInfo.timestamp)
				.reduce((acc:number, withdraw:withdraw) => acc + Number(withdraw.amount), 0)
		}))
		?.map((dailyInfo:dailyInfo) => ({
			...dailyInfo,
			accumulatedBalance: (
				(dailyInfo?.accumulatedBalance || 0)
				* Number(dailyInfo.pricePerShare)
				* Number(lastEthPrice)
			) / 1000000000000000000000000000000000000
		}))

	console.log(balanceData)

	/* 🔵 - Yearn Finance ******************************************************
	**	Setup and render the Context provider to use in the app.
	***************************************************************************/
	return (
		<YearnContext.Provider value={{
			yvEthData,
			balanceData
		}}>
			{children}
		</YearnContext.Provider>
	);
};


export const useYearn = (): TYearnContext => useContext(YearnContext);
export default useYearn;