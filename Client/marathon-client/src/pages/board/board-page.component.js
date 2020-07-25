import React, { Fragment, useEffect, useContext } from 'react';

import { initialStatuses } from '../../data/constants';
import { getSprintDetails } from '../../services/sprints.service';
import { processBoardIssuesCollections } from '../../utils/issues';

import { Context } from '../../providers/global-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';
import MainWrapper from '../../components/main/maim-wrapper.component';
import Board from '../../components/board/board.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';
import FormButton from '../../components/buttons/form-button.component';

const BoardPage = ({ match }) => {
	const { token } = useContext(Context);
	const { saveActiveSprint, activeSprint, activeSprintId } = useContext(SprintsContext);
	const { updateBoardIssues } = useContext(IssuesContext);
	const { currentProject } = useContext(ProjectsContext);

	useEffect(() => {
		const getActiveSprintDetails = async () => {
			const projectId = match.params.projectId;
			const response = await getSprintDetails(projectId, token, activeSprintId);
			if (response) {
				saveActiveSprint(response);
				const statusesCollection = processBoardIssuesCollections(response);
				updateBoardIssues(statusesCollection);
				console.log('response', response);
			}
		};

		if (activeSprintId) {
			getActiveSprintDetails();
		} else {
			updateBoardIssues(initialStatuses);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper>
				<PageTopicContainer
					size="lg:w-5/6"
					title={`${currentProject.name} / ${activeSprint ? activeSprint.title : ''}`}
				>
					{/* TODO - check if there are any sprint - if not add commented props */}
					<FormButton
						disabled={!activeSprintId}
						addClass={!activeSprintId ? 'cursor-not-allowed' : ''}
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
