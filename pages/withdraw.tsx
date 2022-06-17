import	React, {ReactElement}	from	'react';
import	Link					from	'next/link';
import	{Card, Button}			from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';

function	WithdrawPage(): ReactElement {
	return (
		<div className={'flex items-start pl-0 mt-4 w-full h-full md:items-center md:pl-4 md:mt-0 md:w-6/12'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-[600px] h-[600px]'}>
					<div className={'w-full'}>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'You have 24.6913578 ETH'}</h2>
							<h2 className={'font-bold'}>{'in vault'}</h2>
						</div>
						<div className={'space-y-6 w-full text-justify'}>
							<p  className={'w-10/12'}>
								{'How much ETH do you want to withdraw?'}
							</p>
							<div className={'flex items-center'}>
								<input className={'p-2 w-6/12 h-10 border-2 border-primary'}>
								</input>
								<button className={'block px-1 w-14 h-10 font-bold whitespace-nowrap border-2 !border-l-0'}>
									{'20 %'}
								</button>
								<button className={'block px-1 w-14 h-10 font-bold whitespace-nowrap border-2 !border-l-0'}>
									{'40 %'}
								</button>
								<button className={'block px-1 w-14 h-10 font-bold whitespace-nowrap border-2 !border-l-0'}>
									{'60 %'}
								</button>
								<button className={'block px-1 w-14 h-10 font-bold whitespace-nowrap border-2 !border-l-0'}>
									{'80 %'}
								</button>
							</div>
						</div>
					</div>
					<div className={'flex justify-start space-x-6 w-full'}>
						<WithShadow role={'button'}>
							<Link href={'/treasury'}>
								<Button className={'w-[176px]'}>
									{'Click-click'}
								</Button>
							</Link>
						</WithShadow>
						<div>
							
						</div>
						<WithShadow role={'button'}>
							<Link href={'/treasury'}>
								<Button variant={'outlined'} className={'w-[176px]'}>
									{'Back'}
								</Button>
							</Link>
						</WithShadow>
					</div>
				</Card>
			</WithShadow>
		</div>
	);
}

export default WithdrawPage;