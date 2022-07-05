import	React, {ReactElement}						from	'react';
import	Link										from	'next/link';
import	{Card, Button}								from	'@yearn-finance/web-lib/components';
import	{format}									from	'@yearn-finance/web-lib/utils';
import	WithShadow									from	'components/WithShadow';
import {LineChart, Line, Tooltip, XAxis,
	ResponsiveContainer} 							from 	'recharts';
import useWallet from 'contexts/useWallet';
import useYearn from 'contexts/useYearn';

function Chart({data}: {data: any[]}): ReactElement {
	const ActiveDot = (props: any): ReactElement => {
		const	{cx, cy} = props;
		return (
			<svg x={cx - 5} y={cy - 5} width={10} height={10} fill={'none'} viewBox={'0 0 10 10'}>
				<rect x={'1'} y={'1'} width={'8'} height={'8'} fill={'white'} stroke={'black'} strokeWidth={'2'}/>
			</svg>
		);
	};
	const CustomTooltip = (props: any): ReactElement | null => {
		const	{active, payload} = props;
		if (active && payload && payload.length) {
			return (
				<div className={'custom-tooltip'}>
					<p className={'label'}>{`$ ${format.amount(payload[0].value, 2, 2)}`}</p>
				</div>
			);
		}
		
		return null;
	};

	const	minInData = Math.min(...data.map((d): number => d.accumulatedBalance));
	const	maxInData = Math.max(...data.map((d): number => d.accumulatedBalance));
	return (
		<div className={'flex flex-row space-x-2 w-full h-[192px]'}>
			<ResponsiveContainer width={'83%'} height={192}>
				<LineChart
					className={'overflow-hidden max-h-[192px] border-2 border-black'}
					margin={{top: 8, right: 0, left: 0, bottom: 8}}
					data={(
						data
							.map((dayData): {name: string, ['USD Price']: number} => ({
								name: format.date(dayData.timestamp * 1000),
								['USD Price']: Number(dayData.accumulatedBalance)
							})))}>
					<XAxis dataKey={'name'} stroke={'#000'} tick={false} axisLine={false} height={0} />
					<Tooltip content={<CustomTooltip />} />
					<Line
						activeDot={<ActiveDot />}
						type={'monotone'}
						dataKey={'USD Price'}
						stroke={'#000'}
						strokeWidth={2}
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
			<div className={'flex flex-col justify-between h-full'}>
				<div className={'text-xs whitespace-nowrap text-neutral-400'}>{`${format.amount(Number(maxInData), 2, 2)} $`}</div>
				<div className={'text-xs whitespace-nowrap text-neutral-400'}>{`${Number(maxInData) === Number(minInData) ? '0' : format.amount(Number(minInData), 2, 2)} $`}</div>
			</div>
		</div>
	);
}

function	TreasuryPage(): ReactElement {
	const	{balances, prices} = useWallet();
	const	{yvEthData, balanceData, earnings} = useYearn();

	const	chartData = React.useMemo((): any => {
		const	_chartData = [...(balanceData || [])].sort((a, b): number => Number(a.timestamp) - Number(b.timestamp));
		if (_chartData?.[0]?.accumulatedBalance === 0 && _chartData?.[1]?.accumulatedBalance === 0) {
			return _chartData.slice(2);
		} else if (_chartData?.[0]?.accumulatedBalance === 0) {
			return _chartData.slice(1);
		}
		return _chartData;
	}, [balanceData]);

	return (
		<div className={'flex flex-col items-center w-full h-full md:flex-row justify-betwee'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col w-full md:w-[752px] md:h-[488px]'}>
					<div className={'mb-8 md:w-[608px]'}>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'Your Treasury'}</h2>
						</div>
						<div className={'flex flex-wrap justify-between items-center'}>
							<div className={'px-2 m-0 md:p-0'}>
								<p>{'Holdings, ETH'}</p>
								<p className={'font-bold'}>
									{balances ? format.amount(balances[process.env.ETH_VAULT_ADDRESS as string]?.normalized || 0, 8, 8) : '-'}
								</p>
							</div>
							<div className={'px-2 m-0 text-right sm:text-left md:p-0'}>
								<p>
									{'Holdings, $'}
								</p>
								<p className={'font-bold'}>
									{balances ? format.amount(
										(balances[process.env.ETH_VAULT_ADDRESS as string]?.normalized || 0)
										* (prices[process.env.ETH_VAULT_ADDRESS as string]?.normalized || 0),
										8, 8
									) : '-'}
								</p>
							</div>
							<div className={'px-2 m-0 md:p-0'}>
								<p>{'Earnings, ETH'}</p>
								<p className={'font-bold'}>
									{format.amount(earnings, 8, 8)}
								</p>
							</div>
							<div className={'px-2 m-0 text-right sm:text-left md:p-0'}>
								<p>
									{'Est. Yield, %'}
								</p>
								<p className={'font-bold'}>
									{yvEthData ? `${format.amount((yvEthData?.apy?.net_apy || 0) * 100, 2, 2)}` : '-'}
								</p>
							</div>
						</div>
					</div>
					<Chart data={chartData || []}/>
					<div className={'flex justify-start mt-8'}>
						<Link href={'/deposit'}>
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
			<div className={'flex justify-end mt-8 w-full md:mt-0'}>
				<WithShadow role={'large'}>
					<Card className={'flex flex-col justify-between w-full h-[340px] md:w-[400px] md:h-[488px]'}>
						<div className={'space-y-6'}>
							<div className={'pb-6 w-full'}>
								<h2 className={'font-bold'}>{'Your Wallet'}</h2>
							</div>
							<div>
								<p>{'ETH'}</p>
								<p className={'font-bold'}>
									{balances ? format.amount(balances[process.env.ETH_TOKEN_ADDRESS as string]?.normalized || 0, 8, 8) : '-'}
								</p>
							</div>
							<div>
								<p>{'USDC'}</p>
								<p className={'font-bold'}>
									{balances ? format.amount(balances[process.env.USDC_TOKEN_ADDRESS as string]?.normalized || 0, 2, 6) : '-'}
								</p>
							</div>
						</div>
						<div className={'flex justify-start mb-0 md:mb-4'}>
							<Link href={'/swap-eth'}>
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