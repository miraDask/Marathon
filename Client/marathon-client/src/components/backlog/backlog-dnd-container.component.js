import React, { useContext } from 'react';

import { createSprint } from '../../services/sprints.service';
import { IssuesContext } from '../../providers/issues-context.provider';
import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';

import ClearButton from '../buttons/button-clear.component';
import { ReactComponent as EditIcon } from '../../assets/icon-edit.svg';

const BacklogDndContainer = ({
	onDragEnter,
	top,
	estimate,
	sprint,
	sprintIndex,
	issuesCount,
	children,
	otherProps
}) => {
	const { toggleCreating, updateBacklogIssues, backlogIssuesCollections } = useContext(IssuesContext);
	const { saveCurrentSprint, toggleUpdatingSprint, toggleStartingSprint } = useContext(SprintsContext);

	const { toggleModalIsOpen, token } = useContext(Context);
	const { currentProject } = useContext(ProjectsContext);

	const buttonTitle = !sprint ? 'Add Sprint' : 'Start Sprint';

	const handleAddSprint = async () => {
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
		<div className={`lg:mx-24 lg:w-5/6 text-right md:w-full w-full ${top}`} {...otherProps}>
			<div className="flex justify-between text-lg">
				<div className="">{!sprint ? 'Backlog' : sprint.title}</div>
				<div className="inline-flex">
					<ClearButton
						onClick={!sprint ? handleAddSprint : sprintIndex === 0 ? handleStartSprint : null}
						textSize="text-sm"
						disabled={getDisabledButton()}
						addClass="mb-2"
					>
						{buttonTitle}
					</ClearButton>
					{!sprint ? null : (
						<div className="inline-flex">
							<ClearButton onClick={handleUpdateSprint} textSize="text-sm" addClass="mb-2 ml-2">
								<EditIcon />
							</ClearButton>
						</div>
					)}
				</div>
			</div>
			<div
				onDragEnter={onDragEnter}
				className="h-full px-2 py-2 border-dashed border-2 border-gray-400 overflow-hidden text-center relative"
			>
				{children}
			</div>
			<div className="flex justify-between mt-2">
				<div className="">
					<ClearButton onClick={handleCreateIssueClick}>+ Create issue</ClearButton>
				</div>
				<div className="inline-flex">
					{issuesCount} issue / Estimate: {estimate}
				</div>
			</div>
		</div>
	);
};

export default BacklogDndContainer;
