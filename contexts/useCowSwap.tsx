import	React, {ReactElement, useContext, createContext}	from	'react';
import	type {TCowSwapQuote}								from	'types/types';

export type	TCowSwapContext = {
	cowSwapQuote: TCowSwapQuote | undefined,
	set_cowSwapQuote: React.Dispatch<React.SetStateAction<TCowSwapQuote | undefined>>
}

const	defaultProps: TCowSwapContext = {
	cowSwapQuote: undefined,
	set_cowSwapQuote: (): void => undefined
};

const	CowSwapContext = createContext<TCowSwapContext>(defaultProps);
export const CowSwapContextApp = ({children}: {children: ReactElement}): ReactElement => {
	const [cowSwapQuote, set_cowSwapQuote] = React.useState<TCowSwapQuote | undefined>(undefined);

	/* 🔵 - Yearn Finance ******************************************************
	**	Setup and render the Context provider to use in the app.
	***************************************************************************/
	return (
		<CowSwapContext.Provider
			value={{
				cowSwapQuote, set_cowSwapQuote
			}}>
			{children}
		</CowSwapContext.Provider>
	);
};


export const useCowSwap = (): TCowSwapContext => useContext(CowSwapContext);
export default useCowSwap;