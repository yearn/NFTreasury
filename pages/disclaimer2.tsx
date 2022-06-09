import	React, {ReactElement}	from	'react';
import	Link					from	'next/link';
import	{Card, Button}					from	'@yearn-finance/web-lib/components';
import	{Cross}					from	'@yearn-finance/web-lib/icons';
import	WithShadow				from	'components/WithShadow';
import { useRouter } 			from 	'next/router'

function	DisclaimerPage(): ReactElement {
    const router = useRouter();
	return (
		<div className={'w-8/12 h-full flex items-center'}>
            <WithShadow role="large">
                <Card className={'w-full h-[500px] flex flex-col justify-between'}>
                    <div className={'flex flex-row justify-between pb-6 w-full'}>
                        <h3 className={'font-bold'}>{'Why Cowswap?'}</h3>
                        <Link href={'/'}>
                            <Cross className={'w-6 h-6 transition-colors cursor-pointer text-typo-primary hover:text-typo-primary-variant'} />
                        </Link>
                    </div>
                    <div className={'space-y-6 text-justify mb-24'}>
                        <p>
                            {'We use Cowswap because we like cows, swaps, and because they use gas-less orders that are settled peer-to-peer while providing MEV* protection. You can find out more about how they settle trades without incurring slippage & fees here. '}
                        </p>
                    </div>
                    <div className={'flex justify-between mt-20'}>
                        <div>
                            <WithShadow role={'button'}>
                                <Button className={'w-[176px]'} onClick={(e) => { e.preventDefault(); router.push('/disclaimer') }}>
                                    {'Previous'}
                                </Button>
                            </WithShadow>
                        </div>
                        <div>
                            <WithShadow role={'button'}>
                                <Button className={'w-[176px]'} onClick={(e) => { e.preventDefault(); router.push('/disclaimer3') }}>
                                    {'Next'}
                                </Button>
                            </WithShadow>
                        </div>
                    </div>
                </Card>
            </WithShadow>
		</div>
	);
}

export default DisclaimerPage;