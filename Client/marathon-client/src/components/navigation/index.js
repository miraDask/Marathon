import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import logo from '../../assets/logo.png';
import NavLink from '../nav-link';
import AccountDropdown from '../account-dropdown';

const Navigation = () => {
	const { isLoggedIn, isModalOpen } = useContext(Context);
	const { currentProject } = useContext(ProjectsContext);

	return (
		<header className="text-gray-700 body-font w-full bg-white opacity-100">
			<div className="container mx-auto flex flex-wrap px-4
			 py-1 border-b-2 border-gray-300 flex-col md:flex-row items-center">
				<Link
					to="/"
					className="flex order-first lg:order-none lg:w-1/5
					 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0"
				>
					<img src={logo} alt="Logo" width="180" />
				</Link>
				{isLoggedIn ? (
					<div>
						{currentProject ? (
							<span className="ml-5">
								<NavLink
									to={`/user/dashboard/${currentProject.id}/board`}
									textColor="teal-600"
									hoverColor="green-400"
								>
									Dashboard
								</NavLink>
							</span>
						) : null}
						<span className="ml-5">
							<NavLink to="/user/projects" textColor="teal-600" hoverColor="green-400">
								Projects
							</NavLink>
						</span>
						<span className="ml-5">
							<NavLink to="/user/invitations" textColor="teal-600" hoverColor="green-400">
								Invitations
							</NavLink>
						</span>
					</div>
				) : null}
				<nav className="flex lg:w-2/5 flex-wrap items-center text-base lg:justify-end md:ml-auto md:mr-5">
					{/* <span className="mr-5">
						<NavLink to="/help" hoverColor="green-400">
							HELP
						</NavLink>
					</span> */}
					{isLoggedIn ? (
						<AccountDropdown show={!isModalOpen} />
					) : (
						<Fragment>
							<span className="mr-5">
								<NavLink to="/signin" hoverColor="green-400">
									SIGN IN
								</NavLink>
							</span>
							<span className="mr-5">
								<NavLink to="/signup" hoverColor="green-400">
									SIGN UP
								</NavLink>
							</span>
						</Fragment>
					)}
				</nav>
			</div>
		</header>
	);
};
export default Navigation;
