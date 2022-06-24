import	React, {ReactElement}		from	'react';
import	{Card}						from	'@yearn-finance/web-lib/components';
import	WithShadow					from	'components/WithShadow';


function	Appbox({ description=<div />, buttons=<div />, arrow=<div /> }): ReactElement {
	return (
		<div className={'flex items-start pl-0 mt-4 w-full h-full md:items-center md:pl-4 md:mt-0 md:w-6/12'}>
			<WithShadow role={'large'}>
				<Card className={'flex flex-col w-[544px] h-[544px]'}>
                    {description}
                    {buttons}
				</Card>
			</WithShadow>
            <div className={'flex justify-center items-start min-w-[500px] h-[544px]'}>
				{arrow}
			</div>
		</div>
	);
}

export default Appbox;