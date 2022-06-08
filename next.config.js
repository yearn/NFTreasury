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
		**********************************************************************/
		WEBSITE_URI: 'https://web.ycorpo.com/',
		WEBSITE_NAME: 'yWeb',
		WEBSITE_TITLE: 'yWeb',
		WEBSITE_DESCRIPTION: 'Template used for Yearn\'s projects',
		PROJECT_GITHUB_URL: 'https://github.com/yearn/yearn-template',

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
		ALCHEMY_KEY: process.env.ALCHEMY_KEY
	}
});
