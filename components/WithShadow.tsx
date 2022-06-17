import	React, {ReactElement}		from	'react';

function	WithShadow({
	role = 'generic',
	children = <div />
}): ReactElement {
	if (role === 'button') {
		return (
			<div className={'nftreasury--withShadow-wrapper'}>
				<div
					role={role}
					className={'nftreasury--withShadow'}>
					{children}
				</div>
			</div>
		);	
	}
	return (
		<div
			role={role}
			className={'nftreasury--withShadow'}>
			{children}
		</div>
	);
}

export default WithShadow;