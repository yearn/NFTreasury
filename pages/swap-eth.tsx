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
							<h2 className={'font-bold'}>{'You are keeping'}</h2>
							<h2 className={'font-bold'}>{'24.6913578 ETH'}</h2>
						</div>
						<div className={'space-y-6 w-full text-justify'}>
							<p  className={'w-10/12'}>
								{'How much ETH do you wanna keep in your wallet? The rest will be sent to Yearn vault.'}
							</p>
							<div className={'flex items-center'}>
								<input className={' w-6/12 h-10 border-2 border-primary'}>
								</input>
								<Button variant={'outlined'} className={'p-1 w-14 font-bold !border-l-0'}>
									{'20 %'}
								</Button>
								<Button variant={'outlined'} className={'p-1 w-14 font-bold !border-l-0'}>
									{'40 %'}
								</Button>
								<Button variant={'outlined'} className={'p-1 w-14 font-bold !border-l-0'}>
									{'60 %'}
								</Button>
								<Button variant={'outlined'} className={'p-1 w-14 font-bold !border-l-0'}>
									{'80 %'}
								</Button>
							</div>
						</div>
					</div>
					<p>
						{'How much of it do you wanna swap to USDC?'}
					</p>
					<div className={'p-4 grey-box'}>
						<p className={'flex justify-between mb-4'}>
							<span>{'You’ll get'}</span>
							<span className={'font-bold'}>{'2.534,53 USDC'}</span>
						</p>
						<p className={'flex justify-between mb-4'}>
							<span>{'You’ll keep'}</span>
							<span className={'font-bold'}>{'4,9382716 ETH'}</span>
						</p>
						<p className={'flex justify-between'}>
							<span>
								<p>{'Est. gas cost for all steps'}</p>
								<p>{'(wrap, approve, sign)'}</p>
							</span>
							<span className={'font-bold'}>{'00,0323445 ETH'}</span>
						</p>
					</div>
					<div className={'flex justify-start'}>
						<Link href={'/wrap-eth'}>
							<div>
								<WithShadow role={'button'}>
									<Button className={'w-[176px]'}>
										{'Tap'}
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