import	React, {ReactElement, useState}	from	'react';
import	Image							from	'next/image';
import	{Card, Button}					from	'@yearn-finance/web-lib/components';
import	WithShadow						from	'components/WithShadow';
import	{ethers, BigNumber}				from	'ethers';
import	{useWeb3}						from	'@yearn-finance/web-lib/contexts';
import	{useLocalStorage}				from	'@yearn-finance/web-lib/hooks';

function	Page(): ReactElement {
	const [ethToSwap, set_ethToSwap] = useLocalStorage("ethToSwap", "0");
	const [isShowingArrow] = useState(false);
	const {provider,address} = useWeb3();

	const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]

	const wethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

	const weth = new ethers.Contract(wethAddress, abi, provider.getSigner());

	return (
		<div className={'flex items-center h-full'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-[600px] h-[600px]'}>
					<div>
						<div className={'pb-6 w-full'}>
							<h2 className={'font-bold'}>{'Wrap ETH'}</h2>
						</div>
						<div className={'space-y-6 w-10/12 text-justify'}>
							<p>
								{'You have to sign one more transaction. That’s just how it works. Don’t ask...'}
							</p>
						</div>
					</div>
					<div className={'flex justify-start'}>
						<div onClick={(): void => {
							console.log(address)
							console.log(ethers.utils.parseUnits(String(Number(ethToSwap).toFixed(18))))

							// weth.balanceOf(address).then(console.log)

							// weth.withdraw({ value: BigNumber.from(String(Number(ethToSwap).toFixed(18))) }).then((tx: ethers.providers.TransactionResponse): void => {
							// 	console.log(tx)
							// }).catch((err: Error): void => {
							// 	console.log(err)
							// })

							weth.deposit({ value: ethers.utils.parseUnits(String(Number(ethToSwap).toFixed(18)), "ether") }).then((tx: ethers.providers.TransactionResponse): void => {
								console.log(tx)
							}).catch((err: Error): void => {
								console.log(err)
							})
						}}>
							<WithShadow role={'button'}>
								<Button className={'w-[176px]'}>
									{'Hit'}
								</Button>
							</WithShadow>
						</div>
					</div>
				</Card>
			</WithShadow>
			<div className={'flex justify-center items-start min-w-[500px] h-[600px]'}>
				<Image width={279} height={322} quality={90} src={'/wrap-eth.svg'} className={`transition duration-1000 ease-in-out ${isShowingArrow ? 'opacity-100' : 'opacity-0'}`} />
			</div>
		</div>
	);
}

export default Page;