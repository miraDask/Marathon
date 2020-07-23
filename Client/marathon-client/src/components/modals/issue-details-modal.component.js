import React, { useContext } from 'react';
import { updateIssue } from '../../services/issues.service';

import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';

import ModalContainer from '../containers/modal-container.component';
import IssueForm from '../forms/issue-form.component';

const IssueDetailsModal = ({ item }) => {
	const { token, toggleModalIsOpen } = useContext(Context);
	const { currentProject } = useContext(ProjectsContext);
	const { backlogIssuesCollections, updateBacklogIssues, currentSprint, toggleUpdating, updating } = useContext(
		IssuesContext
	);

	const handleUpdateIssue = async (issue) => {
		const newIssue = {
			...issue,
			type: parseInt(issue.type),
			priority: parseInt(issue.priority),
			status: parseInt(issue.status),
			storyPoints: parseInt(issue.storyPoints)
		};

		try {
			await updateIssue(newIssue, token, currentProject.id);

			let newCollection = JSON.parse(JSON.stringify(backlogIssuesCollections));
			let sprint = newCollection[currentSprint.index];
			sprint.issues.splice(issue.backlogIndex, 1, newIssue);
			newCollection[currentSprint.index] = sprint;
			updateBacklogIssues(newCollection);
			return true;
		} catch (error) {
			return false;
		}
	};

	const handleClose = () => {
		toggleUpdating();
		toggleModalIsOpen();
	};

	return (
		<ModalContainer onClose={handleClose} show={updating} addBgColor="bg-black bg-opacity-25">
			<IssueForm
				initialIssue={item}
				handleFetchData={handleUpdateIssue}
				formTitle="issue"
				handleModalClose={toggleUpdating}
				buttonTitle="Edit"
			/>
		</ModalContainer>
	);
};

export default IssueDetailsModal;
