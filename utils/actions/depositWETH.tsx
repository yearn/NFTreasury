import	{ContractInterface, ethers} from	'ethers';
import	WETH_ABI					from	'utils/abi/weth.abi';

export async function	depositWETH(
	provider: ethers.providers.Web3Provider,
	amount: ethers.BigNumber
): Promise<boolean> {
	const	signer = provider.getSigner();

	try {
		const	contract = new ethers.Contract(
			'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', //put in env
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