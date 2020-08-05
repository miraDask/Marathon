import React, { useContext, useState, useEffect } from 'react';

import { IssuesContext } from '../../providers/issues-context.provider';
import { Context } from '../../providers/global-context.provider';

import PriorityIcon from '../priority-icon';
import IssueIcon from '../issue-icon';
import Avatar from '../avatar';

const IssueCard = ({ issue, handleDragStart, handleDragEnter, invisible, handleClick }) => {
	const { newAssignee, saveNewAssignee } = useContext(IssuesContext);
	const { isModalOpen } = useContext(Context);
	const [ assignee, setAssignee ] = useState(issue.assignee);
	const { id, title, priority, type, storyPoints } = issue;

	useEffect(
		() => {
			if (newAssignee) {
				const assignedUser = newAssignee.issueId === id ? newAssignee : issue.assignee;
				setAssignee(assignedUser);
			}
			return () => {
				saveNewAssignee(null);
			};
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ newAssignee ]
	);

	const renderAssignee = () => (assignee.fullName ? <Avatar user={assignee} bgColor="green" /> : 'unassigned');

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
				<div className="text-gray-900 text-left">{title}</div>
				<div className="mt-2 text-left">{!isModalOpen ? renderAssignee() : null}</div>
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