import React, { useContext } from 'react';

import { createIssue } from '../../services/issues.service';
import { IssuesContext } from '../../providers/issues-context.provider';
import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import ModalContainer from '../containers/modal-container.component';
import IssueForm from '../forms/issue-form.component';

const CreateIssueModal = () => {
	const { creating, toggleCreating, currentSprint, backlogIssuesCollections, updateBacklogIssues } = useContext(
		IssuesContext
	);
	const { toggleModalIsOpen, token } = useContext(Context);
	const { currentProject } = useContext(ProjectsContext);

	const initialIssue = {
		title: '',
		description: '',
		type: 0,
		priority: 0,
		status: 0,
		storyPoints: 0,
		sprintId: ''
	};

	const handleCreateIssue = async (issue) => {
		const result = await createIssue({ ...issue, sprintId: currentSprint.id }, token, currentProject.id);

		if (result) {
			const newIssue = {
				id: result,
				...issue,
				type: parseInt(issue.type),
				priority: parseInt(issue.priority),
				status: parseInt(issue.status),
				storyPoints: parseInt(issue.storyPoints)
			};

			let newCollection = JSON.parse(JSON.stringify(backlogIssuesCollections));
			newCollection[currentSprint.index].issues.push(newIssue);
			updateBacklogIssues(newCollection);
			return true;
		}

		return false;
	};

	const handleClose = () => {
		toggleCreating();
		toggleModalIsOpen();
	};

	return (
		<ModalContainer onClose={handleClose} show={creating}>
			<IssueForm
				initialIssue={initialIssue}
				handleFetchData={handleCreateIssue}
				formTitle="Create issue"
				handleModalClose={toggleCreating}
				buttonTitle="Create"
			/>
		</ModalContainer>
	);
};

export default CreateIssueModal;
