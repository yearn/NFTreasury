import	React, {ReactElement}						from	'react';
import	Link										from	'next/link';
import	{Card, Button}								from	'@yearn-finance/web-lib/components';
import	WithShadow									from	'components/WithShadow';
import {LineChart, Line, Tooltip, XAxis, YAxis, ResponsiveContainer} 	from 	'recharts';

const mockData: object[] = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
		amt: 2400
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
		amt: 2210
	},
	{
		name: 'Page C',
		uv: 2000,
		pv: 3000,
		amt: 2290
	},
	{
		name: 'Page D',
		uv: 2780,
		pv: 3908,
		amt: 2000
	},
	{
		name: 'Page E',
		uv: 1890,
		pv: 4800,
		amt: 2181
	},
	{
		name: 'Page F',
		uv: 2390,
		pv: 3800,
		amt: 2500
	},
	{
		name: 'Page G',
		uv: 3490,
		pv: 4300,
		amt: 2100
	}
];

function Chart(): ReactElement {
	return (
		// <div className={'border-2 border-solid p-0'}>
		<ResponsiveContainer width={'100%'} height={300}>
			<LineChart data={mockData}>
				<XAxis dataKey={'name'} stroke={'#000'} tick={false} axisLine={false}/>
				<YAxis orientation={'right'} stroke={'#000'} tickCount={2} axisLine={false}/>
				<Tooltip />
				<Line
					type={'monotone'}
					dataKey={'pv'}
					stroke={'#000'}
					strokeWidth={2}
					dot={false}
				/>
			</LineChart>
		</ResponsiveContainer>
		// </div>
	);
}

function	DisclaimerPage(): ReactElement {
	return (
		<div className={'flex h-full items-center'}>
			<WithShadow role={'large'}>
				<Card className={'flex h-[544px] w-[700px] flex-col justify-between'}>
					<div>
						<div className={'w-full pb-6'}>
							<h2 className={'font-bold'}>{'Your Treasury'}</h2>
						</div>
						<div className={'flex items-center justify-between'}>
							<div className={'m-0'}>
								<p>
									{'Holdings, ETH'}
								</p>
								<p className={'font-bold'}>
									{'1234.12345678'}
								</p>
							</div>
							<div className={'m-0'}>
								<p>
									{'Holdings, $'}
								</p>
								<p className={'font-bold'}>
									{'51234.12'}
								</p>
							</div>
							<div>
								<p>
									{'Earnings, ETH'}
								</p>
								<p className={'font-bold'}>
									{'1234.12345678'}
								</p>
							</div>
							<div>
								<p>
									{'Est. Yield, %'}
								</p>
								<p className={'font-bold'}>
									{'12.4'}
								</p>
							</div>
						</div>
					</div>
					<Chart />
					<div className={'flex justify-start'}>
						<Link href={'/keep-eth'}>
							<div>
								<WithShadow role={'button'}>
									<Button className={'w-[176px]'}>
										{'Deposit'}
									</Button>
								</WithShadow>
							</div>
						</Link>
						<div className={'ml-6'}>
							<Link href={'/withdraw'}>
								<div>
									<WithShadow role={'button'}>
										<Button className={'w-[176px]'}>
											{'Withdraw'}
										</Button>
									</WithShadow>
								</div>
							</Link>
						</div>
					</div>
				</Card>
			</WithShadow>
			<div className={'ml-24'}>
				<WithShadow role={'large'}>
					<Card className={'flex h-[544px] w-[400px] flex-col justify-between'}>
						<div className={'space-y-6'}>
							<div className={'w-full pb-6'}>
								<h2 className={'font-bold'}>{'Your Wallet'}</h2>
							</div>
							<div>
								<p>
									{'ETH'}
								</p>
								<p className={'font-bold'}>
									{'1234.12345678'}
								</p>
							</div>
							<div>
								<p>
									{'USDC'}
								</p>
								<p className={'font-bold'}>
									{'51234.12'}
								</p>
							</div>
						</div>
						<div className={'flex justify-start'}>
							<Link href={'/keep-eth'}>
								<div>
									<WithShadow role={'button'}>
										<Button className={'w-[176px]'}>
											{'Swap'}
										</Button>
									</WithShadow>
								</div>
							</Link>
						</div>
					</Card>
				</WithShadow>
			</div>
		</div>
	);
}

export default DisclaimerPage;