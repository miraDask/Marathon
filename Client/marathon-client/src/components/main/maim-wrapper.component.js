import React from 'react';

const MainWrapper = ({ children, otherClasses, ...otherProps }) => (
	<section className={`text-gray-700 body-font bg-gray-10 flex-grow ${otherClasses}`} {...otherProps}>
		{children}
	</section>
);
export default MainWrapper;
