const Dotenv = require('dotenv-webpack');

module.exports = ({
	experimental: {
		concurrentFeatures: true
	},
	plugins: [new Dotenv()],
	images: {
		domains: [
			'rawcdn.githack.com'
		]
	},
	env: {
		/* 🔵 - Yearn Finance **************************************************
		** Stuff used for the SEO or some related elements, like the title, the
		** github url etc.
		** - WEBSITE_URI is used to display the og image and get the base URI
		** - WEBSITE_NAME is used as name displayed on the top of the tab in
		**   the browser.
		** - WEBSITE_TITLE should be the name of your website. It may be used
		**   by third parties to display your app name (coinbase for instance)
		** - WEBSITE_DESCRIPTION is used in the meta tags
		** - PROJECT_GITHUB_URL should be the link to your project on GitHub
		**********************************************************************/
		WEBSITE_URI: 'https://nft.ycorpo.com/',
		WEBSITE_NAME: 'NFTreasury',
		WEBSITE_TITLE: 'NFTreasury',
		WEBSITE_DESCRIPTION: 'A treasury management tool for NFT projects. Powered by Yearn.',
		PROJECT_GITHUB_URL: 'https://github.com/Majorfi/NFTreasury/tree/main',

		/* 🔵 - Yearn Finance **************************************************
		** Some config used to control the behaviour of the web library. By
		** default, all of theses are set to false.
		** USE_WALLET: should we allow the user to connect a wallet via
		**             metamask or wallet connect?
		** USE_PRICES: should we fetch the prices for a list of tokens? If true
		**             the CG_IDS array should be populated with the tokens
		**             to fetch.
		** USE_PRICE_TRI_CRYPTO: should we fetch the special Tri Crypto token
		** 			   price? (require blockchain call)
		**********************************************************************/
		USE_WALLET: true,
		USE_PRICES: true,
		USE_PRICE_TRI_CRYPTO: false,
		CG_IDS: ['ethereum'],
		TOKENS: [],

		/* 🔵 - Yearn Finance **************************************************
		** Config over the RPC
		**********************************************************************/
		WEB_SOCKET_URL: {
			1: process.env.WS_URL_MAINNET,
			250: process.env.WS_URL_FANTOM,
			42161: process.env.WS_URL_ARBITRUM
		},
		JSON_RPC_URL: {
			1: process.env.RPC_URL_MAINNET,
			250: process.env.RPC_URL_FANTOM,
			42161: process.env.RPC_URL_ARBITRUM
		},
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,
		INFURA_KEY: process.env.INFURA_KEY,

		/* 🔵 - Yearn Finance **************************************************
		** Project specific config
		**********************************************************************/
		COW_APP_DATA: '0x2B8694ED30082129598720860E8E972F07AA10D9B81CAE16CA0E2CFB24743E24',
		COW_APP_DATA_IPFS: 'https://bafybeiblq2ko2maieeuvtbzaqyhi5fzpa6vbbwnydsxbnsqoft5si5b6eq.ipfs.dweb.link',
		COW_VAULT_RELAYER_ADDRESS: '0xC92E8bdf79f0507f65a392b0ab4667716BFE0110',
		ZAP_ETH_WETH_CONTRACT: '0xd1791428C38E25d459D5B01fB25E942d4aD83a25',

		ETH_VAULT_ADDRESS: '0xa258C4606Ca8206D8aA700cE2143D7db854D168c',
		ETH_TOKEN_ADDRESS: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
		WETH_TOKEN_ADDRESS: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
		USDC_TOKEN_ADDRESS: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
	}
});
