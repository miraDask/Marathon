import React from 'react';

const ClearButton = ({ children, disabled, textSize, addClass, onClick, ...otherProps }) => {
	const getStyles = () => {
		return disabled
			? 'text-gray-400 cursor-not-allowed'
			: 'text-gray-800 border-2 border-gray-400 hover:bg-green-100';
	};

	return (
		<button
			type="submit"
			disabled={disabled ? disabled : null}
			onClick={onClick}
			{...otherProps}
			className={`py-2 px-3 ${getStyles()} rounded ${!textSize ? 'text-md' : textSize} ${addClass}`}
		>
			{children}
		</button>
	);
};

export default ClearButton;
