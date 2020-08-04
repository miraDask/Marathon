import React from 'react';

const StepTextContainer = ({ title, children }) => (
	<div className="flex-grow pl-4">
		<h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">{title}</h2>
		<p className="leading-relaxed">{children}</p>
	</div>
);

export default StepTextContainer;
