import	React, {ReactElement}	from	'react';
import	Link					from	'next/link';
import	{Card, Button}			from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';

function	DisclaimerPage(): ReactElement {
	return (
		<div className={'flex items-center h-full'}>
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
								<input className={' w-6/12 h-10 border-2 border-primary'}>
								</input>
								<Button variant={'outlined'} className={'w-14 p-1 font-bold !border-l-0'}>
									{'20 %'}
								</Button>
								<Button variant={'outlined'} className={'w-14 p-1 font-bold !border-l-0'}>
									{'40 %'}
								</Button>
								<Button variant={'outlined'} className={'w-14 p-1 font-bold !border-l-0'}>
									{'60 %'}
								</Button>
								<Button variant={'outlined'} className={'w-14 p-1 font-bold !border-l-0'}>
									{'80 %'}
								</Button>
							</div>
							<p>
								{'How much of it do you wanna swap to USDC?'}
							</p>
						</div>
					</div>
					<div className={'flex justify-start w-full space-x-6'}>
						<WithShadow role={'button'}>
							<Link href={'/treasury'}>
								<Button className={'w-[176px]'}>
									{'Click-click'}
								</Button>
							</Link>
						</WithShadow>
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

export default DisclaimerPage;