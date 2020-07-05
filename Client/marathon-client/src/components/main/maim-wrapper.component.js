import React from 'react';

const MainWrapper = ({ children, ...otherProps }) => (
	<section class="text-gray-700 body-font" {...otherProps}>
		{children}
	</section>
);
export default MainWrapper;
