import React from 'react';

const FormButton = ({ children, addClass }) => (
	<button
		type="submit"
		className={`text-white
 bg-green-400
 border-0
 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg mt-4 ${addClass}`}
	>
		{children}
	</button>
);

export default FormButton;
