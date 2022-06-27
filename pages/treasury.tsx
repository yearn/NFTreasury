import	React, {ReactElement}						from	'react';
import	Link										from	'next/link';
import	{Card, Button}								from	'@yearn-finance/web-lib/components';
import	WithShadow									from	'components/WithShadow';
import {LineChart, Line, Tooltip, XAxis, YAxis,
	ResponsiveContainer} 							from 	'recharts';

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

function	TreasuryPage(): ReactElement {
	return (
		<div className={'flex flex-col items-center h-full md:flex-row'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-full md:w-[700px] md:h-[544px]'}>
					<div>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'Your Treasury'}</h2>
						</div>
						<div className={'flex flex-wrap justify-between items-center mb-6 md:mb:0'}>
							<div className={'mb:p-0 px-2 m-0 mb-4 md:p-0'}>
								<p>
									{'Holdings, ETH'}
								</p>
								<p className={'font-bold'}>
									{'1234.12345678'}
								</p>
							</div>
							<div className={'px-2 m-0 md:p-0'}>
								<p>
									{'Holdings, $'}
								</p>
								<p className={'font-bold'}>
									{'51234.12'}
								</p>
							</div>
							<div className={'px-2 m-0 md:p-0'}>
								<p>
									{'Earnings, ETH'}
								</p>
								<p className={'font-bold'}>
									{'1234.12345678'}
								</p>
							</div>
							<div className={'px-2 m-0 md:p-0'}>
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
					<div className={'flex flex-col justify-start items-start md:flex-row'}>
						<Link href={'/keep-eth'}>
							<div>
								<WithShadow role={'button'}>
									<Button className={'w-[176px]'}>
										{'Deposit'}
									</Button>
								</WithShadow>
							</div>
						</Link>
						<div className={'mt-8 md:mt-0 md:ml-6'}>
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
			<div className={'mt-8 w-full md:mt-0 md:ml-24'}>
				<WithShadow role={'large'}>
					<Card className={'flex flex-col justify-between w-full h-[544px] md:w-[400px]'}>
						<div className={'space-y-6'}>
							<div className={'pb-6 w-full'}>
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

export default TreasuryPage;