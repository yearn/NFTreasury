import	React, {ReactElement}	from	'react';
import	{Card, Button}			from	'@yearn-finance/web-lib/components';
import	{Cross}					from	'@yearn-finance/web-lib/icons';
import	WithShadow				from	'components/WithShadow';
import	Link					from	'next/link';

function	DisclaimerPage(): ReactElement {
	return (
		<div className={'flex items-center w-8/12 h-full'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-full h-[500px]'}>
					<div>
						<div className={'flex flex-row justify-between pb-6 w-full'}>
							<h3 className={'font-bold'}>{'Yearn Vaults'}</h3>
							<Link href={'/'}>
								<Cross className={'w-6 h-6 transition-colors cursor-pointer text-typo-primary hover:text-typo-primary-variant'} />
							</Link>
						</div>
						<div className={'mb-16 space-y-6 text-justify'}>
							<p>
								{'Vaults are a passive investing strategy, enabling people to put their capital to work via automation. Each Vault auto-compounds earned tokens, meaning Yearn reinvests earned tokens to generate additional earnings over time. A strategy is an automated smart contract. It puts your tokens into different protocols to generate yield.'}
							</p>
							<p>
								{'Users benefit from socializing gas costs and need not be experts in defi or the underlying protocols to utilize Yearn Vaults.'}
							</p>
						</div>
					</div>
					<div className={'flex justify-end'}>
						<div>
							<WithShadow role={'button'}>
								<Link href={'/what-is-cowswap'}>
									<Button className={'w-[176px]'}>
										{'Next'}
									</Button>
								</Link>
							</WithShadow>
						</div>
					</div>
				</Card>
			</WithShadow>
		</div>
	);
}

export default DisclaimerPage;