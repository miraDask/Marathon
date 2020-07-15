import React, { useState, useEffect, useContext, Fragment } from 'react';

import { ProjectsContext } from '../../providers/projects-context.provider';
import { Context } from '../../providers/global-context.provider';

import { getProjectDetails } from '../../services/projects.service';

import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';

import MainWrapper from '../../components/main/maim-wrapper.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';
import BacklogDndContainer from '../../components/backlog/backlog-dnd-container.component';
import NoPlanedSprint from '../../components/sprints/no-planed-sprint.component';
import BacklogIssueCard from '../../components/cards/backlog-issue-card.component';

const BacklogPage = ({ match }) => {
	const [ issues, setIssues ] = useState([]);
	const [ sprints, setSprint ] = useState([]);
	const { token } = useContext(Context);
	const { saveCurrentProject, currentProject } = useContext(ProjectsContext);

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

	const getEstimate = () => {
		const estimate = issues.reduce((acc, curr) => {
			return curr.storyPoints + acc;
		}, 0);

		return estimate;
	};

	const renderIssues = (issues) => {};

	const renderSprints = () =>
		sprints.map((sprint, sprintIndex) => {
			return (
				<BacklogDndContainer
					index={sprintIndex}
					top="mt-12"
					issuesCount={issues.length > 0 ? issues.length : 0}
					estimate={issues.length > 0 ? getEstimate() : 0}
				>
					{sprint.issues.length > 0 ? (
						renderIssues(sprint.issues)
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
				<PageTopicContainer size="lg:w-5/6" title="Backlog" />
				<div className="overflow-y-auto h-screen">
					{sprints.length > 0 ? (
						renderSprints()
					) : (
						<BacklogDndContainer
							index="0"
							top="mt-12"
							issuesCount={issues.length > 0 ? issues.length : 0}
							estimate={issues.length > 0 ? getEstimate() : 0}
						>
							<NoPlanedSprint />
						</BacklogDndContainer>
					)}

					<BacklogDndContainer
						top="mt-10"
						issuesCount={issues ? issues.length : 0}
						estimate={issues ? getEstimate() : 0}
						primary
					>
						{issues.length > 0 ? <BacklogIssueCard /> : 'Your backlog is empty'}
					</BacklogDndContainer>
				</div>
			</MainWrapper>
		</Fragment>
	);
};

export default BacklogPage;
