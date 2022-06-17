import	React, {ReactElement, useContext, createContext, Dispatch, SetStateAction}		from	'react';

export type	TFlowContext = {
	ethToSwap: string,
	set_ethToSwap: Dispatch<SetStateAction<string>>,
	keptEth: string,
	set_keptEth: Dispatch<SetStateAction<string>>
}

const	defaultProps: TFlowContext = {
	ethToSwap: '',
	set_ethToSwap: (): string => '',
	keptEth: '',
	set_keptEth: (): string => ''
};

const	FlowContext = createContext<TFlowContext>(defaultProps);

export const FlowContextApp = ({children}: {children: ReactElement}): ReactElement => {
	const [ethToSwap, set_ethToSwap] = React.useState('');
	const [keptEth, set_keptEth] = React.useState('');


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