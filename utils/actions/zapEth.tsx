import	{ethers} from	'ethers';

export async function	ZapEth(
	provider: ethers.providers.Web3Provider,
	amount: ethers.BigNumber
): Promise<boolean> {
	const	signer = provider.getSigner();

	try {
		const	contract = new ethers.Contract(
			process.env.ZAP_ETH_WETH_CONTRACT as string,
			['function deposit() public payable'],
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
		console.log(amount, amount.toString());
		console.error(error);
		return false;
	}
}
