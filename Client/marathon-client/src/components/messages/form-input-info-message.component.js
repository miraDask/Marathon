import React from 'react';

const InfoMessageContainer = ({ children, addClass }) => (
	<div className={`text-green-700 ${addClass}`}>&lowast; {children}</div>
);

export default InfoMessageContainer;
