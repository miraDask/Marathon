import React, { useContext } from 'react';

import { getCookie } from '../../utils/cookie';

import { createIssue } from '../../services/issues.service';
import { IssuesContext } from '../../providers/issues-context.provider';
import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';

import ModalContainer from '../modal-container';
import IssueForm from '../issue-form';

const CreateIssueModal = () => {
	const { creating, toggleCreating, backlogIssuesCollections, updateBacklogIssues } = useContext(IssuesContext);
	const { currentSprint } = useContext(SprintsContext);
	const { toggleModalIsOpen } = useContext(Context);
	const { currentProject } = useContext(ProjectsContext);

	const handleCreateIssue = async (issue) => {
		const token = getCookie('x-auth-token');
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
		<ModalContainer onClose={handleClose} show={creating} addBgColor="bg-black bg-opacity-25">
			<IssueForm
				handleFetchData={handleCreateIssue}
				formTitle="Create issue"
				handleModalClose={toggleCreating}
				buttonTitle="Create"
			>
				<button
					type="submit"
					className="flex mx-auto text-white bg-green-400 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
				>
					Create
				</button>
			</IssueForm>
		</ModalContainer>
	);
};

export default CreateIssueModal;
