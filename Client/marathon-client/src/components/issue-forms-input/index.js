import React from 'react';

const IssueFormsInput = ({ handleChange, handleOnBlur, ...otherProps }) => {
	return (
		<input
			className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2"
			onChange={handleChange}
			onBlur={handleOnBlur}
			{...otherProps}
		/>
	);
};

export default IssueFormsInput;
