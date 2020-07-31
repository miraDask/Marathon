import React from 'react';

const UserCard = ({ children, value }) => {
	return (
		<div class="p-2 pl-0 w-full">
			<div class="bg-gray-100 rounded flex p-4 h-full items-center">
				{children}
				<span class="title-font font-medium">{value}</span>
			</div>
		</div>
	);
};

export default UserCard;
