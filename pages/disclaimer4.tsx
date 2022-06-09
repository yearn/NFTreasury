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
                        <h3 className={'font-bold'}>{'Risk'}</h3>
                        <Link href={'/'}>
                            <Cross className={'w-6 h-6 transition-colors cursor-pointer text-typo-primary hover:text-typo-primary-variant'} />
                        </Link>
                    </div>
                    <div className={'space-y-6 text-justify'}>
                        <p>
                            {'Vaults and other Yearn decentralized finance systems, while superficially similar to traditional financial transactions in some ways, are in fact very different. DeFi and TradFi each have unique costs and benefits, risks and protection mechanisms. Please bear this fact in mind when using this website, and do not use Yearn vaults without a sufficient understanding of their unique risks and how they differ from traditional financial transactions. The only way to fully understand such risks is to have a strong understanding of the relevant technical systems and the incentive design mechanisms they embody--we strongly encourage you to review Yearn’s technical documentation and code before use.'}
                        </p>
                    </div>
                    <div className={'flex justify-start mt-20'}>
                        <div>
                            <WithShadow role={'button'}>
                                <Button className={'w-[176px]'} onClick={(e: React.MouseEvent) => { e.preventDefault(); router.push('/disclaimer3') }}>
                                    {'Previous'}
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