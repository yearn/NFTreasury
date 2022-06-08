import	React, {ReactElement}	from	'react';
import	{Card, Button}			from	'@yearn-finance/web-lib/components';
import	WithShadow				from	'components/WithShadow';

function	Index(): ReactElement {
	return (
		<section aria-label={'some default section'}>
			<div className={'mb-4'}>
				<WithShadow>
					<Card>
						<div>
							<h4>{'NFTReasury draft'}</h4>
							<p className={'text-primary'}>{'With this color system, we are trying to mimic some material standard conventions, with the use of `primary`, `secondary`, `variant`, `background`, `surface`, etc. Naming if far from perfect yet, but it\'s a Work In Progress'}</p>
							<p className={'block mt-4 text-primary'}>{'The colors are set using css variables and can be overrited in your style.css file.'}</p>
						</div>
					</Card>
				</WithShadow>
			</div>
			<Card>
				<div className={'grid grid-cols-4 gap-6 mb-8'}>
					<div>
						<WithShadow role={'button'}>
							<Button className={'w-[116px]'}>
								{'Hello ser'}
							</Button>
						</WithShadow>
					</div>

					<div>
						<WithShadow role={'button'}>
							<Button variant={'outlined'} className={'w-[116px]'}>
								{'Hello ser'}
							</Button>
						</WithShadow>
					</div>
				</div>
			</Card>
		</section>
	);
}

export default Index;
