import	React, {ReactElement}	from	'react';
import	Link					from	'next/link';
import	{Card, Button}			from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';

function	WithdrawPage(): ReactElement {
	return (
		<div className={'mt-4 flex h-full w-full items-start pl-0 md:mt-0 md:w-6/12 md:items-center md:pl-4'}>
			<WithShadow role={'large'}>
				<Card className={'flex h-[544px] w-[544px] flex-col justify-between'}>
					<div className={'w-full'}>
						<div className={'w-full pb-6'}>
							<h2 className={'font-bold'}>{'You have 24.6913578 ETH'}</h2>
							<h2 className={'font-bold'}>{'in vault'}</h2>
						</div>
						<div className={'w-full space-y-6 text-justify'}>
							<p  className={'w-10/12'}>
								{'How much ETH do you want to withdraw?'}
							</p>
							<div className={'flex items-center'}>
								<input className={'border-primary h-10 w-6/12 border-2 p-2'}>
								</input>
								<button className={'block h-10 w-14 whitespace-nowrap border-2 !border-l-0 px-1 font-bold'}>
									{'20 %'}
								</button>
								<button className={'block h-10 w-14 whitespace-nowrap border-2 !border-l-0 px-1 font-bold'}>
									{'40 %'}
								</button>
								<button className={'block h-10 w-14 whitespace-nowrap border-2 !border-l-0 px-1 font-bold'}>
									{'60 %'}
								</button>
								<button className={'block h-10 w-14 whitespace-nowrap border-2 !border-l-0 px-1 font-bold'}>
									{'80 %'}
								</button>
							</div>
						</div>
					</div>
					<div className={'flex w-full justify-start space-x-6'}>
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