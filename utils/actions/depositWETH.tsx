import	{ContractInterface, ethers} from	'ethers';
import	WETH_ABI					from	'utils/abi/weth.abi';

export async function	depositWETH(
	provider: ethers.providers.Web3Provider,
	amount: ethers.BigNumber
): Promise<boolean> {
	const	signer = provider.getSigner();

	try {
		const	contract = new ethers.Contract(
			process.env.WETH_TOKEN_ADDRESS as string,
			WETH_ABI as ContractInterface,
			signer
		);
		const	transaction = await contract.deposit({value: amount});
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 0) {
			console.error('Fail to perform transaction');
			return false;
		}

		return true;
	} catch(error) {
		console.error(error);
		return false;
	}
}