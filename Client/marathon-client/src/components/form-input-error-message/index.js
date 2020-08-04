import React from 'react';

const ErrorMessageContainer = ({ children, otherClasses }) => (
	<div className={`text-red-500 ${otherClasses}`}>&lowast; {children}</div>
);

export default ErrorMessageContainer;
