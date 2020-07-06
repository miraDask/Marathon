import React from 'react';

const FormInput = ({ handleChange, handleOnBlur, addClass, ...otherProps }) => {
	return (
		<input
			className={`bg-white rounded border border-gray-400
			 focus:outline-none focus:border-teal-500
			  text-base px-4 py-2 mt-4 ${addClass}`}
			onChange={handleChange}
			onBlur={handleOnBlur}
			{...otherProps}
		/>
	);
};

export default FormInput;
