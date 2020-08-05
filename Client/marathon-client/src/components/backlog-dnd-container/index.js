import React, { useContext } from 'react';

import { FlexWrapper, ChildrenContainer, UpperActionsContainer, UnderActionsContainer } from './index.styles';
import { getCookie } from '../../utils/cookie';

import { initialIssue } from '../../data/constants';
import { createSprint } from '../../services/sprints.service';
import { IssuesContext } from '../../providers/issues-context.provider';
import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';

import ClearButton from '../button-clear';
import { ReactComponent as EditIcon } from '../../assets/icon-edit.svg';

const BacklogDndContainer = ({ onDragEnter, estimate, sprint, sprintIndex, issuesCount, children, otherProps }) => {
	const { toggleCreating, updateBacklogIssues, backlogIssuesCollections, saveOpenedIssue } = useContext(
		IssuesContext
	);
	const { saveCurrentSprint, toggleUpdatingSprint, toggleStartingSprint } = useContext(SprintsContext);

	const { toggleModalIsOpen } = useContext(Context);
	const { currentProject } = useContext(ProjectsContext);

	const buttonTitle = !sprint ? 'Add Sprint' : 'Start Sprint';

	const handleAddSprint = async () => {
		const token = getCookie('x-auth-token');

		const response = await createSprint(currentProject.id, token);
		const sprint = {
			...response,
			issues: []
		};

		let newCollection = JSON.parse(JSON.stringify(backlogIssuesCollections));
		newCollection.splice(newCollection.length - 1, 0, sprint);
		updateBacklogIssues(newCollection);
	};

	const handleStartSprint = () => {
		toggleStartingSprint();
		toggleModalIsOpen();
		saveCurrentSprint(sprint);
	};

	const handleUpdateSprint = () => {
		toggleUpdatingSprint();
		toggleModalIsOpen();
		saveCurrentSprint(sprint);
	};

	const handleCreateIssueClick = (e) => {
		e.preventDefault();
		saveCurrentSprint({ id: sprint ? sprint.id : null, index: sprintIndex });
		saveOpenedIssue(initialIssue);
		toggleCreating();
		toggleModalIsOpen();
	};

	const getDisabledButton = () => {
		if (!sprint) {
			return false;
		}

		if (sprintIndex === 0 && sprint.issues.length > 0 && !sprint.active) {
			return false;
		}

		if ((sprintIndex === 0 && sprint.issues.length === 0) || sprint.active || sprintIndex > 0) {
			return true;
		}
	};

	return (
		<div className="lg:mx-24 lg:w-5/6 text-right md:w-full w-full mt-12" {...otherProps}>
			<UpperActionsContainer>
				<div>{!sprint ? 'Backlog' : sprint.title}</div>
				<FlexWrapper>
					<ClearButton
						onClick={!sprint ? handleAddSprint : sprintIndex === 0 ? handleStartSprint : null}
						textSize="text-sm"
						disabled={getDisabledButton()}
						addClass="mb-2"
					>
						{buttonTitle}
					</ClearButton>
					{!sprint ? null : (
						<FlexWrapper>
							<ClearButton onClick={handleUpdateSprint} textSize="text-sm" addClass="mb-2 ml-2">
								<EditIcon />
							</ClearButton>
						</FlexWrapper>
					)}
				</FlexWrapper>
			</UpperActionsContainer>
			<ChildrenContainer onDragEnter={onDragEnter}>{children}</ChildrenContainer>
			<UnderActionsContainer>
				<ClearButton onClick={handleCreateIssueClick}>+ Create issue</ClearButton>
				<FlexWrapper>
					{issuesCount} issue / Estimate: {estimate}
				</FlexWrapper>
			</UnderActionsContainer>
		</div>
	);
};

export default BacklogDndContainer;
