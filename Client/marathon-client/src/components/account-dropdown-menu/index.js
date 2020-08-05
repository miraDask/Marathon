import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { getCookie } from '../../utils/cookie';
import { logoutUser } from '../../services/users.service';

import { Context } from '../../providers/global-context.provider';
import DropdownLink from '../dropdown-link';

const AccountDropdownMenu = () => {
	const { toggleLoggedIn, user } = useContext(Context);
	const history = useHistory();

	const handleSignOut = async (e) => {
		e.preventDefault();
		const token = getCookie('x-auth-token');
		await logoutUser(token);
		toggleLoggedIn(false);
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
						Signed in as <span className="text-gray-900 text-lg">{user.userName}</span>
					</p>
				</div>
				<div className="py-1">
					<DropdownLink to="/user/profile">PROFILE</DropdownLink>
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
