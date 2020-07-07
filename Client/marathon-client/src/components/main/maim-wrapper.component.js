import React from 'react';

const MainWrapper = ({ children, otherClasses, ...otherProps }) => (
	<section className={`text-gray-700 body-font bg-gray-100 ${otherClasses}`} {...otherProps}>
		{children}
	</section>
);
export default MainWrapper;
