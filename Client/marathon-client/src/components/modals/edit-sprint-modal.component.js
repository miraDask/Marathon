import React, { useContext } from 'react';

import { deleteSprint, updateSprint } from '../../services/sprints.service';

import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';

import ModalContainer from '../containers/modal-container.component';
import SprintForm from '../forms/update-sprint-form.component';
import DeleteButton from '../buttons/delete-button.component';
import SubmitButton from '../buttons/submit-button.component';

const EditSprintModal = () => {
	const { token, toggleModalIsOpen } = useContext(Context);
	const { currentProject, saveCurrentProject } = useContext(ProjectsContext);
	const { backlogIssuesCollections, updateBacklogIssues } = useContext(IssuesContext);
	const { currentSprint, toggleUpdatingSprint, updatingSprint } = useContext(SprintsContext);

	const handleUpdateSprint = async (sprint) => {
		try {
			await updateSprint(currentProject.id, token, currentSprint.id, sprint);
			let newCollection = JSON.parse(JSON.stringify(backlogIssuesCollections));
			const sprintIndex = newCollection
				.map(function(x) {
					return x.id;
				})
				.indexOf(currentSprint.id);
			let sprintToUpdate = newCollection[sprintIndex];
			sprintToUpdate = {
				...sprintToUpdate,
				title: sprint.title,
				startDate: sprint.startDate,
				endDate: sprint.endDate,
				goal: sprint.goal
			};
			newCollection.splice(sprintIndex, 1, sprintToUpdate);
			updateBacklogIssues(newCollection);
			return true;
		} catch (error) {
			return false;
		}
	};

	const handleClose = () => {
		toggleUpdatingSprint();
		toggleModalIsOpen();
	};

	const handleDeleteSprint = async (e) => {
		e.preventDefault();
		try {
			await deleteSprint(currentProject.id, token, currentSprint.id);
			let newCollection = JSON.parse(JSON.stringify(backlogIssuesCollections));
			newCollection = newCollection.filter((x) => x.id !== currentSprint.id);
			updateBacklogIssues(newCollection);
			saveCurrentProject({ ...currentProject, activeSprintId: null });
			handleClose();
			return true;
		} catch (error) {
			return false;
		}
	};

	const successFunc = () => {
		toggleUpdatingSprint();
	};

	return (
		<ModalContainer onClose={handleClose} show={updatingSprint} addBgColor="bg-black bg-opacity-25">
			<SprintForm
				handleUpdateSprint={handleUpdateSprint}
				showDateInputs={currentSprint.startDate}
				successFunc={successFunc}
			>
				<div className="flex md:mt-4 mt-6">
					<DeleteButton handleDelete={handleDeleteSprint} />
					<SubmitButton left="ml-6">Edit</SubmitButton>
				</div>
			</SprintForm>
		</ModalContainer>
	);
};

export default EditSprintModal;
