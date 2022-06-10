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
							<h3 className={'font-bold'}>{'*wtf is MEV?'}</h3>
							<Link href={'/'}>
								<Cross className={'w-6 h-6 transition-colors cursor-pointer text-neutral-500 hover:text-neutral-700'} />
							</Link>
						</div>
						<div className={'space-y-6 text-justify'}>
							<p>
								{'MEV stands for Maxium Extractable Value, and is the term given to the value extracted by miners through the reordering or censoring of blocks. Imagine if you had to call a broker every time you wanted to buy a monkey jpeg. You tell the broker which monkey you want to buy, she places the order, the order gets filled and you recieve your moneky picture. Now imagine there was someone listening in on the call who was able to place an order ahead of yours (which they now know is coming) frontrunning you and making money from the opportunity. That’s MEV. Here’s a video if you want to learn more.'}
							</p>
						</div>
					</div>
					<div className={'flex justify-between'}>
						<div>
							<WithShadow role={'button'}>
								<Link href={'/what-is-cowswap'}>
									<Button className={'w-[176px]'}>
										{'Previous'}
									</Button>
								</Link>
							</WithShadow>
						</div>
						<div>
							<WithShadow role={'button'}>
								<Link href={'/what-are-the-risks'}>
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