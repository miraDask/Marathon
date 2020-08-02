import React from 'react';

const UserCard = ({ children, value, ...otherProps }) => {
	return (
		<div className="p-2 pl-0 w-full" {...otherProps}>
			<div className="bg-gray-100 rounded flex p-4 h-full items-center">
				{children}
				<span className="title-font font-medium">{value}</span>
			</div>
		</div>
	);
};

export default UserCard;
