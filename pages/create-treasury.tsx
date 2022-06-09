import	React, {ReactElement}	from	'react';
import	Link					from	'next/link';
import	{Card, Button}					from	'@yearn-finance/web-lib/components';
import	{Cross}					from	'@yearn-finance/web-lib/icons';
import	WithShadow				from	'components/WithShadow';
import {useRouter} 			from 	'next/router';

function	DisclaimerPage(): ReactElement {
	const router = useRouter();
	return (
		<div className={'flex items-center w-6/12 h-full'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-full h-[500px]'}>
					<div className={'flex flex-row justify-between pb-6 w-full'}>
						<h2 className={'font-bold'}>{'Connect project'}</h2>
						<Link href={'/'}>
							<Cross className={'w-6 h-6 transition-colors cursor-pointer text-typo-primary hover:text-typo-primary-variant'} />
						</Link>
					</div>
					<div className={'mb-24 space-y-6 w-10/12 text-justify'}>
						<p>
							{'Connect your NFT project wallet that has money you want to invest.'}
						</p>
						<p>
							{'We know you like clicking buttons.'}
						</p>
					</div>
					<div className={'flex justify-start mt-24'}>
						<div>
							<WithShadow role={'button'}>
								<Button className={'w-[176px]'} onClick={(e: React.MouseEvent): void => {
									e.preventDefault(); router.push('/create-treasury2'); 
								}}>
									{'Click'}
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