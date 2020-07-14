import React, { useContext } from 'react';
import DropdownLink from './dropdown-link.component';
import { useHistory } from 'react-router-dom';

import { logoutUser } from '../../services/users.service';

import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

const AccountDropdownMenu = () => {
	const history = useHistory();
	const { toggleLoggedIn, token, email } = useContext(Context);
	const { removeHasProjects, deleteProjects } = useContext(ProjectsContext);

	const handleSignOut = async (e) => {
		e.preventDefault();
		await logoutUser(token);
		toggleLoggedIn();
		removeHasProjects();
		deleteProjects();
		history.push('/');
	};

	return (
		<div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
			<div
				className="rounded-md bg-white shadow-xs"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="options-menu"
			>
				<div className="py-1">
					<p className="px-4 py-2">
						Signed in as <span className="text-gray-900 text-lg">{email}</span>
					</p>
				</div>
				<div className="py-1">
					<DropdownLink>Account settings</DropdownLink>
				</div>
				<div className="border-t border-gray-100" />
				<div className="py-1">
					<DropdownLink handleOnClick={handleSignOut}>SIGN OUT</DropdownLink>
				</div>
				<div className="border-t border-gray-100" />
			</div>
		</div>
	);
};

export default AccountDropdownMenu;
