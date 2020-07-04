import React from 'react';

import { Link } from 'react-router-dom';

const NavLink = ({ children, to, handleSignOut, inverted }) => {
	const hover = inverted ? '' : 'hover:';
	return (
		<Link to={to} onClick={handleSignOut} className={`mr-5 ${hover}text-teal-400`}>
			{children}
		</Link>
	);
};

export default NavLink;
