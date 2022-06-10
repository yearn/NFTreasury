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
							<h3 className={'font-bold'}>{'Risk'}</h3>
							<Link href={'/'}>
								<Cross className={'w-6 h-6 transition-colors cursor-pointer text-neutral-500 hover:text-neutral-700'} />
							</Link>
						</div>
						<div className={'space-y-6 text-justify'}>
							<p>
								{'Vaults and other Yearn decentralized finance systems, while superficially similar to traditional financial transactions in some ways, are in fact very different. DeFi and TradFi each have unique costs and benefits, risks and protection mechanisms. Please bear this fact in mind when using this website, and do not use Yearn vaults without a sufficient understanding of their unique risks and how they differ from traditional financial transactions. The only way to fully understand such risks is to have a strong understanding of the relevant technical systems and the incentive design mechanisms they embody--we strongly encourage you to review Yearn’s technical documentation and code before use.'}
							</p>
						</div>
					</div>
					<div className={'flex justify-start'}>
						<Link href={'/what-is-mev'}>
							<div>
								<WithShadow role={'button'}>
									<Button className={'w-[176px]'}>
										{'Previous'}
									</Button>
								</WithShadow>
							</div>
						</Link>
					</div>
				</Card>
			</WithShadow>
		</div>
	);
}

export default DisclaimerPage;