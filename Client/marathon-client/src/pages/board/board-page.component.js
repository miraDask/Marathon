import React, { Fragment, useEffect, useContext, useState } from 'react';

import { getSprintDetails } from '../../services/sprints.service';
import { processBoardIssuesCollections } from '../../utils/issues';

import { Context } from '../../providers/global-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';
import MainWrapper from '../../components/main/maim-wrapper.component';
import Board from '../../components/board/board.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';
import FormButton from '../../components/buttons/form-button.component';
import InfoMessageContainer from '../../components/messages/form-input-info-message.component';

const BoardPage = ({ match }) => {
	const [ title, setTitle ] = useState('');
	const [ remainingDays, setRemainingDays ] = useState('');
	const { token } = useContext(Context);
	const { updateBoardIssues, newAssignee } = useContext(IssuesContext);
	const { currentProject } = useContext(ProjectsContext);

	useEffect(
		() => {
			const getActiveSprintDetails = async () => {
				const projectId = match.params.projectId;
				const response = await getSprintDetails(projectId, token, currentProject.activeSprintId);
				if (response) {
					const statusesCollection = processBoardIssuesCollections(response);
					updateBoardIssues(statusesCollection);
					setTitle(response.title);
					setRemainingDays(response.remainingDays);
					console.log('response', response);
				}
			};

			if (currentProject.activeSprintId) {
				getActiveSprintDetails();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ newAssignee ]
	);

	const handleCompleteSprint = () => {
		console.log(`Sprint with id: ${currentProject.activeSprintId} completed!`);
	};

	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper>
				<PageTopicContainer size="lg:w-5/6" title={`${currentProject.name} / ${title}`}>
					{remainingDays ? (
						<InfoMessageContainer addClass="mr-4">{'Remaining days ' + remainingDays}</InfoMessageContainer>
					) : null}
					<FormButton
						onClick={handleCompleteSprint}
						disabled={!currentProject.activeSprintId}
						addClass={!currentProject.activeSprintId ? 'cursor-not-allowed' : ''}
						textSize="text-md"
					>
						Complete Sprint
					</FormButton>
				</PageTopicContainer>

				<div className="container px-6 mb-8 mx-auto flex flex-wrap">
					<Board />
				</div>
			</MainWrapper>
		</Fragment>
	);
};

export default BoardPage;
