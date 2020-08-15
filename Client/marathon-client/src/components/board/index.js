import React, { useState, useRef, useContext, Fragment } from 'react';
import useHubConnection from '../../hooks/useHubConnection';
import { getCookie } from '../../utils/cookie';

import { Context } from '../../providers/global-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import { getNewIssuesCollections } from '../../utils/issues';
import { changeIssueStatus } from '../../services/issues.service';

import IssueCard from '../issue-card';
import StatusList from '../status-list';
import IssueDetailsModal from '../issue-details-modal';

const Board = () => {
	const { openedIssue } = useContext(IssuesContext);
	const [ dragging, setDragging ] = useState(false);
	const { toggleModalIsOpen } = useContext(Context);
	const { currentProject } = useContext(ProjectsContext);
	const { toggleUpdating, boardIssuesCollections, updateBoardIssues, saveOpenedIssue } = useContext(IssuesContext);
	const { setUpdate } = useHubConnection([ { funcName: 'BoardUpdate' } ]);

	const dragItem = useRef();
	const dragItemNode = useRef();
	const movingItem = useRef();

	const handleDragStart = (e, item) => {
		dragItemNode.current = e.target;
		dragItemNode.current.addEventListener('dragend', handleDragEnd);
		dragItem.current = item;
		movingItem.current = item.issue;
		setTimeout(() => {
			setDragging(true);
		}, 0);
	};

	const handleDragEnter = (e, targetItem) => {
		if (dragItemNode.current !== e.target) {
			const newBoardCollection = getNewIssuesCollections(boardIssuesCollections, dragItem, targetItem);
			updateBoardIssues(newBoardCollection);
			dragItem.current = targetItem;
		}
	};
	const handleDragEnd = async () => {
		setDragging(false);
		const data = {
			status: dragItem.current.parentIndex,
			statusIndex: dragItem.current.index
		};

		const token = getCookie('x-auth-token');
		const assignee = await changeIssueStatus(data, token, currentProject.id, movingItem.current.id);
		setUpdate((update) => [ ...update, assignee ]);

		dragItem.current = null;
		dragItemNode.current.removeEventListener('dragend', handleDragEnd);
		dragItemNode.current = null;
	};

	const onOpen = (issue) => {
		saveOpenedIssue(issue);
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
							handleDragStart={(e) => handleDragStart(e, { parentIndex, index, issue })}
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
			{!openedIssue ? null : <IssueDetailsModal />}
		</div>
	);
};

export default Board;
