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
                        <h3 className={'font-bold'}>{'*wtf is MEV?'}</h3>
                        <Link href={'/'}>
                            <Cross className={'w-6 h-6 transition-colors cursor-pointer text-typo-primary hover:text-typo-primary-variant'} />
                        </Link>
                    </div>
                    <div className={'space-y-6 text-justify'}>
                        <p>
                            {'MEV stands for Maxium Extractable Value, and is the term given to the value extracted by miners through the reordering or censoring of blocks. Imagine if you had to call a broker every time you wanted to buy a monkey jpeg. You tell the broker which monkey you want to buy, she places the order, the order gets filled and you recieve your moneky picture. Now imagine there was someone listening in on the call who was able to place an order ahead of yours (which they now know is coming) frontrunning you and making money from the opportunity. That’s MEV. Here’s a video if you want to learn more.'}
                        </p>
                    </div>
                    <div className={'flex justify-between mt-20'}>
                        <div>
                            <WithShadow role={'button'}>
                                <Button className={'w-[176px]'} onClick={(e) => { e.preventDefault(); router.push('/disclaimer2') }}>
                                    {'Previous'}
                                </Button>
                            </WithShadow>
                        </div>
                        <div>
                            <WithShadow role={'button'}>
                                <Button className={'w-[176px]'} onClick={(e) => { e.preventDefault(); router.push('/disclaimer4') }}>
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