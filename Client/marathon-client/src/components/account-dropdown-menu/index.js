import React, { useContext } from 'react';

import { DropdownContainer, NavLinkContainer, UserInfoContainer, UseInfo, Border } from './index.styles';
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
		<DropdownContainer className="origin-top-right">
			<UserInfoContainer>
				Signed in as <UseInfo>{user.userName}</UseInfo>
			</UserInfoContainer>

			<NavLinkContainer>
				<DropdownLink to="/user/profile">PROFILE</DropdownLink>
			</NavLinkContainer>
			<Border />
			<NavLinkContainer>
				<DropdownLink handleOnClick={handleSignOut}>SIGN OUT</DropdownLink>
			</NavLinkContainer>
			<Border />
		</DropdownContainer>
	);
};

export default AccountDropdownMenu;
