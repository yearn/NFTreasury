import	React, {ReactElement, useState}				from	'react';
import	{useRouter}									from	'next/router';
import	Image										from	'next/image';
import	{ethers}									from	'ethers';
import	axios										from	'axios';
import	{useWeb3}									from	'@yearn-finance/web-lib';
import	{Card, Button}								from	'@yearn-finance/web-lib/components';
import	{performBatchedUpdates, defaultTxStatus}	from	'@yearn-finance/web-lib/utils';
import	{domain, SigningScheme, signOrder}			from	'@gnosis.pm/gp-v2-contracts';
import	WithShadow									from	'components/WithShadow';
import	useCowSwap									from	'contexts/useCowSwap';
import	useWallet									from	'contexts/useWallet';
import	type {TCowSwapQuote}						from	'types/types';

const		shouldUsePresign = true;
function	SwapStep(): ReactElement {
	const	router = useRouter();
	const	{provider, address, isActive} = useWeb3();
	const	{updateWallet} = useWallet();
	const	{cowSwapQuote} = useCowSwap();
	const	[txStatusSwap, set_txStatusSwap] = React.useState(defaultTxStatus);
	const	[isShowingArrow, set_isShowingArrow] = useState(false);

	async function	signCowswapOrder(_cowSwapQuote: TCowSwapQuote): Promise<string> {
		if (shouldUsePresign) {
			return address;
		}
		const	signer = provider.getSigner();
		const	rawSignature = await signOrder(
			domain(1, '0x9008D19f58AAbD9eD0D60971565AA8510560ab41'),
			_cowSwapQuote.quote,
			signer,
			SigningScheme.ETHSIGN
		);
		const signature = ethers.utils.joinSignature(rawSignature.data);
		return signature;
	}
	async function	onSignOrder(): Promise<void> {
		if (cowSwapQuote) {
			const	_cowSwapQuote = (cowSwapQuote as TCowSwapQuote);
			performBatchedUpdates((): void => {
				set_txStatusSwap({...defaultTxStatus, pending: true});
				set_isShowingArrow(true);
			});

			try {
				const	slippage = 0.1;
				const	buyAmount = Number(ethers.utils.formatUnits(_cowSwapQuote.quote.buyAmount, 6));
				const	buyAmountWithSlippage = ethers.utils.parseUnits((buyAmount * (1 - slippage)).toFixed(6), 6);
				const	signature = await signCowswapOrder(_cowSwapQuote);
				console.warn({
					..._cowSwapQuote.quote,
					buyAmount: buyAmountWithSlippage.toString(),
					quoteId: _cowSwapQuote.id,
					signature: signature,
					signingScheme: shouldUsePresign ? SigningScheme.PRESIGN : SigningScheme.ETHSIGN
				});
				const	{data: orderUID} = await axios.post('https://api.cow.fi/mainnet/api/v1/orders', {
					..._cowSwapQuote.quote,
					from: address,
					buyAmount: buyAmountWithSlippage.toString(),
					quoteId: _cowSwapQuote.id,
					signature: signature,
					signingScheme: String(shouldUsePresign ? 'presign' : 'ethsign')
				});
				if (orderUID) {
					const	interval = setInterval(async (): Promise<void> => {
						const	{data: order} = await axios.get(`https://api.cow.fi/mainnet/api/v1/orders/${orderUID}`);
						if (order?.status === 'fulfilled') {
							await updateWallet();
							clearInterval(interval);
							router.push('/woohoo');
							set_txStatusSwap({...defaultTxStatus, success: true});
						} else if (order?.status === 'cancelled' || order?.status === 'expired') {
							clearInterval(interval);
							performBatchedUpdates((): void => {
								set_txStatusSwap({...defaultTxStatus, error: true});
								set_isShowingArrow(false);
							});
						}

						if (_cowSwapQuote.quote.validTo < (new Date().valueOf() / 1000)) {
							clearInterval(interval);
							performBatchedUpdates((): void => {
								set_txStatusSwap({...defaultTxStatus, error: true});
								set_isShowingArrow(false);
							});
						}
					}, 3000);
				}
			} catch (error) {
				performBatchedUpdates((): void => {
					set_txStatusSwap({...defaultTxStatus, error: true});
					set_isShowingArrow(false);
				});
			}
		}
	}

	return (
		<div className={'flex items-center h-full'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-[544px] h-[544px]'}>
					<div>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'Final final step'}</h2>
						</div>
						<div className={'space-y-6 w-10/12 text-justify'}>
							<p>{'Final final step!!'}</p>
							<p>{'It’s the same but this time you don’t have to pay gas! Sign a transaction and let cowswap do the swap.'}</p>
						</div>
					</div>
					<div className={'flex justify-start'}>
						<WithShadow
							role={'button'}
							isDisabled={!isActive || !address || !provider || txStatusSwap.pending || !cowSwapQuote}
							onClick={onSignOrder}>
							<Button
								isBusy={txStatusSwap.pending}
								isDisabled={!isActive || !address || !provider || txStatusSwap.pending || !cowSwapQuote}
								className={'w-[176px]'}>
								{'Crush'}
							</Button>
						</WithShadow>
					</div>
				</Card>
			</WithShadow>
			<div className={'flex justify-center items-start min-w-[544px] h-[544px]'}>
				<Image
					width={518}
					height={535}
					quality={90}
					src={'/final-svg.png'}
					className={`transition duration-1000 ease-in-out ${isShowingArrow ? 'opacity-100' : 'opacity-0'}`} />
			</div>
		</div>
	);
}

export default SwapStep;