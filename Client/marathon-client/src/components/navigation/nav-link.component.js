import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

const NavLink = ({ children, to, handleSignOut, textColor, hoverColor }) => {
	const hover = !hoverColor ? '' : `hover:text-${hoverColor}`;
	const text = !textColor ? '' : `text-${textColor}`;
	return (
		<Link to={to} onClick={handleSignOut} className={`mr-5 ${hover} ${text}`}>
			{children}
		</Link>
	);
};

export default NavLink;
