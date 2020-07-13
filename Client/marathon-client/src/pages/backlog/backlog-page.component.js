import React, { useState } from 'react';
import MainWrapper from '../../components/main/maim-wrapper.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';
import FormButton from '../../components/forms/form-button.component';
import NavLink from '../../components/navigation/nav-link.component';
import BacklogDndContainer from './backlog-dnd-container.component';
import NoPlanedSprint from '../../components/sprints/no-planed-sprint.component';
import BacklogIssueCard from '../../components/cards/backlog-issue-card.component';

const BacklogPage = () => {
	const [ issues, setIssues ] = useState(null);
	const [ sprints, setSprint ] = useState(null);

	const getEstimate = () => {
		const estimate = issues.reduce((acc, curr) => {
			return curr.storyPoints + acc;
		}, 0);

		return estimate;
	};

	return (
		<MainWrapper>
			<PageTopicContainer size="lg:w-5/6" title="Backlog">
				<NavLink to="/user/dashboard/board">
					<FormButton textSize="text-md">Start Sprint</FormButton>
				</NavLink>
			</PageTopicContainer>

			<BacklogDndContainer
				top="mt-12"
				issuesCount={issues ? issues.length : 0}
				estimate={issues ? getEstimate() : 0}
			>
				{sprints ? <BacklogIssueCard /> : <NoPlanedSprint />}
			</BacklogDndContainer>
			<BacklogDndContainer
				top="mt-10"
				issuesCount={issues ? issues.length : 0}
				estimate={issues ? getEstimate() : 0}
			>
				{issues ? <BacklogIssueCard /> : 'Your backlog is empty'}
			</BacklogDndContainer>
		</MainWrapper>
	);
};

export default BacklogPage;
