import React from 'react';
import { Link } from 'react-router-dom';

const DashboardNavItem = ({ type, children, to, handleClick }) => {
	const otherClasses = {
		active: {
			a: 'text-orange-500',
			i: 'text-orange-500',
			span: 'text-orange-500'
		},
		inactive: {
			a: '',
			i: '',
			span: 'hover:text-orange-500 text-xs text-gray-600'
		}
	};
	return (
		<li className="mr-3 flex-1 text-center">
			<Link
				to={to}
				onClick={handleClick}
				className={`block py-1 pl-1 align-middle no-underline
                                   ${otherClasses[type].a}`}
			>
				<i className={`fas fa-link pr-0 ${otherClasses[type].i}`} />
				<span className={`inline-block ${otherClasses[type].span}`}>{children}</span>
			</Link>
		</li>
	);
};

export default DashboardNavItem;
