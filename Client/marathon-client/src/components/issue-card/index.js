import React, { useContext, useState, useEffect } from 'react';

import { IssuesContext } from '../../providers/issues-context.provider';
import { Context } from '../../providers/global-context.provider';

import PriorityIcon from '../priority-icon';
import IssueIcon from '../issue-icon';
import Avatar from '../avatar';
import Tag from '../tag';

const IssueCard = ({ issue, handleDragStart, handleDragEnter, invisible, handleClick }) => {
	const { isModalOpen } = useContext(Context);
	const { id, title, priority, type, storyPoints } = issue;

	const renderAssignee = () =>
		issue.assignee.fullName ? (
			<Avatar user={issue.assignee} bgColor="green" />
		) : (
			<Tag text="unassigned" color="gray-500" size="w-24 h-4" />
		);

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
