import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { updateSprint } from '../../services/sprints.service';

import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';

import ModalContainer from '../containers/modal-container.component';
import SprintForm from '../forms/update-sprint-form.component';

const StartSprintModal = () => {
	const { token, toggleModalIsOpen } = useContext(Context);
	const { currentProject } = useContext(ProjectsContext);
	const { backlogIssuesCollections, updateBacklogIssues } = useContext(IssuesContext);
	const { currentSprint, toggleStartingSprint, startingSprint, saveActiveSprintId } = useContext(SprintsContext);
	const history = useHistory();

	const handleStartSprint = async (sprint) => {
		saveActiveSprintId(sprint.id);
		//TODO check whether sprint is modified then update
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
		toggleStartingSprint();
		toggleModalIsOpen();
	};

	const successFunc = () => {
		history.push(`/user/dashboard/${currentProject.id}/board`);
	};

	return (
		<ModalContainer onClose={handleClose} show={startingSprint} addBgColor="bg-black bg-opacity-25">
			<SprintForm showDateInputs={true} handleUpdateSprint={handleStartSprint} successFunc={successFunc}>
				<div className="flex md:mt-4 mt-6">
					<button
						type="submit"
						className="inline-block mx-auto text-white bg-red-400 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
					>
						Start
					</button>
				</div>
			</SprintForm>
		</ModalContainer>
	);
};

export default StartSprintModal;
