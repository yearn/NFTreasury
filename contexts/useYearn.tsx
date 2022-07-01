import	React, {useContext, createContext}		from	'react';
import	useSWR									from	'swr';
import	axios									from	'axios';
import	{request}								from	'graphql-request';
import	type {TYearnVault}						from	'types/types';
import	{useWeb3}								from	'@yearn-finance/web-lib/contexts';

export type	TYearnContext = {
	yvEthData: TYearnVault | undefined,
	treasuryData: any | undefined,
}

const	defaultProps: TYearnContext = {
	yvEthData: undefined,
	treasuryData: undefined
};

const restFetcher = async (url: string): Promise<TYearnVault> => axios.get(url).then((res): TYearnVault => res.data);
const graphFetcher = async (url: string, query: string): Promise<TYearnVault> => request(url, query);

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
	const	{data: treasuryData} = useSWR(address ? [
		'https://api.thegraph.com/subgraphs/name/messari/yearn-v2-ethereum',
		`{
			vaultDailySnapshots(orderBy: timestamp, orderDirection: desc, where: {vault: "${process.env.ETH_VAULT_ADDRESS?.toLowerCase()}"}) {
				timestamp
				outputTokenPriceUSD
				pricePerShare
			}			  
			deposits(where: {from: "${address.toLowerCase()}", vault: "${process.env.ETH_VAULT_ADDRESS?.toLowerCase()}"}) {
				timestamp
				amount
				amountUSD
			}
		}`
	] : null, graphFetcher);

	/* 🔵 - Yearn Finance ******************************************************
	**	Setup and render the Context provider to use in the app.
	***************************************************************************/
	return (
		<YearnContext.Provider value={{
			yvEthData,
			treasuryData
		}}>
			{children}
		</YearnContext.Provider>
	);
};


export const useYearn = (): TYearnContext => useContext(YearnContext);
export default useYearn;