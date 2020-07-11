import React from 'react';

import PriorityIcon from '../../components/icons/priority-icon.component';
import IssueIcon from '../../components/icons/issue-icon.component';

const IssueCard = ({
	id,
	title,
	assignee,
	priority = 'high',
	type = 'task',
	storyPoints = 2,
	handleDragStart,
	invisible
}) => {
	return (
		<div
			id={id}
			draggable
			onDragStart={handleDragStart}
			className={`${invisible
				? 'invisible'
				: ''} mx-auto flex p-5 hover:bg-blue-300 bg-white rounded-lg shadow-xl mb-3 justify-between`}
		>
			<div>
				<div className="text-gray-900">{title}</div>
				<div className="mr-2">{assignee}</div>
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
