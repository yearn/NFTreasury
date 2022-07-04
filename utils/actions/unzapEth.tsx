import	{ethers} from	'ethers';

export async function	UnzapEth(
	provider: ethers.providers.Web3Provider,
	amount: ethers.BigNumber
): Promise<boolean> {
	const	signer = provider.getSigner();

	try {
		const	contract = new ethers.Contract(
			process.env.ETH_VAULT_ADDRESS as string,
			['function approve(address _spender, uint256 _value) external'],
			signer
		);
		const	transaction = await contract.approve(
			process.env.ZAP_ETH_WETH_CONTRACT as string,
			amount
		);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 0) {
			console.error('Fail to approve ERC20 transaction');
			return false;
		}
	} catch(error) {
		console.error(error);
		return false;
	}


	try {
		const	contract = new ethers.Contract(
			process.env.ZAP_ETH_WETH_CONTRACT as string,
			['function withdraw(uint256) public'],
			signer
		);
		console.warn(amount.toString());
		const	transaction = await contract.withdraw(amount);
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
