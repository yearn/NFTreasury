import	React, {ReactElement}	from	'react';
import	{Button}				from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';
import	DialogBox				from	'components/DialogBox';
import	Link					from	'next/link';

function	DisclaimerPage(): ReactElement {
	return (
		<DialogBox
			title={'Why Cowswap?'}
			paragraphs={[
				<p>We use Cowswap because we like cows, swaps, and because they use gas-less orders that are settled peer-to-peer while providing MEV* protection. You can find out more about how they settle trades without incurring slippage & fees <a className={'underline'} target="_blank" href="https://cowswap.exchange/#/faq?chain=mainnet">here</a></p>
			]}	
		>
			<div className={'flex flex-col items-start md:flex-row md:justify-between'}>
				<Link href={'/what-are-yearn-vaults'}>
					<div>
						<WithShadow role={'button'}>
							<Button className={'w-[176px]'}>
								{'Previous'}
							</Button>
						</WithShadow>
					</div>
				</Link>
				<div className={'mt-8 md:mt-0'}>
					<Link href={'/what-is-mev'}>
						<div>
							<WithShadow role={'button'}>
								<Button className={'w-[176px]'}>
									{'Next'}
								</Button>
							</WithShadow>
						</div>
					</Link>
				</div>
			</div>
		</DialogBox>
	);
}

export default DisclaimerPage;