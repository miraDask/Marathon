import React from 'react';

const SubmitButton = ({ children, left }) => {
	return (
		<button
			type="submit"
			className={`inline-block mx-auto text-white bg-green-400 ${left} border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg`}
		>
			{children}
		</button>
	);
};

export default SubmitButton;
