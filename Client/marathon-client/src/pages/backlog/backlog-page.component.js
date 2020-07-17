import React, { useState, useEffect, useContext, Fragment } from 'react';

import { ProjectsContext } from '../../providers/projects-context.provider';
import { Context } from '../../providers/global-context.provider';

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
	const [ isLoading, setLoading ] = useState(true);

	useEffect(() => {
		const getCurrentProjectDetails = async () => {
			const projectId = match.params.projectId;
			const response = await getProjectDetails(projectId, token);
			if (response) {
				console.log(response);
				saveCurrentProject(response);
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

	const getEstimate = (id = null) => {
		const issues = currentProject.issues.filter((x) => x.sprintId === id);
		const estimate = issues.reduce((acc, curr) => {
			return curr.storyPoints + acc;
		}, 0);

		return estimate;
	};

	const renderIssues = (issues) =>
		issues.map((issue, issueIndex) => {
			return <BacklogIssueCard key={issue.id} issue={issue} />;
		});

	const renderSprints = (sprints) =>
		sprints.map((sprint, sprintIndex) => {
			const issues = sprint.issues;
			return (
				<BacklogDndContainer
					sprint={sprint}
					top="mt-12"
					issuesCount={issues.length > 0 ? issues.length : 0}
					estimate={issues.length > 0 ? getEstimate() : 0}
					primary={issues.length > 0}
				>
					{sprint.issues.length > 0 ? (
						renderIssues(sprint.issues)
					) : sprintIndex === 0 ? (
						<NoPlanedSprint />
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
						{renderSprints(currentProject.sprints)}

						<BacklogDndContainer
							top="mt-10"
							issuesCount={currentProject.issues.length}
							estimate={currentProject.issues.length > 0 ? getEstimate() : 0}
							primary
						>
							{currentProject.issues.length > 0 ? (
								renderIssues(currentProject.issues.filter((x) => x.sprintId === null))
							) : (
								'Your backlog is empty'
							)}
						</BacklogDndContainer>
					</div>
				) : (
					<Spinner />
				)}
			</MainWrapper>
		</Fragment>
	);
};

export default BacklogPage;
