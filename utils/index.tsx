import	{format}	from	'@yearn-finance/web-lib/utils';
import	{BigNumber}	from	'ethers';

export function	toInputOrBalance(input: BigNumber, balance: BigNumber): BigNumber {
	if (input.gt(balance)) {
		return balance;
	}
	return input;
}

export function	toNumber(value: string | number | BigNumber | undefined): number {
	return format.toNormalizedValue(format.BN(value), 18);
}