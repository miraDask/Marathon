import React, { useState, useRef, useEffect, useContext } from 'react';
import { Context } from '../../providers/global-context.provider';

import IssueCard from '../../components/cards/issue-card.component';
import StatusList from '../../components/board/status-list.component';
import IssueDetailsModal from '../modals/issue-details-modal.component';
import { mockStatuses } from '../../data/mock-data';

const Board = ({ data = mockStatuses }) => {
	const [ statusesList, setStatuses ] = useState(data);
	const [ openedIssue, setOpenedIssue ] = useState(null);
	const [ dragging, setDragging ] = useState(false);
	const [ show, setShow ] = useState(false);
	const { toggleModalIsOpen } = useContext(Context);
	useEffect(
		() => {
			setStatuses(data);
		},
		[ setStatuses, data ]
	);

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
			setStatuses((oldList) => {
				let newList = JSON.parse(JSON.stringify(oldList));
				newList[targetItem.statusIndex].issues.splice(
					targetItem.issueIndex,
					0,
					newList[dragItem.current.statusIndex].issues.splice(dragItem.current.issueIndex, 1)[0]
				);
				dragItem.current = targetItem;
				localStorage.setItem('List', JSON.stringify(newList));
				return newList;
			});
		}
	};
	const handleDragEnd = (e) => {
		setDragging(false);
		dragItem.current = null;
		dragItemNode.current.removeEventListener('dragend', handleDragEnd);
		dragItemNode.current = null;
	};

	const onClose = () => {
		toggleModalIsOpen();
		setShow(false);
	};
	const onOpen = (e) => {
		const currentClicked = e.target;
		const issueId = currentClicked.id
			? currentClicked.id
			: currentClicked.parentNode.id ? currentClicked.parentNode.id : currentClicked.parentNode.parentNode.id;
		const statusList = statusesList.filter((s) => s.issues.some((i) => i.id === +issueId))[0];
		const clickedIssue = statusList.issues.filter((i) => i.id === +issueId)[0];
		setOpenedIssue(clickedIssue);
		setShow(true);
		toggleModalIsOpen();
	};

	const getInvisible = (params) => {
		const currentItem = dragItem.current;
		return currentItem.statusIndex === params.statusIndex && currentItem.issueIndex === params.issueIndex;
	};

	const renderIssues = (issues, statusIndex) => {
		return issues.map((issue, issueIndex) => (
			<div key={issue.id}>
				<IssueCard
					issue={issue}
					handleClick={onOpen}
					handleDragStart={(e) => handleDragStart(e, { statusIndex, issueIndex })}
					handleDragEnter={dragging ? (e) => handleDragEnter(e, { statusIndex, issueIndex }) : null}
					invisible={dragging ? getInvisible({ statusIndex, issueIndex }) : false}
				/>
				{!openedIssue ? null : <IssueDetailsModal item={openedIssue} onClose={onClose} show={show} />}
			</div>
		));
	};

	const renderStatuses = () => {
		return !statusesList ? (
			<StatusList title="TODO" />
		) : (
			statusesList.map((status, statusIndex) => (
				<StatusList
					key={status.id}
					title={status.title}
					onDragEnter={
						dragging && !status.issues.length ? (
							(e) => handleDragEnter(e, { statusIndex, issueIndex: 0 })
						) : null
					}
				>
					{renderIssues(status.issues, statusIndex)}
				</StatusList>
			))
		);
	};

	return (
		<div className="container px-5 py-4 mx-auto">
			<div className="flex flex-wrap m-4 md:mb-4">{renderStatuses()}</div>
		</div>
	);
};

export default Board;
