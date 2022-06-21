import	React, {ReactElement, useContext, createContext, Dispatch, SetStateAction}		from	'react';
import {BigNumber, ethers} from 'ethers';

export type	TFlowContext = {
	ethToSwap: BigNumber,
	set_ethToSwap: Dispatch<SetStateAction<BigNumber>>,
	keptEth: BigNumber,
	set_keptEth: Dispatch<SetStateAction<BigNumber>>
}

const	defaultProps: TFlowContext = {
	ethToSwap: ethers.constants.Zero,
	set_ethToSwap: (): BigNumber => ethers.constants.Zero,
	keptEth: ethers.constants.Zero,
	set_keptEth: (): BigNumber => ethers.constants.Zero
};

const	FlowContext = createContext<TFlowContext>(defaultProps);

export const FlowContextApp = ({children}: {children: ReactElement}): ReactElement => {
	const [ethToSwap, set_ethToSwap] = React.useState<BigNumber>(ethers.constants.Zero);
	const [keptEth, set_keptEth] = React.useState<BigNumber>(ethers.constants.Zero);


	/* 🔵 - Yearn Finance ******************************************************
	**	Setup and render the Context provider to use in the app.
	***************************************************************************/
	return (
		<FlowContext.Provider
			value={{
				ethToSwap, set_ethToSwap,
				keptEth, set_keptEth
			}}>
			{children}
		</FlowContext.Provider>
	);
};


export const useFlow = (): TFlowContext => useContext(FlowContext);
export default useFlow;