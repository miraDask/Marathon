import React from 'react';

const CustomLabel = ({ children, labelFor }) => (
	<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={labelFor}>
		{children}
	</label>
);

export default CustomLabel;
