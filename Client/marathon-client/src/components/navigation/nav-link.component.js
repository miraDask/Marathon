import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

const NavLink = ({ children, to, handleSignOut, inverted }) => {
	const hover = inverted ? '' : 'hover:';
	return (
		<Link to={to} onClick={handleSignOut} className={`mr-5 ${hover}text-green-400`}>
			{children}
		</Link>
	);
};

export default NavLink;
