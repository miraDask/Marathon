import React from 'react';

import PriorityIcon from '../../components/icons/priority-icon.component';
import IssueIcon from '../../components/icons/issue-icon.component';

const IssueCard = ({ issue, handleDragStart, handleDragEnter, invisible, handleClick }) => {
	const { id, title, assignee, priority, type, storyPoints } = issue;
	return (
		<div
			id={id}
			draggable
			onClick={handleClick}
			onDragStart={handleDragStart}
			onDragEnter={handleDragEnter}
			className={`${invisible
				? 'invisible'
				: ''} mx-auto cursor-pointer flex p-3 hover:bg-blue-200 bg-white rounded-lg shadow-xl mb-2 justify-between`}
		>
			<div>
				<div className="text-gray-900">{title}</div>
				<div className="mr-2 mt-1">{assignee}</div>
			</div>
			<div>
				<IssueIcon type={type} size="h-5 w-5" />
				<PriorityIcon priority={priority} size="h-5 w-5" />
				<span className="rounded-full h-5 w-5 flex items-center justify-center bg-gray-300 text-black">
					{storyPoints}
				</span>
			</div>
		</div>
	);
};

export default IssueCard;
