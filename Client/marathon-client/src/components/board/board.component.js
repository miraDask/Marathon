import React, { useState, useRef, useEffect } from 'react';

import IssueCard from '../../components/cards/issue-card.component';
import StatusList from '../../components/board/status-list.component';
import PopupWindow from '../../components/board/issue-popup-window.component';

import { mockStatuses } from '../../data/mock-data';

const Board = ({ data = mockStatuses }) => {
	const [ statuses, setStatuses ] = useState(data);
	const [ dragging, setDragging ] = useState(false);
	const [ show, setShow ] = useState(false);

	useEffect(
		() => {
			setStatuses(data);
		},
		[ setStatuses, data ]
	);

	const dragItem = useRef();
	const dragItemNode = useRef();

	const handleDragStart = (e, item) => {
		console.log('Starting to drag', item);

		dragItemNode.current = e.target;
		dragItemNode.current.addEventListener('dragend', handleDragEnd);
		dragItem.current = item;

		setTimeout(() => {
			setDragging(true);
		}, 0);
	};

	const handleDragEnter = (e, targetItem) => {
		console.log('Entering a drag target', targetItem);
		if (dragItemNode.current !== e.target) {
			console.log('Target is NOT the same as dragged item');
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

	const onClose = () => setShow(false);
	const onOpen = () => setShow(true);

	const getInvisible = (params) => {
		const currentItem = dragItem.current;
		return currentItem.statusIndex === params.statusIndex && currentItem.issueIndex === params.issueIndex;
	};

	const columns = statuses ? statuses.length + 1 : 3;
	return (
		<div className="container px-5 py-24 mx-auto">
			<div className="flex flex-wrap m-4 md:mb-4">
				{!statuses ? (
					<StatusList columns={columns} title="TODO" />
				) : (
					statuses.map((status, statusIndex) => (
						<StatusList
							key={status.id}
							columns={columns}
							title={status.title}
							onDragEnter={
								dragging && !status.issues.length ? (
									(e) => handleDragEnter(e, { statusIndex, issueIndex: 0 })
								) : null
							}
						>
							{status.issues ? (
								status.issues.map((issue, issueIndex) => (
									<div>
										<IssueCard
											key={issue.id}
											issue={issue}
											handleClick={onOpen}
											handleDragStart={(e) => handleDragStart(e, { statusIndex, issueIndex })}
											handleDragEnter={
												dragging ? (e) => handleDragEnter(e, { statusIndex, issueIndex }) : null
											}
											invisible={dragging ? getInvisible({ statusIndex, issueIndex }) : false}
										/>
										<PopupWindow item={issue} onClose={onClose} show={show} />
									</div>
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
