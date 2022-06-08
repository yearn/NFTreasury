import	React, {ReactElement}		from	'react';

function	WithShadow({
	role = 'generic',
	children = <div />
}): ReactElement {
	return (
		<div
			role={role}
			className={'nftreasury--withShadow'}>
			{children}
		</div>
	);
}

export default WithShadow;