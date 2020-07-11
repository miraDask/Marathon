import React, { useState, useRef } from 'react';

import IssueCard from '../../components/cards/issue-card.component';
import StatusList from '../../components/board/status-list.component';

const testData = [
	{
		title: 'TO DO',
		issues: [
			{
				title: 'Test to do',
				assignee: 'me',
				type: 'story',
				priority: 'medium',
				id: 1,
				storyPoints: 0
			}
		]
	},
	{
		title: 'IN PROGRESS',
		issues: [
			{
				title: 'Test in progress',
				assignee: 'me',
				type: 'bug',
				priority: 'highest',
				id: 2,
				storyPoints: 2
			}
		]
	}
];
const Board = ({ data }) => {
	const [ statuses, setStatuses ] = useState(testData);
	const [ dragging, setDragging ] = useState(false);
	const columns = !statuses ? 3 : statuses.length + 1;
	const dragItem = useRef();
	const dragNode = useRef();

	const handleDragStart = (e, params) => {
		dragItem.current = params;
		dragNode.current = e.target;
		dragNode.current.addEventListener('dragend', handleDragEnd);
		setTimeout(() => {
			setDragging(true);
		}, 0);
	};

	const handleDragEnd = () => {
		dragNode.current.removeEventListener('dragend', handleDragEnd);
		dragItem.current = null;
		dragNode.current = null;
		setDragging(false);
	};

	const getInvisible = (params) => {
		const currentItem = dragItem.current;
		return currentItem.statusIndex === params.statusIndex && currentItem.issueIndex === params.issueIndex;
	};

	return (
		<div className="container px-5 py-24 mx-auto">
			<div className="flex flex-wrap m-4 md:mb-4">
				{!statuses ? (
					<StatusList columns={columns} title="TODO">
						<IssueCard
							key="1"
							title="test issue"
							assignee="me"
							priority="medium"
							type="story"
							storyPoints="2"
							id="2"
							handleDragStart={handleDragStart}
						/>
					</StatusList>
				) : (
					statuses.map((status, statusIndex) => (
						<StatusList key={status.id} columns={columns} title={status.title}>
							{status.issues.map((issue, issueIndex) => (
								<IssueCard
									key={issue.id}
									title={issue.title}
									assignee={issue.assignee}
									priority={issue.priority}
									type={issue.type}
									storyPoints={issue.storyPoints}
									id={issue.id}
									handleDragStart={(e) => handleDragStart(e, { issueIndex, statusIndex })}
									invisible={dragging ? getInvisible({ issueIndex, statusIndex }) : false}
								/>
							))}
						</StatusList>
					))
				)}
			</div>
		</div>
	);
};

export default Board;
