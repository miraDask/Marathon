import React from 'react';
import IssueIcon from '../../components/icons/issue-icon.component';
import PriorityIcon from '../../components/icons/priority-icon.component';

const BacklogIssueCard = ({ issue }) => {
	const { title, storyPoints, type, priority } = issue;

	return (
		<div
			className={`mx-auto cursor-pointer
                     flex p-1 hover:bg-blue-100 bg-gray-200 mb-2 justify-between`}
		>
			<div>
				<span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-500 
        inline-flex items-center justify-center text-black relative z-10 cursor-pointer">
					<span className="p-1">{storyPoints}</span>
				</span>
				<div className="ml-3 text-gray-900 inline-block">{title}</div>
			</div>
			<div>
				<span className="inline-flex ml-2">
					<IssueIcon type={type} size="h-5 w-5" />
				</span>
				<span className="inline-flex ml-2">
					<PriorityIcon priority={priority} size="h-5 w-5" />
				</span>
			</div>
		</div>
	);
};

export default BacklogIssueCard;