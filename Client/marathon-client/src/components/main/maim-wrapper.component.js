import React from 'react';

const MainWrapper = ({ children, ...otherProps }) => (
	<section class="text-gray-700 body-font p-16" {...otherProps}>
		{children}
	</section>
);
export default MainWrapper;
