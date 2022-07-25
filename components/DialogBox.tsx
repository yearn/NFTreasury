import	React, {ReactElement}	from	'react';
import	{Card}					from	'@yearn-finance/web-lib/components';
import	{Cross}					from	'@yearn-finance/web-lib/icons';
import	WithShadow				from	'components/WithShadow';
import	Link					from	'next/link';

function	DialogBox({children=<div />, title='', paragraphs=[<p key={'0'} />]}): ReactElement {
	return (
		<div className={'flex h-full w-full items-center text-sm md:w-8/12 md:pl-4 md:text-base'}>
			<WithShadow role={'large'}>
				<Card className={'flex min-h-[500px] w-full flex-col justify-between md:h-[500px]'}>
					<div>
						<div className={'flex w-full flex-row justify-between pb-6'}>
							<h3 className={'font-bold'}>{title}</h3>
							<Link href={'/'}>
								<Cross className={'h-6 w-6 cursor-pointer text-neutral-500 transition-colors hover:text-neutral-700'} />
							</Link>
						</div>
						<div className={'space-y-6 text-justify'}>
							{paragraphs.map((paragraph: ReactElement): ReactElement => paragraph)}
						</div>
					</div>
					{children}
				</Card>
			</WithShadow>
		</div>
	);
}

export default DialogBox;