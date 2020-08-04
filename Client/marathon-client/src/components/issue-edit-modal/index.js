import React, { useContext, useState } from 'react';
import { updateIssue, deleteIssue } from '../../services/issues.service';

import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';

import ModalContainer from '../modal-container';
import IssueForm from '../issue-form';
import DeleteButton from '../button-delete';
import SubmitButton from '../button-submit';

const IssueEditModal = () => {
	const { token, toggleModalIsOpen } = useContext(Context);
	const { currentProject } = useContext(ProjectsContext);
	const {
		backlogIssuesCollections,
		updateBacklogIssues,
		toggleUpdating,
		updating,
		openedIssue,
		saveOpenedIssue
	} = useContext(IssuesContext);
	const { currentSprint } = useContext(SprintsContext);
	const [ deleting, setDeleting ] = useState(false);

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
		saveOpenedIssue(null);
		toggleModalIsOpen();
	};

	const handleDeleteClicked = () => {
		setDeleting(true);
	};

	const handleDeleteIssue = async () => {
		try {
			await deleteIssue(openedIssue.id, token, currentProject.id);

			let newCollection = JSON.parse(JSON.stringify(backlogIssuesCollections));
			let sprint = newCollection[currentSprint.index];
			sprint.issues.splice(openedIssue.backlogIndex, 1);
			newCollection[currentSprint.index] = sprint;
			updateBacklogIssues(newCollection);
			setDeleting(false);
			return true;
		} catch (error) {
			return false;
		}
	};

	return (
		<ModalContainer onClose={handleClose} show={updating} addBgColor="bg-black bg-opacity-25">
			<IssueForm
				disabled={false}
				initialIssue={openedIssue}
				handleFetchData={deleting ? handleDeleteIssue : handleUpdateIssue}
				formTitle="issue details"
				handleModalClose={toggleUpdating}
			>
				<div className="flex md:mt-4 mt-6">
					<DeleteButton handleDelete={handleDeleteClicked} />
					<SubmitButton left="ml-6">Edit</SubmitButton>
				</div>
			</IssueForm>
		</ModalContainer>
	);
};

export default IssueEditModal;
