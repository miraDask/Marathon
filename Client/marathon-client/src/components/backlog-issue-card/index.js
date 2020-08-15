import React, { useContext } from 'react';

import { Context } from '../../providers/global-context.provider';
import IssueIcon from '../issue-icon';
import PriorityIcon from '../priority-icon';

const BacklogIssueCard = ({ issue, projectKey, handleClick, handleDragEnter, handleDragStart, invisible }) => {
	const { isModalOpen } = useContext(Context);
	const { id, title, storyPoints, type, priority } = issue;

	return (
		<div
			key={id}
			draggable
			onClick={handleClick}
			onDragStart={handleDragStart}
			onDragEnter={handleDragEnter}
			className={
				invisible ? (
					'invisible'
				) : (
					`mx-auto cursor-pointer
                     flex p-1 hover:bg-blue-100 bg-gray-200 my-2 justify-between`
				)
			}
		>
			<div>
				<span
					className={
						isModalOpen ? (
							'invisible'
						) : (
							'flex-shrink-0 w-5 h-5 rounded-full bg-gray-500 inline-flex items-center justify-center text-black relative z-10 cursor-pointer'
						)
					}
				>
					<span className="p-1">{storyPoints}</span>
				</span>
				<div className="ml-3 text-gray-900 inline-block">{title}</div>
				<span className="inline-flex ml-4">/ {projectKey}</span>
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
