import React, { useContext, useState } from 'react';
import { AccountDropdownContainer } from './index.styles';

import { Context } from '../../providers/global-context.provider';

import AccountDropdownMenu from '../account-dropdown-menu';
import Avatar from '../avatar';

const initialClicked = false;

const AccountDropdown = ({ show }) => {
	const [ avatarIsClicked, setAvatarIsClicked ] = useState(initialClicked);
	const { user } = useContext(Context);
	const handleClick = () => {
		setAvatarIsClicked(!avatarIsClicked);
	};

	return (
		<AccountDropdownContainer visible={show}>
			<Avatar bgColor="orange" handleClick={handleClick} user={user} />
			{!avatarIsClicked ? null : <AccountDropdownMenu />}
		</AccountDropdownContainer>
	);
};

export default AccountDropdown;
