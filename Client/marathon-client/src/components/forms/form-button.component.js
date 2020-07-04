import React from 'react';

const FormButton = ({ children }) => (
	<button
		type="submit"
		className="text-white
 bg-teal-500
 border-0
 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg mt-4"
	>
		{children}
	</button>
);

export default FormButton;
