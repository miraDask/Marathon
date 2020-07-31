import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

const NavLink = ({ children, handleClick, textColor, hoverColor, otherClasses, ...otherProps }) => {
	const hover = !hoverColor ? '' : `hover:text-${hoverColor}`;
	const text = !textColor ? '' : `text-${textColor}`;
	return (
		<Link {...otherProps} onClick={handleClick} className={`${hover} ${text} ${otherClasses}`}>
			{children}
		</Link>
	);
};

export default NavLink;
