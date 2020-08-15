import React, { useState, useEffect, useContext, useRef, Fragment } from 'react';
import useHubConnection from '../../hooks/useHubConnection';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import { getCookie } from '../../utils/cookie';

import { ProjectsContext } from '../../providers/projects-context.provider';
import { Context } from '../../providers/global-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';

import { initialStatuses } from '../../data/constants';
import { processBacklogIssuesCollections, getNewIssuesCollections } from '../../utils/issues';
import { getProjectDetails } from '../../services/projects.service';
import { updateIssue } from '../../services/issues.service';

import CreateIssueModal from '../../components/create-issue-modal';
import IssueEditModal from '../../components/issue-edit-modal';
import EditSprintModal from '../../components/edit-sprint-modal';
import StartSprintModal from '../../components/start-sprint-modal';

import Alert from '../../components/alert';
import DashboardNavBar from '../../components/dashboard-navbar';
import Spinner from '../../components/spinner';
import MainWrapper from '../../components/main-wrapper';
import PageTopicContainer from '../../components/page-topic-container';
import BacklogDndContainer from '../../components/backlog-dnd-container';
import NoPlanedSprint from '../../components/no-planed-sprint';
import BacklogIssueCard from '../../components/backlog-issue-card';

const BacklogPage = () => {
	const [ isLoading, setLoading ] = useState(true);
	const [ dragging, setDragging ] = useState(false);
	const { toggleModalIsOpen } = useContext(Context);
	const { saveCurrentProject, currentProject } = useContext(ProjectsContext);
	const {
		backlogIssuesCollections,
		creating,
		openedIssue,
		toggleUpdating,
		saveOpenedIssue,
		updateBacklogIssues,
		updateBoardIssues
	} = useContext(IssuesContext);
	const { currentSprint, updatingSprint, startingSprint, saveCurrentSprint } = useContext(SprintsContext);
	const { update } = useHubConnection([
		{ funcName: 'BacklogUpdate' },
		{
			funcName: 'DeletedProjectUpdate',
			successFunc: () => history.push(`/user/projects`)
		}
	]);
	const history = useHistory();
	const { projectId } = useParams();
	const { state } = useLocation();

	const dragItem = useRef();
	const dragItemNode = useRef();
	const movingItem = useRef();
	const showAlert = state ? state.showAlert : false;

	useEffect(
		() => {
			const getCurrentProjectDetails = async () => {
				const token = getCookie('x-auth-token');
				const response = await getProjectDetails(projectId, token);
				const { error } = response;
				if (error) {
					history.push('/404');
					return;
				}

				if (response) {
					const issuesCollections = processBacklogIssuesCollections(response);
					updateBacklogIssues(issuesCollections);
					updateBoardIssues(initialStatuses);
					const activeSprint = response.sprints.filter((x) => x.active)[0];
					saveCurrentProject({
						id: response.id,
						name: response.name,
						key: response.key,
						isCreator: response.isCreator,
						activeSprintId: activeSprint ? activeSprint.id : null
					});
				}
			};
			getCurrentProjectDetails();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ update ]
	);

	useEffect(
		() => {
			if (currentProject && currentProject.id === +projectId) {
				setLoading(false);
			}
		},
		[ currentProject, projectId ]
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

	const handleDragEnd = async () => {
		const token = getCookie('x-auth-token');

		setDragging(false);
		const data = {
			...movingItem.current,
			assigneeId: movingItem.current.assignee.id,
			backlogIndex: dragItem.current.index,
			sprintId: dragItem.current.sprintId ? dragItem.current.sprintId : null
		};

		await updateIssue(data, token, currentProject.id);
		dragItem.current = null;
		dragItemNode.current.removeEventListener('dragend', handleDragEnd);
		dragItemNode.current = null;
	};

	const onOpen = (issue, parentIndex) => {
		saveCurrentSprint({ index: parentIndex });
		saveOpenedIssue(issue);
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
		return currentItem.parentIndex === params.parentIndex && currentItem.index === params.index;
	};

	const renderIssues = (issues, parentIndex, sprintId) =>
		issues.map((issue, index) => {
			return (
				<Fragment key={issue.id}>
					<BacklogIssueCard
						issue={issue}
						projectKey={currentProject.key}
						handleClick={() => onOpen(issue, parentIndex)}
						handleDragStart={(e) => handleDragStart(e, { parentIndex, index, issue })}
						handleDragEnter={
							dragging ? (
								(e) => handleDragEnter(e, { parentIndex, index, issueId: issue.id, sprintId })
							) : null
						}
						invisible={dragging ? getInvisible({ parentIndex, index }) : false}
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
					sprintIndex={parentIndex}
					issuesCount={issues.length > 0 ? issues.length : 0}
					estimate={issues.length > 0 ? getEstimate(parentIndex) : 0}
					onDragEnter={
						dragging && !sprint.issues.length ? (
							(e) => handleDragEnter(e, { parentIndex, index: 0, sprintId: sprint.id })
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

	if (isLoading) {
		return <Spinner color="green-400" />;
	}

	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper>
				<div className="px-16 pt-6 justify-evenly">
					<Alert
						show={showAlert}
						onClose={() => {
							history.push(`/user/dashboard/${currentProject.id}/backlog`, { showAlert: false });
						}}
					/>
				</div>
				<PageTopicContainer size="lg:w-5/6" title={`Backlog / ${!currentProject ? '' : currentProject.name}`} />
				<div className="overflow-y-auto h-screen">
					{renderSprints()}
					{startingSprint ? <StartSprintModal /> : null}
					{!openedIssue ? null : <IssueEditModal item={openedIssue} />}
					{creating ? <CreateIssueModal sprintId={!currentSprint ? null : currentSprint.id} /> : null}
					{updatingSprint ? <EditSprintModal /> : null}
				</div>
			</MainWrapper>
		</Fragment>
	);
};

export default BacklogPage;
