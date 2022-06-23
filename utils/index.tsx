import	{BigNumber}		from	'ethers';

export function	toInputOrBalance(input: BigNumber, balance: BigNumber): BigNumber {
	if (input.gt(balance)) {
		return balance;
	}
	return input;
}