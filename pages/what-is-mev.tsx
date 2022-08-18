import	React, {ReactElement}	from	'react';
import	{Button}				from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';
import	DialogBox				from	'components/DialogBox';
import	Link					from	'next/link';

function	DisclaimerPage(): ReactElement {
	return (
		<DialogBox
			title={'*wtf is MEV?'}
			paragraphs={[
				<p key={'0'}>{'MEV stands for Miner Extractable Value, and is the term given to the value extracted by miners through the reordering or censoring of blocks. Imagine if you had to call a broker every time you wanted to buy a monkey jpeg. You tell the broker which monkey you want to buy, she places the order, the order gets filled and you receive your monkey picture. Now imagine there was someone listening in on the call who was able to place an order ahead of yours (which they now know is coming) frontrunning you and making money from the opportunity.'}</p>
			]}	
		>
			<div className={'mt-8 flex justify-start md:mt-0'}>
				<Link href={'/what-is-cowswap'}>
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

export default DisclaimerPage;
