import	React, {ReactElement}	from	'react';
import	{Card}			from	'@yearn-finance/web-lib/components';
import	{Cross}					from	'@yearn-finance/web-lib/icons';
import	WithShadow				from	'components/WithShadow';
import	Link					from	'next/link';

function	DialogBox({children=<div />, title='', paragraphs=['']}): ReactElement {
	return (
		<div className={'flex h-full w-8/12 items-center'}>
			<WithShadow role={'large'}>
				<Card className={'flex h-[500px] w-full flex-col justify-between'}>
					<div>
						<div className={'flex w-full flex-row justify-between pb-6'}>
							<h3 className={'font-bold'}>{title}</h3>
							<Link href={'/'}>
								<Cross className={'h-6 w-6 cursor-pointer text-neutral-500 transition-colors hover:text-neutral-700'} />
							</Link>
						</div>
						<div className={'space-y-6 text-justify'}>
							{paragraphs.map((paragraph: string): ReactElement => <p key={paragraph}>{paragraph}</p>)}
						</div>
					</div>
					{children}
				</Card>
			</WithShadow>
		</div>
	);
}

export default DialogBox;