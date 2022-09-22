import	React, {ReactElement, useState}				from	'react';
import	{useRouter}									from	'next/router';
import	Image										from	'next/image';
import	useSWR										from	'swr';
import	{ethers}									from	'ethers';
import	axios										from	'axios';
import	{useWeb3}									from	'@yearn-finance/web-lib';
import	{Card, Button}								from	'@yearn-finance/web-lib/components';
import	{performBatchedUpdates, defaultTxStatus,
	format}											from	'@yearn-finance/web-lib/utils';
import	{domain, SigningScheme, signOrder, Order}			from	'@gnosis.pm/gp-v2-contracts';
import	WithShadow									from	'components/WithShadow';
import	useCowSwap									from	'contexts/useCowSwap';
import	useWallet									from	'contexts/useWallet';
import	type {TCowSwapQuote}						from	'types/types';

const		fetcher = async (url: string, data: unknown): Promise<TCowSwapQuote> => axios.post(url, data).then((res): TCowSwapQuote => res.data);
const		shouldUsePresign = false;
function	SwapStep(): ReactElement {
	const	router = useRouter();
	const	{provider, address, isActive} = useWeb3();
	const	{updateWallet} = useWallet();
	const	{cowSwapQuote} = useCowSwap();
	const	[txStatusSwap, set_txStatusSwap] = React.useState(defaultTxStatus);
	const	[isShowingArrow, set_isShowingArrow] = useState(false);
	const	[currentQuote, set_currentQuote] = useState<TCowSwapQuote>(cowSwapQuote as TCowSwapQuote);
	const	[validTo, set_validTo] = useState(Math.round((new Date().setMinutes(new Date().getMinutes() + 10) / 1000)));
	const	[error, set_error] = useState<string>('');

	const	{data: updatedQuote} = useSWR(cowSwapQuote ? [
		'https://api.cow.fi/mainnet/api/v1/quote', {
			from: address,
			sellToken: cowSwapQuote.quote.sellToken,
			buyToken: cowSwapQuote.quote.buyToken,
			receiver: cowSwapQuote.quote.receiver,
			appData: cowSwapQuote.quote.appData,
			partiallyFillable: cowSwapQuote.quote.partiallyFillable,
			kind: cowSwapQuote.quote.kind,
			validTo,
			sellAmountAfterFee: cowSwapQuote.quote.sellAmount.toString()
		}] : null, fetcher, {refreshInterval: 10000});

	// Update validTo every minutes
	React.useEffect((): () => void => {
		const	interval = setInterval((): void => {
			set_validTo(Math.round((new Date().setMinutes(new Date().getMinutes() + 10) / 1000)));
		}, 60000);
		return (): void => clearInterval(interval);
	}, []);

	React.useEffect((): void => {
		if (updatedQuote) {
			set_currentQuote(updatedQuote);
		} else if (cowSwapQuote) {
			set_currentQuote(cowSwapQuote);
		}
	}, [cowSwapQuote, updatedQuote]);

	async function	signCowswapOrder(quote: Order): Promise<string> {
		if (shouldUsePresign) {
			return address;
		}
		const	signer = provider.getSigner();
		const	rawSignature = await signOrder(
			domain(1, '0x9008D19f58AAbD9eD0D60971565AA8510560ab41'),
			quote,
			signer,
			SigningScheme.EIP712
		);
		const signature = ethers.utils.joinSignature(rawSignature.data);
		return signature;
	}

	async function	onSignOrder(): Promise<void> {
		if (currentQuote) {
			performBatchedUpdates((): void => {
				set_error('');
				set_txStatusSwap({...defaultTxStatus, pending: true});
				set_isShowingArrow(true);
			});

			try {
				const	currentQuoteToSign = {...currentQuote};
				const	buyAmount = Number(ethers.utils.formatUnits(currentQuoteToSign.quote.buyAmount, 6));
				const	buyAmountWithSlippage = ethers.utils.parseUnits((buyAmount * (1 - Number(process.env.DEFAULT_SLIPPAGE_COWSWAP))).toFixed(6), 6);
				const	signature = await signCowswapOrder({
					...currentQuoteToSign.quote,
					buyAmount: buyAmountWithSlippage.toString()
				});

				const	{data: orderUID} = await axios.post('https://api.cow.fi/mainnet/api/v1/orders', {
					...currentQuoteToSign.quote,
					buyAmount: buyAmountWithSlippage.toString(),
					from: address,
					quoteId: currentQuoteToSign.id,
					signature: signature,
					signingScheme: String(shouldUsePresign ? 'presign' : 'eip712')
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
								set_error('TX fail because the order was not fulfilled');
								set_txStatusSwap({...defaultTxStatus, error: true});
								set_isShowingArrow(false);
							});
						}

						if (currentQuoteToSign.quote.validTo < (new Date().valueOf() / 1000)) {
							clearInterval(interval);
							performBatchedUpdates((): void => {
								set_error('TX fail because the order was not fulfilled');
								set_txStatusSwap({...defaultTxStatus, error: true});
								set_isShowingArrow(false);
							});
						}
					}, 3000);
				}
			} catch (_error) {
				performBatchedUpdates((): void => {
					set_error('Error signing order');
					set_txStatusSwap({...defaultTxStatus, error: true});
					set_isShowingArrow(false);
				});
			}
		}
	}

	const	buyAmountWithSlippage = (): string => {
		if (currentQuote?.quote?.buyAmount) {
			const	buyAmount = Number(ethers.utils.formatUnits(currentQuote?.quote?.buyAmount, 6));
			const	buyAmountWithSlippage = ethers.utils.parseUnits((buyAmount * (1 - Number(process.env.DEFAULT_SLIPPAGE_COWSWAP))).toFixed(6), 6);
			return (
				format.amount(Number(format.units(buyAmountWithSlippage, 6)), 4, 4)
			);
		}
		return '';
	};

	return (
		<div className={'nftreasury--app-wrapper'}>
			<WithShadow role={'large'}>
				<Card className={'nftreasury--app-card'}>
					<div>
						<div className={'w-full pb-6'}>
							<h2 className={'font-bold'}>{'Final final step'}</h2>
						</div>
						<div className={'w-10/12 space-y-6 text-justify'}>
							<p>{'Final final step!!'}</p>
							<p>
								{'It’s the same but this time you don’t have to pay gas! Sign a transaction and let '}
								<a href={`https://explorer.cow.fi/address/${address}`} target={'_blank'} className={'cursor-pointer underline'} rel={'noreferrer'}>{'cowswap'}</a>
								{' do the swap.'}
							</p>
						</div>
					</div>
					<div className={'nftreasury--grey-box mt-8 mb-2 p-4'}>
						<p className={'mb-4 flex flex-col justify-between md:flex-row'}>
							<span>{'You’ll get'}</span>
							<span className={'font-bold'}>
								{!currentQuote ? '- USDC' : `~ ${buyAmountWithSlippage()} USDC`}
							</span>
						</p>
						<div className={'flex flex-col justify-between md:flex-row'}>
							<span>
								<p>{'Transaction fees'}</p>
							</span>
							<span className={'font-bold'}>
								{currentQuote ? format.bigNumberAsAmount(format.BN(currentQuote?.quote?.feeAmount as string), 18, 8, 'ETH') : '- ETH'}
							</span>
						</div>
					</div>

					<div className={`mb-6 border-2 border-[#FF0000] p-4 transition-opacity ${txStatusSwap.error ? 'opacity-100' : 'opacity-0'}`}>
						<p className={'text-xs font-bold text-[#FE0000]'}>{error}</p>
					</div>

					<div className={'mt-auto flex justify-start'}>
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
			<div className={'hidden h-[544px] min-w-[544px] items-start justify-center md:flex'}>
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