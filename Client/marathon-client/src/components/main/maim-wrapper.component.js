import React from 'react';

const MainWrapper = ({ children, ...otherProps }) => (
	<section className="text-gray-700 body-font bg-gray-100" {...otherProps}>
		{children}
	</section>
);
export default MainWrapper;
