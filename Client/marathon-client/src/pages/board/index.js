import React, { Fragment, useEffect, useContext, useState } from 'react';

import useHubConnection from '../../hooks/useHubConnection';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import { getSprintDetails } from '../../services/sprints.service';
import { processBoardIssuesCollections } from '../../utils/issues';
import { getCookie } from '../../utils/cookie';

import { Context } from '../../providers/global-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';

import Alert from '../../components/alert';
import NoActiveSprint from '../../components/no-active-sprint';
import CompleteSprintModal from '../../components/complete-sprint-modal';
import DashboardNavBar from '../../components/dashboard-navbar';
import MainWrapper from '../../components/main-wrapper';
import Board from '../../components/board';
import PageTopicContainer from '../../components/page-topic-container';
import FormButton from '../../components/button-form';
import InfoMessageContainer from '../../components/form-input-info-message';

const BoardPage = () => {
	const [ title, setTitle ] = useState('');
	const [ remainingDays, setRemainingDays ] = useState('');
	const { toggleModalIsOpen } = useContext(Context);
	const { updateBoardIssues } = useContext(IssuesContext);
	const { currentProject } = useContext(ProjectsContext);
	const { toggleCompletingSprint } = useContext(SprintsContext);
	const history = useHistory();
	const { projectId } = useParams();
	const { state } = useLocation();
	const { update } = useHubConnection([
		{ funcName: 'BoardUpdate' },
		{
			funcName: 'SprintCompletedUpdate',
			successFunc: () => history.push(`/user/dashboard/${currentProject.id}/backlog`)
		},
		{
			funcName: 'DeletedProjectUpdate',
			successFunc: () => history.push(`/user/projects`)
		}
	]);
	const showAlert = state ? state.showAlert : false;

	useEffect(
		() => {
			const token = getCookie('x-auth-token');

			const getActiveSprintDetails = async () => {
				if (!currentProject) {
					history.push('/user/projects');
				}

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
		[ update ]
	);

	const handleCompleteSprint = () => {
		if (!currentProject.activeSprintId) {
			return;
		}
		toggleCompletingSprint();
		toggleModalIsOpen();
	};

	const getResultIfNoActiveSprint = () => {
		if (!currentProject.activeSprintId) {
			return <NoActiveSprint />;
		}
	};

	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper>
				<div className="px-16 pt-6 justify-evenly">
					<Alert
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
					{getResultIfNoActiveSprint()}
					<CompleteSprintModal />
				</div>
			</MainWrapper>
		</Fragment>
	);
};

export default BoardPage;
