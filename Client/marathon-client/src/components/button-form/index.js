import React from 'react';

const FormButton = ({ children, disabled, textSize, addClass, onClick, ...otherProps }) => (
	<button
		type="submit"
		onClick={onClick}
		{...otherProps}
		className={`text-white border-0 py-2 px-4 focus:outline-none 
		${disabled ? 'cursor-not-allowed  bg-green-200' : 'hover:bg-green-700  bg-green-400'}
		 rounded ${!textSize ? 'text-lg' : textSize} ${addClass}`}
	>
		{children}
	</button>
);

export default FormButton;
