import React, { useContext } from 'react';
import { Context } from '../../providers/global-context.provider';
import { logoutUser } from '../../utils/workers/user';
import { Link, useHistory } from 'react-router-dom';

import logo from '../../assets/logo.png';
import NavLink from './nav-link.component';
import Avatar from '../../components/user/user-avatar.component';

const Navigation = () => {
	const history = useHistory();
	const { isLoggedIn, toggleLoggedIn, token } = useContext(Context);

	const handleSignOut = async (e) => {
		e.preventDefault();
		await logoutUser(token);
		toggleLoggedIn();
		history.push('/');
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
				{isLoggedIn ? (
					<div>
						<NavLink to="/user/dashboard" textColor="teal-600" hoverColor="green-400">
							Dashboard
						</NavLink>
						<NavLink to="/user/projects" textColor="teal-600" hoverColor="green-400">
							Projects
						</NavLink>
						<NavLink to="/user/teams" textColor="teal-600" hoverColor="green-400">
							Teams
						</NavLink>
					</div>
				) : null}
				<nav className="flex lg:w-2/5 flex-wrap items-center text-base lg:justify-end md:ml-auto md:mr-5">
					{isLoggedIn ? (
						<div>
							<NavLink handleSignOut={handleSignOut} to="/" hoverColor="green-400">
								SIGN OUT
							</NavLink>
							<Avatar bgColor="orange-400" />
						</div>
					) : (
						<div>
							<NavLink to="/help" hoverColor="green-400">
								HELP
							</NavLink>
							<NavLink to="/signin" hoverColor="green-400">
								SIGN IN
							</NavLink>
							<NavLink to="/signup" hoverColor="green-400">
								SIGN UP
							</NavLink>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};
export default Navigation;
