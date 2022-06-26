import	React, {ReactElement, useState}				from	'react';
import	Image										from	'next/image';
import	{useRouter}									from	'next/router';
import	{Card, Button}								from	'@yearn-finance/web-lib/components';
import	{useWeb3}									from	'@yearn-finance/web-lib/contexts';
import	{Transaction, defaultTxStatus, toAddress,
	format}											from	'@yearn-finance/web-lib/utils';
import	WithShadow									from	'components/WithShadow';
import	useCowSwap									from	'contexts/useCowSwap';
import	useWallet									from	'contexts/useWallet';
import	{wrapWEth}									from	'utils/actions/wrapWEth';
import	{toInputOrBalance}							from	'utils';
import	type {TCowSwapQuote}						from	'types/types';

function	WrapEth(): ReactElement {
	const	router = useRouter();
	const	{provider, isActive} = useWeb3();
	const	{cowSwapQuote} = useCowSwap();
	const	{balances, updateWallet} = useWallet();
	const	[isShowingArrow, set_isShowingArrow] = useState(false);
	const	[txStatusWrap, set_txStatusWrap] = React.useState(defaultTxStatus);

	async function	onWrap(): Promise<void> {
		if (!isActive || txStatusWrap.pending)
			return;
		const	_cowSwapQuote = cowSwapQuote as TCowSwapQuote;
		set_isShowingArrow(true);
		const	transaction = (
			new Transaction(provider, wrapWEth, set_txStatusWrap).populate(
				toInputOrBalance(
					format.BN(_cowSwapQuote.quote.sellAmount as string).add(format.BN(_cowSwapQuote.quote.feeAmount as string)),
					balances[toAddress(process.env.ETH_TOKEN_ADDRESS)].raw
				)
			).onSuccess(async (): Promise<void> => {
				await updateWallet();
			})
		);

		const	isSuccessful = await transaction.perform();
		if (isSuccessful) {
			router.push('/execute-swap');
		} else {
			set_isShowingArrow(false);
		}
	}

	return (
		<div className={'nftreasury--app-wrapper'}>
			<WithShadow role={'large'}>
				<Card className={'nftreasury--app-card'}>
					<div>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'Wrap ETH'}</h2>
						</div>
						<div className={'space-y-6 w-10/12 text-justify'}>
							<p>{'You have to sign one more transaction. That’s just how it works. Don’t ask...'}</p>
						</div>
					</div>
					<div className={'flex justify-start'}>
						<WithShadow
							role={'button'}
							isDisabled={!isActive || !provider || txStatusWrap.pending || !cowSwapQuote}
							onClick={onWrap}>
							<Button
								isBusy={txStatusWrap.pending}
								isDisabled={!isActive || !provider || txStatusWrap.pending || !cowSwapQuote}
								className={'w-[176px]'}>
								{'Hit'}
							</Button>
						</WithShadow>
					</div>
				</Card>
			</WithShadow>
			<div className={'hidden md:flex justify-center items-start min-w-[500px] h-[544px]'}>
				<Image
					width={279}
					height={322}
					quality={90}
					src={'/wrap-eth.svg'}
					className={`transition duration-1000 ease-in-out ${isShowingArrow ? 'opacity-100' : 'opacity-0'}`} />
			</div>
		</div>
	);
}

export default WrapEth;