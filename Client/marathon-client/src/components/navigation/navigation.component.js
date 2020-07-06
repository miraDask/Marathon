import React, { useContext } from 'react';
import { Context } from '../../providers/global-context.provider';
import { logoutUser } from '../../utils/user';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import NavLink from './nav-link.component';

const Navigation = () => {
	const { isLoggedIn, fullName, toggleLoggedIn, token } = useContext(Context);
	const initials = fullName.split(' ').map((x) => x.charAt(0)).join('');

	const handleSignOut = async (e) => {
		e.preventDefault();
		await logoutUser(token);
		toggleLoggedIn();
	};

	return (
		<header className="text-gray-700 body-font w-full bg-white opacity-100">
			<div className="container mx-auto flex flex-wrap px-5 py-1 border-b-2 border-gray-300 flex-col md:flex-row items-center">
				<Link
					to="/"
					className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 ml-2 md:mb-0"
				>
					<img src={logo} alt="Logo" width="180" />
				</Link>
				<nav className="flex lg:w-2/5 flex-wrap items-center text-base lg:justify-end md:ml-auto md:mr-5">
					{isLoggedIn ? (
						<div>
							<span>Hello, {initials}</span>
							<NavLink handleSignOut={handleSignOut} to="/">
								SIGN OUT
							</NavLink>
						</div>
					) : (
						<div>
							<NavLink to="/help">HELP</NavLink>
							<NavLink to="/signin">SIGN IN</NavLink>
							<NavLink to="/signup">SIGN UP</NavLink>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};
export default Navigation;
