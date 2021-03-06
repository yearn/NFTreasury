import	React, {ReactElement}	from	'react';
import	{Card}					from	'@yearn-finance/web-lib/components';
import	{Cross}					from	'@yearn-finance/web-lib/icons';
import	WithShadow				from	'components/WithShadow';
import	Link					from	'next/link';

function	DialogBox({children=<div />, title='', paragraphs=[<p key={'0'} />]}): ReactElement {
	return (
		<div className={'flex items-center w-full h-full text-sm md:pl-4 md:w-8/12 md:text-base'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col justify-between w-full min-h-[500px] md:h-[500px]'}>
					<div>
						<div className={'flex flex-row justify-between pb-6 w-full'}>
							<h3 className={'font-bold'}>{title}</h3>
							<Link href={'/'}>
								<Cross className={'w-6 h-6 transition-colors cursor-pointer text-neutral-500 hover:text-neutral-700'} />
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