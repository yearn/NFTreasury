import	React, {ReactElement}	from	'react';
import	{Button}			from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';
import	DialogBox				from	'components/DialogBox';
import	Link					from	'next/link';

function	DisclaimerPage(): ReactElement {
	return (
		<DialogBox
			title={'Why Cowswap?'}
			paragraphs={[
				'We use Cowswap because we like cows, swaps, and because they use gas-less orders that are settled peer-to-peer while providing MEV* protection. You can find out more about how they settle trades without incurring slippage & fees here.'
			]}	
		>
			<div className={'flex justify-between'}>
				<Link href={'/what-are-yearn-vaults'}>
					<div>
						<WithShadow role={'button'}>
							<Button className={'w-[176px]'}>
								{'Previous'}
							</Button>
						</WithShadow>
					</div>
				</Link>
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
		</DialogBox>
	);
}

export default DisclaimerPage;