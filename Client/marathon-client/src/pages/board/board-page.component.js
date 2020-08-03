import React, { Fragment, useEffect, useContext, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import { getSprintDetails } from '../../services/sprints.service';
import { processBoardIssuesCollections } from '../../utils/issues';

import { Context } from '../../providers/global-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';

import Alert from '../../components/messages/alert.component';
import NoActiveSprint from '../../components/board/no-active-sprint.component';
import CompleteSprintModal from '../../components/modals/complete-sprint-modal.component';
import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';
import MainWrapper from '../../components/main/main-wrapper.component';
import Board from '../../components/board/board.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';
import FormButton from '../../components/buttons/form-button.component';
import InfoMessageContainer from '../../components/messages/form-input-info-message.component';

const BoardPage = () => {
	const [ title, setTitle ] = useState('');
	const [ remainingDays, setRemainingDays ] = useState('');
	const { token, toggleModalIsOpen } = useContext(Context);
	const { updateBoardIssues, newAssignee } = useContext(IssuesContext);
	const { currentProject } = useContext(ProjectsContext);
	const { toggleCompletingSprint } = useContext(SprintsContext);
	const history = useHistory();
	const { projectId } = useParams();
	const { state } = useLocation();
	const showAlert = state ? state.showAlert : false;

	useEffect(
		() => {
			const getActiveSprintDetails = async () => {
				const response = await getSprintDetails(projectId, token, currentProject.activeSprintId);
				const { error } = response;
				if (error) {
					history.push('/404');
					return;
				}

				if (response) {
					const statusesCollection = processBoardIssuesCollections(response);
					updateBoardIssues(statusesCollection);
					setTitle(response.title);
					setRemainingDays(response.remainingDays);
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
		if (!currentProject.activeSprintId) {
			return;
		}
		toggleCompletingSprint();
		toggleModalIsOpen();
	};

	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper>
				<div className="px-16 pt-6 justify-evenly">
					<Alert
						color="teal"
						show={showAlert}
						onClose={() => {
							history.push(`/user/dashboard/${currentProject.id}/board`, { showAlert: false });
						}}
					/>
				</div>
				<PageTopicContainer
					size="lg:w-5/6"
					title={!currentProject.activeSprintId ? 'Active Sprint' : `${currentProject.key} / ${title}`}
				>
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
					{!currentProject.activeSprintId ? <NoActiveSprint /> : null}
					<CompleteSprintModal />
				</div>
			</MainWrapper>
		</Fragment>
	);
};

export default BoardPage;
