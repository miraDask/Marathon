import React, { useContext, useState } from 'react';
import { updateIssue, deleteIssue } from '../../services/issues.service';

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
		toggleModalIsOpen();
	};

	const handleDeleteClicked = () => {
		setDeleting(true);
	};

	const handleDeleteIssue = async () => {
		try {
			await deleteIssue(item.id, token, currentProject.id);

			let newCollection = JSON.parse(JSON.stringify(backlogIssuesCollections));
			let sprint = newCollection[currentSprint.index];
			sprint.issues.splice(item.backlogIndex, 1);
			newCollection[currentSprint.index] = sprint;
			updateBacklogIssues(newCollection);
			return true;
		} catch (error) {
			return false;
		}
	};

	return (
		<ModalContainer onClose={handleClose} show={updating} addBgColor="bg-black bg-opacity-25">
			<IssueForm
				initialIssue={item}
				handleFetchData={deleting ? handleDeleteIssue : handleUpdateIssue}
				formTitle="issue"
				handleModalClose={toggleUpdating}
				buttonTitle="Edit"
			>
				<div className="flex md:mt-4 mt-6">
					<button
						type="submit"
						onClick={handleDeleteClicked}
						className="inline-block mx-auto text-white bg-red-400 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
					>
						Delete
					</button>
					<button
						type="submit"
						className="inline-block mx-auto text-white bg-green-400 ml-6 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
					>
						Edit
					</button>
				</div>
			</IssueForm>
		</ModalContainer>
	);
};

export default IssueDetailsModal;
