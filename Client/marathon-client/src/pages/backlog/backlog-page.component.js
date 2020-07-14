import React, { useState } from 'react';
import MainWrapper from '../../components/main/maim-wrapper.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';
import BacklogDndContainer from './backlog-dnd-container.component';
import NoPlanedSprint from '../../components/sprints/no-planed-sprint.component';
import BacklogIssueCard from '../../components/cards/backlog-issue-card.component';

const BacklogPage = () => {
	const [ issues, setIssues ] = useState([]);
	const [ sprints, setSprint ] = useState([]);

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
	);
};

export default BacklogPage;
