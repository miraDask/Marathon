import React, { useState, useRef } from 'react';

import IssueCard from '../../components/cards/issue-card.component';
import StatusList from '../../components/board/status-list.component';

const testData = [
	{
		id: 1,
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
		id: 2,
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
	},
	{
		id: 3,
		title: 'DONE',
		issues: [
			{
				title: 'Test  DONE',
				assignee: 'me',
				type: 'story',
				priority: 'high',
				id: 4,
				storyPoints: 2
			}
		]
	}
];
const Board = ({ data = testData }) => {
	const [ statuses, setStatuses ] = useState(data);
	const [ dragging, setDragging ] = useState(false);
	const columns = !statuses ? 3 : statuses.length + 1;
	const dragItem = useRef();
	const dragNode = useRef();

	const handleDragStart = (e, params) => {
		setTimeout(() => {
			setDragging(true);
		}, 0);
		dragItem.current = params;
		dragNode.current = e.target;
		dragNode.current.addEventListener('dragend', handleDragEnd);
	};

	const handleDragEnd = () => {
		dragNode.current.removeEventListener('dragend', handleDragEnd);
		dragItem.current = null;
		dragNode.current = null;
		setDragging(false);
	};

	const handleDragEnter = (e, params) => {
		const currentItem = dragItem.current;
		const { statusIndex, issueIndex } = params;

		if (e.target !== currentItem) {
			setStatuses((statusLists) => {
				const newStatusLists = JSON.parse(JSON.stringify(statusLists));
				const dragItemOldIndex = newStatusLists[currentItem.statusIndex].issues.splice(
					currentItem.issueIndex,
					1
				)[0];
				newStatusLists[statusIndex].issues.splice(issueIndex, 0, dragItemOldIndex);
				dragItem.current = params;
				return newStatusLists;
			});
		}
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
						<StatusList
							key={status.id}
							columns={columns}
							title={status.title}
							onDragEnter={
								dragging && !status.items ? (
									(e) => handleDragEnter(e, { statusIndex, issueIndex: 0 })
								) : null
							}
						>
							{status.issues ? (
								status.issues.map((issue, issueIndex) => (
									<IssueCard
										key={issue.id}
										title={issue.title}
										assignee={issue.assignee}
										priority={issue.priority}
										type={issue.type}
										storyPoints={issue.storyPoints}
										id={issue.id}
										handleDragStart={(e) => handleDragStart(e, { statusIndex, issueIndex })}
										handleDragEnter={
											dragging ? (e) => handleDragEnter(e, { statusIndex, issueIndex }) : null
										}
										invisible={dragging ? getInvisible({ statusIndex, issueIndex }) : false}
									/>
								))
							) : null}
						</StatusList>
					))
				)}
			</div>
		</div>
	);
};

export default Board;
