import React, { useContext, useState } from 'react';
import { Context } from '../../providers/global-context.provider';
import AccountDropdownMenu from '../../components/dropdown/account-dropdown-menu.component';
import Avatar from '../../components/user/user-avatar.component';

const initialClicked = false;

const AccountDropdown = ({ otherClasses }) => {
	const [ avatarIsClicked, setAvatarIsClicked ] = useState(initialClicked);
	const { fullName, image } = useContext(Context);
	const handleClick = () => {
		setAvatarIsClicked(!avatarIsClicked);
	};

	return (
		<div className={otherClasses}>
			<Avatar bgColor="orange-400" handleClick={handleClick} size="w-8 h-8" user={{ fullName, image }} />
			{!avatarIsClicked ? null : <AccountDropdownMenu />}
		</div>
	);
};

export default AccountDropdown;
