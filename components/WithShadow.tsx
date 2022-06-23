import	React, {ReactElement}		from	'react';

function	WithShadow({
	role = 'generic',
	isDisabled = false,
	onClick = (): void => undefined,
	children = <div />
}): ReactElement {
	if (role === 'button') {
		if (isDisabled)
			role = 'button-disabled';
		return (
			<div
				onClick={(): unknown => isDisabled ? null : onClick()}
				className={'nftreasury--withShadow-wrapper'}>
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