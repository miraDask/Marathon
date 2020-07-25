import React, { useState, useRef, useEffect, useContext, Fragment } from 'react';
import { Context } from '../../providers/global-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';
import { getNewIssuesCollections } from '../../utils/issues';

import IssueCard from '../../components/cards/issue-card.component';
import StatusList from '../../components/board/status-list.component';
import IssueDetailsModal from '../modals/issue-details-modal.component';
import { mockStatuses } from '../../data/mock-data';

const Board = () => {
	//const [ statusesList, setStatuses ] = useState(data);
	const [ openedIssue, setOpenedIssue ] = useState(null);
	const [ dragging, setDragging ] = useState(false);
	const { toggleModalIsOpen } = useContext(Context);
	const { toggleUpdating, boardIssuesCollections, updateBoardIssues } = useContext(IssuesContext);

	// useEffect(
	// 	() => {
	// 		setStatuses(data);
	// 	},
	// 	[ setStatuses, data ]
	// );

	const dragItem = useRef();
	const dragItemNode = useRef();

	const handleDragStart = (e, item) => {
		dragItemNode.current = e.target;
		dragItemNode.current.addEventListener('dragend', handleDragEnd);
		dragItem.current = item;

		setTimeout(() => {
			setDragging(true);
		}, 0);
	};

	const handleDragEnter = (e, targetItem) => {
		if (dragItemNode.current !== e.target) {
			const newBacklogCollection = getNewIssuesCollections(boardIssuesCollections, dragItem, targetItem);
			updateBoardIssues(newBacklogCollection);
			dragItem.current = targetItem;
		}
	};
	const handleDragEnd = () => {
		setDragging(false);
		dragItem.current = null;
		dragItemNode.current.removeEventListener('dragend', handleDragEnd);
		dragItemNode.current = null;
	};

	const onOpen = (issue) => {
		setOpenedIssue(issue);
		toggleUpdating();
		toggleModalIsOpen();
	};

	const getInvisible = (params) => {
		const currentItem = dragItem.current;
		return currentItem.parentIndex === params.parentIndex && currentItem.index === params.index;
	};

	const renderIssues = (issues, parentIndex) => {
		return issues.map(
			(issue, index) =>
				issue ? (
					<Fragment key={issue.id}>
						<IssueCard
							issue={issue}
							handleClick={() => onOpen(issue)}
							handleDragStart={(e) => handleDragStart(e, { parentIndex, index })}
							handleDragEnter={dragging ? (e) => handleDragEnter(e, { parentIndex, index }) : null}
							invisible={dragging ? getInvisible({ parentIndex, index }) : false}
						/>
					</Fragment>
				) : null
		);
	};

	const renderStatuses = () => {
		return boardIssuesCollections.map((status, parentIndex) => (
			<StatusList
				key={status.title}
				title={status.title}
				onDragEnter={
					dragging && !status.issues.length ? (e) => handleDragEnter(e, { parentIndex, index: 0 }) : null
				}
			>
				{renderIssues(status.issues, parentIndex)}
			</StatusList>
		));
	};

	return (
		<div className="container px-5 py-4 mx-auto">
			<div className="flex flex-wrap m-4 md:mb-4">{renderStatuses()}</div>
			{!openedIssue ? null : <IssueDetailsModal item={openedIssue} />}
		</div>
	);
};

export default Board;
