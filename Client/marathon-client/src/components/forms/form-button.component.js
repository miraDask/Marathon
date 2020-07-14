import React from 'react';

const FormButton = ({ children, disabled, textSize, addClass, onClick, ...otherProps }) => (
	<button
		type="submit"
		onClick={onClick}
		{...otherProps}
		className={`text-white
 bg-green-400
 border-0
 py-2 px-8 focus:outline-none ${disabled ? 'cursor-not-allowed' : 'hover:bg-green-700'} rounded ${!textSize
			? 'text-lg'
			: textSize} ${addClass}`}
	>
		{children}
	</button>
);

export default FormButton;
