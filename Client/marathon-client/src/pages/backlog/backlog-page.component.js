import React, { useState, useEffect, useContext, useRef, Fragment } from 'react';

import { ProjectsContext } from '../../providers/projects-context.provider';
import { Context } from '../../providers/global-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';

import { processBoardIssuesCollections, getNewIssuesCollections } from '../../utils/issues';
import { getProjectDetails } from '../../services/projects.service';

import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';
import Spinner from '../../components/spinner/spinner.component';
import MainWrapper from '../../components/main/maim-wrapper.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';
import BacklogDndContainer from '../../components/backlog/backlog-dnd-container.component';
import NoPlanedSprint from '../../components/sprints/no-planed-sprint.component';
import BacklogIssueCard from '../../components/cards/backlog-issue-card.component';

const BacklogPage = ({ match }) => {
	const { token } = useContext(Context);
	const { saveCurrentProject, currentProject } = useContext(ProjectsContext);
	const { updateBacklogIssues, backlogIssuesCollections } = useContext(IssuesContext);
	const [ isLoading, setLoading ] = useState(true);
	const [ dragging, setDragging ] = useState(false);
	const [ show, setShow ] = useState(false);
	const dragItem = useRef();
	const dragItemNode = useRef();

	useEffect(() => {
		const getCurrentProjectDetails = async () => {
			const projectId = match.params.projectId;
			const response = await getProjectDetails(projectId, token);
			if (response) {
				console.log(response);
				const issuesCollections = processBoardIssuesCollections(response);
				updateBacklogIssues(issuesCollections);
				saveCurrentProject({ id: response.id, name: response.name });
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

	const handleDragEnd = (e) => {
		setDragging(false);
		dragItem.current = null;
		dragItemNode.current.removeEventListener('dragend', handleDragEnd);
		dragItemNode.current = null;
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

	const renderIssues = (issues, parentIndex) =>
		issues.map((issue, issueIndex) => {
			return (
				<BacklogIssueCard
					key={issue.id}
					issue={issue}
					handleDragStart={(e) => handleDragStart(e, { parentIndex, issueIndex })}
					handleDragEnter={dragging ? (e) => handleDragEnter(e, { parentIndex, issueIndex }) : null}
					invisible={dragging ? getInvisible({ parentIndex, issueIndex }) : false}
				/>
			);
		});

	const renderSprints = () =>
		backlogIssuesCollections.map((sprint, parentIndex) => {
			const issues = sprint.issues;
			return (
				<BacklogDndContainer
					sprint={parentIndex === backlogIssuesCollections.length - 1 ? null : sprint}
					top="mt-12"
					issuesCount={issues.length > 0 ? issues.length : 0}
					estimate={issues.length > 0 ? getEstimate(parentIndex) : 0}
					primary={parentIndex === backlogIssuesCollections.length - 1 ? true : issues.length > 0}
					onDragEnter={
						dragging && !sprint.issues.length ? (
							(e) => handleDragEnter(e, { parentIndex, issueIndex: 0 })
						) : null
					}
				>
					{sprint.issues.length > 0 ? (
						renderIssues(sprint.issues, parentIndex)
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
				{!isLoading ? <div className="overflow-y-auto h-screen">{renderSprints()}</div> : <Spinner />}
			</MainWrapper>
		</Fragment>
	);
};

export default BacklogPage;
