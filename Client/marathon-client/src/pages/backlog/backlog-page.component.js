import React, { useState, useEffect, useContext, useRef, Fragment } from 'react';

import { ProjectsContext } from '../../providers/projects-context.provider';
import { Context } from '../../providers/global-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';

import { processBoardIssuesCollections, getNewIssuesCollections } from '../../utils/issues';
import { getProjectDetails } from '../../services/projects.service';
import { updateIssue } from '../../services/issues.service';

import CreateIssueModal from '../../components/modals/create-issue-modal.component';
import IssueDetailsModal from '../../components/modals/issue-details-modal.component';
import EditSprintModal from '../../components/modals/edit-sprint-modal.component';
import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';
import Spinner from '../../components/spinner/spinner.component';
import MainWrapper from '../../components/main/maim-wrapper.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';
import BacklogDndContainer from '../../components/backlog/backlog-dnd-container.component';
import NoPlanedSprint from '../../components/sprints/no-planed-sprint.component';
import BacklogIssueCard from '../../components/cards/backlog-issue-card.component';

const BacklogPage = ({ match }) => {
	const { token, toggleModalIsOpen } = useContext(Context);
	const { saveCurrentProject, currentProject } = useContext(ProjectsContext);
	const { updateBacklogIssues, backlogIssuesCollections, toggleUpdating, creating } = useContext(IssuesContext);
	const { saveCurrentSprint, currentSprint, updatingSprint } = useContext(SprintsContext);
	const [ openedIssue, setOpenedIssue ] = useState(null);
	const [ isLoading, setLoading ] = useState(true);
	const [ dragging, setDragging ] = useState(false);
	const dragItem = useRef();
	const dragItemNode = useRef();
	const movingItem = useRef();

	useEffect(() => {
		const getCurrentProjectDetails = async () => {
			const projectId = match.params.projectId;
			const response = await getProjectDetails(projectId, token);
			if (response) {
				console.log(typeof response.sprints[0].startDate);
				const issuesCollections = processBoardIssuesCollections(response);
				updateBacklogIssues(issuesCollections);
				saveCurrentProject({ id: response.id, name: response.name, creator: response.creator });
			}
		};
		getCurrentProjectDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(
		() => {
			if (currentProject) {
				setLoading(false);
			}
		},
		[ currentProject ]
	);

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
			const newBacklogCollection = getNewIssuesCollections(backlogIssuesCollections, dragItem, targetItem);
			updateBacklogIssues(newBacklogCollection);
			dragItem.current = targetItem;
		}
	};

	const handleDragEnd = () => {
		setDragging(false);
		const data = {
			...movingItem.current,
			backlogIndex: dragItem.current.issueIndex,
			sprintId: dragItem.current.sprintId ? dragItem.current.sprintId : null
		};

		updateIssue(data, token, currentProject.id);
		dragItem.current = null;
		dragItemNode.current.removeEventListener('dragend', handleDragEnd);
		dragItemNode.current = null;
	};

	const onOpen = (issue, parentIndex) => {
		saveCurrentSprint({ index: parentIndex });
		setOpenedIssue(issue);
		toggleUpdating();
		toggleModalIsOpen();
	};

	const getEstimate = (index) => {
		const issues = backlogIssuesCollections[index].issues;
		const estimate = issues.reduce((acc, curr) => {
			return curr.storyPoints + acc;
		}, 0);

		return estimate;
	};

	const getInvisible = (params) => {
		const currentItem = dragItem.current;
		return currentItem.parentIndex === params.parentIndex && currentItem.issueIndex === params.issueIndex;
	};

	const renderIssues = (issues, parentIndex, sprintId) =>
		issues.map((issue, issueIndex) => {
			return (
				<Fragment key={issue.id}>
					<BacklogIssueCard
						issue={issue}
						handleClick={() => onOpen(issue, parentIndex)}
						handleDragStart={(e) => handleDragStart(e, { parentIndex, issueIndex, issue })}
						handleDragEnter={
							dragging ? (
								(e) => handleDragEnter(e, { parentIndex, issueIndex, issueId: issue.id, sprintId })
							) : null
						}
						invisible={dragging ? getInvisible({ parentIndex, issueIndex }) : false}
					/>
				</Fragment>
			);
		});

	const renderSprints = () =>
		backlogIssuesCollections.map((sprint, parentIndex) => {
			const issues = sprint.issues;
			return (
				<BacklogDndContainer
					key={sprint.id ? sprint.id : currentProject.id}
					sprint={parentIndex === backlogIssuesCollections.length - 1 ? null : sprint}
					top="mt-12"
					sprintIndex={parentIndex}
					issuesCount={issues.length > 0 ? issues.length : 0}
					estimate={issues.length > 0 ? getEstimate(parentIndex) : 0}
					onDragEnter={
						dragging && !sprint.issues.length ? (
							(e) => handleDragEnter(e, { parentIndex, issueIndex: 0, sprintId: sprint.id })
						) : null
					}
				>
					{sprint.issues.length > 0 ? (
						renderIssues(sprint.issues, parentIndex, sprint.id)
					) : parentIndex === 0 ? (
						<NoPlanedSprint />
					) : parentIndex === backlogIssuesCollections.length - 1 ? (
						'Your backlog is empty'
					) : (
						'Plan a sprint by dragging the sprint footer down below some issues, or by dragging issues here.'
					)}
				</BacklogDndContainer>
			);
		});

	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper>
				<PageTopicContainer size="lg:w-5/6" title={`Backlog / ${!currentProject ? '' : currentProject.name}`} />
				{!isLoading ? (
					<div className="overflow-y-auto h-screen">
						{renderSprints()}
						{!openedIssue ? null : <IssueDetailsModal item={openedIssue} />}
						{creating ? <CreateIssueModal sprintId={!currentSprint ? null : currentSprint.id} /> : null}
						{updatingSprint ? <EditSprintModal /> : null}
					</div>
				) : (
					<Spinner />
				)}
			</MainWrapper>
		</Fragment>
	);
};

export default BacklogPage;
