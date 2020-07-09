import React, { useState } from 'react';
import AccountDropdownMenu from '../../components/dropdown/account-dropdown-menu.component';
import Avatar from '../../components/user/user-avatar.component';

const initialClicked = false;
const AccountDropdown = () => {
	const [ avatarIsClicked, setAvatarIsClicked ] = useState(initialClicked);
	const handleClick = () => {
		setAvatarIsClicked(!avatarIsClicked);
	};

	return (
		<div>
			<Avatar bgColor="orange-400" handleClick={handleClick} />
			{!avatarIsClicked ? null : <AccountDropdownMenu />}
		</div>
	);
};

export default AccountDropdown;
