import	{Order}		from	'@gnosis.pm/gp-v2-contracts';

export type	TYearnVault = {
    inception: number,
    address: string,
    symbol: string,
    display_symbol: string,
    formated_symbol: string,
    name: string,
    display_name: string,
    formated_name: string,
    icon: string,
    token: {
        address: string,
        name: string,
        display_name: string,
        symbol: string,
        description: string,
        decimals: number,
        icon: string,
    },
    tvl: {
        total_assets: string,
        tvl: number,
        price: number
    },
    apy: {
        type: string,
        gross_apr: number,
        net_apy: number,
        fees: {
            performance: number,
            withdrawal: number,
            management: number,
            keep_crv: number,
            cvx_keep_crv: number
        },
        points: {
            week_ago: number,
            month_ago: number,
            inception: number,
        },
        composite: {
            boost: number,
            pool_apy: number,
            boosted_apr: number,
            base_apr: number,
            cvx_apr: number,
            rewards_apr: number
        }
    },
    strategies: [{
		address: string,
		name: string,
		description: string,
    }],
    endorsed: boolean,
    version: string,
    decimals: number,
    type: string,
    emergency_shutdown: boolean,
    updated: number,
    migration: {
        available: boolean,
        address: string,
    }
}

export type TCowSwapQuote = {
	quote: Order,
	from: string,
	expiration: string,
	id: number
}
