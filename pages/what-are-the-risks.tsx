import	React, {ReactElement}	from	'react';
import	{Button}				from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';
import	DialogBox				from	'components/DialogBox';
import	Link					from	'next/link';

function	DisclaimerRiskPage(): ReactElement {
	return (
		<DialogBox
			title={'Risk'}
			paragraphs={[
				'Vaults and other Yearn decentralized finance systems, while superficially similar to traditional financial transactions in some ways, are in fact very different. DeFi and TradFi each have unique costs and benefits, risks and protection mechanisms. Please bear this fact in mind when using this website, and do not use Yearn vaults without a sufficient understanding of their unique risks and how they differ from traditional financial transactions. The only way to fully understand such risks is to have a strong understanding of the relevant technical systems and the incentive design mechanisms they embody--we strongly encourage you to review Yearn’s technical documentation and code before use.'
			]}	
		>
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
		</DialogBox>
	);
}

export default DisclaimerRiskPage;