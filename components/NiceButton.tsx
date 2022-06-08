import	React, {ReactElement}		from	'react';

function	NiceButton(props: React.HTMLProps<'button'>): ReactElement {
	return (
		<div
			className={'group relative mt-1 w-full h-10 bg-repeat transition-colors cursor-pointer bg-secondary'} style={{backgroundImage: 'url("/shadowPattern.svg")'}}>
			<div className={'flex absolute -top-2 group-hover:-top-1 active:!top-0 -left-2 group-hover:-left-1 active:!left-0 justify-center items-center w-full h-full font-bold text-white border-2 transition-all cursor-pointer bg-primary group-hover:bg-black-1 border-primary group-hover:border-primary'}>
				{props.children}
			</div>
		</div>
	);
}

export default NiceButton;