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
                        <h3 className={'font-bold'}>{'Yearn Vaults'}</h3>
                        <Link href={'/'}>
                            <Cross className={'w-6 h-6 transition-colors cursor-pointer text-typo-primary hover:text-typo-primary-variant'} />
                        </Link>
                    </div>
                    <div className={'space-y-6 text-justify mb-16'}>
                        <p>
                            {'Vaults are a passive investing strategy, enabling people to put their capital to work via automation. Each Vault auto-compounds earned tokens, meaning Yearn reinvests earned tokens to generate additional earnings over time. A strategy is an automated smart contract. It puts your tokens into different protocols to generate yield.'}
                        </p>
                        <p>
                            {'Users benefit from socializing gas costs and need not be experts in defi or the underlying protocols to utilize Yearn Vaults.'}
                        </p>
                    </div>
                    <div className={'flex justify-end mt-20'}>
                        <div>
                            <WithShadow role={'button'}>
                                <Button className={'w-[176px]'} onClick={(e) => { e.preventDefault(); router.push('/disclaimer2') }}>
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