import React from 'react';

const FormButton = ({ children, textSize, addClass, onClick, ...otherProps }) => (
	<button
		type="submit"
		onClick={onClick}
		{...otherProps}
		className={`text-white
 bg-green-400
 border-0
 py-2 px-8 focus:outline-none hover:bg-green-700 rounded ${!textSize ? 'text-lg' : textSize} mt-4 ${addClass}`}
	>
		{children}
	</button>
);

export default FormButton;
