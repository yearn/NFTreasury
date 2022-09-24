import {BigNumber} from 'ethers';
import {Order} from '@gnosis.pm/gp-v2-contracts';

export type TYearnVault = {
	inception: number;
	address: string;
	symbol: string;
	name: string;
	display_name: string;
	icon: string;
	token: TToken;
	tvl: TTvl;
	apy: TApy;
	strategies?: (TStrategiesEntity | null)[] | null;
	endorsed: boolean;
	version: string;
	decimals: number;
	type: string;
	emergency_shutdown: boolean;
	updated: number;
	migration?: TMigration | null;
	special?: boolean | null;
}

export type TToken = {
	name: string;
	symbol: string;
	address: string;
	decimals: number;
	display_name: string;
	icon: string;
}

export type TTvl = {
	total_assets: number;
	price: number;
	tvl: number;
}

export type TApy = {
	type: string;
	gross_apr: number;
	net_apy: number;
	fees: TFees;
	points?: TPoints | null;
	composite?: TComposite | null;
}

export type TFees = {
	performance?: number | null;
	withdrawal?: number | null;
	management?: number | null;
	keep_crv?: number | null;
	cvx_keep_crv?: number | null;
}

export type TPoints = {
	week_ago: number;
	month_ago: number;
	inception: number;
}

export type TComposite = {
	currentBoost?: number | null;
	boostedApy?: number | null;
	totalApy?: number | null;
	poolApy?: number | null;
	baseApy?: number | null;
	boost?: number | null;
	pool_apy?: number | null;
	boosted_apr?: number | null;
	base_apr?: number | null;
	cvx_apr?: number | null;
	rewards_apr?: number | null;
}

export type TStrategiesEntity = {
	address: string;
	name: string;
}

export type TMigration = {
	available: boolean;
	address: string;
}

export type TCowSwapQuote = {
	quote: Order;
	from: string;
	expiration: string;
	id: number;
};

export type TChartData = {
	timestamp: string
	pricePerShare: BigNumber
	tokenPriceUSDC: number
	normalizedPricePerShare: number
	accumulatedBalance: number
}
