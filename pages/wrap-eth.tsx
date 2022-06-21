import	React, {ReactElement, useState}			from	'react';
import	Image									from	'next/image';
import	{Card, Button}							from	'@yearn-finance/web-lib/components';
import	WithShadow								from	'components/WithShadow';
import	{useWeb3}								from	'@yearn-finance/web-lib/contexts';
import	{Transaction, defaultTxStatus,
	toAddress, performBatchedUpdates}			from	'@yearn-finance/web-lib/utils';
import	useFlow									from	'contexts/useFlow';
import	useWallet								from	'contexts/useWallet';
import	{depositWETH}							from	'utils/actions/depositWETH';
import {BigNumber} from 'ethers';

function	toInputOrBalance(input: BigNumber, balance: BigNumber): BigNumber {
	if (input.gt(balance)) {
		return balance;
	}
	return input;
}

function	Page(): ReactElement {
	const	{provider, isActive} = useWeb3();
	const	{ethToSwap} = useFlow();
	const	{balances, updateWallet} = useWallet();
	const	[isShowingArrow] = useState(false);
	const	[txStatusDeposit, set_txStatusDeposit] = React.useState(defaultTxStatus);

	async function	onDeposit(): Promise<void> {
		if (!isActive || txStatusDeposit.pending)
			return;
		console.log(ethToSwap.toString());
		const	transaction = (
			new Transaction(provider, depositWETH, set_txStatusDeposit).populate(
				toInputOrBalance(ethToSwap, balances[toAddress(process.env.ETH_TOKEN_ADDRESS)].raw)
			).onSuccess(async (): Promise<void> => {
				await updateWallet();
				performBatchedUpdates((): void => {
					//If you need to update multiple state at one, update them inside the performBatchedUpdate
				});
			})
		);

		const	isSuccessful = await transaction.perform();
		if (isSuccessful) {
			console.log('Yeh');
		}
	}
	// console.log(address);
	// console.log(ethers.utils.parseUnits(String(Number(ethToSwap).toFixed(18))));

	// // weth.balanceOf(address).then(console.log)

	// // weth.withdraw({ value: BigNumber.from(String(Number(ethToSwap).toFixed(18))) }).then((tx: ethers.providers.TransactionResponse): void => {
	// // 	console.log(tx)
	// // }).catch((err: Error): void => {
	// // 	console.log(err)
	// // })

	// weth.deposit({value: ethers.utils.parseUnits(String(Number(ethToSwap).toFixed(18)), 'ether')}).then((tx: ethers.providers.TransactionResponse): void => {
	// 	console.log(tx);
	// }).catch((err: Error): void => {
	// 	console.log(err);
	// });


	return (
		<div className={'flex items-center h-full'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-[600px] h-[600px]'}>
					<div>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'Wrap ETH'}</h2>
						</div>
						<div className={'space-y-6 w-10/12 text-justify'}>
							<p>
								{'You have to sign one more transaction. That’s just how it works. Don’t ask...'}
							</p>
						</div>
					</div>
					<div className={'flex justify-start'}>
						<div onClick={onDeposit}>
							<WithShadow role={'button'}>
								<Button className={'w-[176px]'}>
									{'Hit'}
								</Button>
							</WithShadow>
						</div>
					</div>
				</Card>
			</WithShadow>
			<div className={'flex justify-center items-start min-w-[500px] h-[600px]'}>
				<Image width={279} height={322} quality={90} src={'/wrap-eth.svg'} className={`transition duration-1000 ease-in-out ${isShowingArrow ? 'opacity-100' : 'opacity-0'}`} />
			</div>
		</div>
	);
}

export default Page;