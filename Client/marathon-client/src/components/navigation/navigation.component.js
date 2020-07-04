import React, { useContext } from 'react';
import { Context } from '../../providers/global-context.provider';
import { logoutUser } from '../../utils/user';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import NavLink from './nav-link.component';

const Navigation = () => {
	const { isLoggedIn, username, toggleLoggedIn, token } = useContext(Context);

	const handleSignOut = async (e) => {
		await logoutUser(token);
		toggleLoggedIn();
	};

	return (
		<header className="text-gray-700 body-font">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<Link
					to="/"
					className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 ml-2 md:mb-0"
				>
					<img src={logo} alt="Logo" />
				</Link>
				<nav className="flex lg:w-2/5 flex-wrap items-center text-base lg:justify-end md:ml-auto md:mr-5">
					{isLoggedIn ? (
						<div>
							<span>Hello, {username}</span>
							<NavLink onClick={handleSignOut}>SIGN OUT</NavLink>
						</div>
					) : (
						<div>
							<NavLink to="/">ABOUT</NavLink>
							<NavLink to="/signin">SIGN IN</NavLink>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};
export default Navigation;
