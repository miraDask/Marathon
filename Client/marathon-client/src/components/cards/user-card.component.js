import React from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/icon-x.svg';

const UserCard = ({ showDelete, children, value, fetchDelete, valueOffset, id, ...otherProps }) => {
	const handleDeleteClick = () => {
		fetchDelete(id);
	};
	return (
		<div className="p-2 pl-0 w-full" {...otherProps}>
			<div className="bg-gray-100 rounded flex p-4 h-full items-center relative">
				{children}
				<span className={`title-font font-medium ${valueOffset}`}>{value}</span>
				<span className={showDelete ? 'inline-block absolute top-0 right-0' : 'invisible'}>
					<DeleteIcon className="m-2 cursor-pointer" onClick={handleDeleteClick} />
				</span>
			</div>
		</div>
	);
};

export default UserCard;
