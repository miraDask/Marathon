import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

const NavLink = ({ children, to, handleClick, textColor, hoverColor, otherClasses }) => {
	const hover = !hoverColor ? '' : `hover:text-${hoverColor}`;
	const text = !textColor ? '' : `text-${textColor}`;
	return (
		<Link to={to} onClick={handleClick} className={`mr-5 ${hover} ${text} ${otherClasses}`}>
			{children}
		</Link>
	);
};

export default NavLink;
