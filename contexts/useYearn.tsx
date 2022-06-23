import	React, {useContext, createContext}		from	'react';
import	useSWR									from	'swr';
import	axios									from	'axios';
import	type {TYearnVault}						from	'types/types';

export type	TYearnContext = {
	yvEthData: TYearnVault | undefined,
}

const	defaultProps: TYearnContext = {
	yvEthData: undefined
};

const fetcher = async (url: string): Promise<TYearnVault> => axios.get(url).then((res): TYearnVault => res.data);

const	YearnContext = createContext<TYearnContext>(defaultProps);
export const YearnContextApp = ({children}: {children: React.ReactElement}): React.ReactElement => {
	/* 🔵 - Yearn Finance ******************************************************
	**	We will play with the yvETH vault. To correctly play with it, we need to
	**	fetch the data from the API, especially to get the apy.net_apy
	***************************************************************************/
	const	{data: yvEthData} = useSWR(`https://api.ycorpo.com/1/vaults/${process.env.ETH_VAULT_ADDRESS}`, fetcher);

	/* 🔵 - Yearn Finance ******************************************************
	**	Setup and render the Context provider to use in the app.
	***************************************************************************/
	return (
		<YearnContext.Provider value={{
			yvEthData
		}}>
			{children}
		</YearnContext.Provider>
	);
};


export const useYearn = (): TYearnContext => useContext(YearnContext);
export default useYearn;