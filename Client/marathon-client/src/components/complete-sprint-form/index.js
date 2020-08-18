import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getCookie } from '../../utils/cookie';
import { completeSprint } from '../../services/sprints.service';
import { getCompleteSprintFormOptions } from '../../utils/sprints';
import { getCompletedIssuesCount, getUnCompletedIssuesCount } from '../../utils/issues';

import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';

import CustomLabel from '../label';
import CustomSelect from '../custom-select';
import InfoMessageContainer from '../form-input-info-message';

const CompleteSprintForm = ({ children }) => {
	const { currentProject, saveCurrentProject } = useContext(ProjectsContext);
	const { toggleModalIsOpen, saveAlert } = useContext(Context);
	const { backlogIssuesCollections, boardIssuesCollections } = useContext(IssuesContext);
	const { toggleCompletingSprint } = useContext(SprintsContext);
	const [ sprintId, setSprintId ] = useState('');
	const [ sprints, setSprints ] = useState(null);
	const [ completed, setCompleted ] = useState('');
	const [ uncompleted, setUncompleted ] = useState('');
	const history = useHistory();

	useEffect(() => {
		const mappedSprints = getCompleteSprintFormOptions(backlogIssuesCollections, currentProject.activeSprintId);
		const completedIssuesCount = getCompletedIssuesCount(boardIssuesCollections);
		const unCompletedIssuesCount = getUnCompletedIssuesCount(boardIssuesCollections);
		setCompleted(completedIssuesCount);
		setUncompleted(unCompletedIssuesCount);
		setSprints(mappedSprints);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event) => {
		const { value } = event.target;
		setSprintId(value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const token = getCookie('x-auth-token');

		try {
			await completeSprint(currentProject.id, token, currentProject.activeSprintId, sprintId);
			toggleModalIsOpen();
			toggleCompletingSprint();
			saveAlert('Sprint successfully completed');
			saveCurrentProject({ ...currentProject, activeSprintId: null });
			history.push(`/user/dashboard/${currentProject.id}/backlog`, { showAlert: true });
		} catch (error) {
			return;
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="container px-5 py-2 mx-auto"
			onKeyPress={(e) => {
				e.key === 'Enter' && e.preventDefault();
			}}
		>
			<div className="flex flex-col text-center w-full mb-4">
				<p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
					{`Complete Sprint: ${currentProject.key} ${backlogIssuesCollections[0].title}`}
				</p>
			</div>
			<div className="lg:w-2/3 md:w-2/3 mx-auto justify-between">
				<div className="py-2 w-full">
					<span className="rounded-full h-5 w-5 flex items-center justify-center bg-green-300 text-black">
						{completed}
					</span>
					<span className="inline-flex">issues were done</span>
				</div>
				<div className="pb-12 w-full">
					<span className="rounded-full h-5 w-5 flex items-center justify-center bg-red-300 text-black">
						{uncompleted}
					</span>
					<span className="inline-block">issue was incomplete</span>{' '}
				</div>
				<div className="flex flex-wrap -m-2">
					{uncompleted > 0 ? (
						<div className="p-2 w-full">
							<InfoMessageContainer addClass="mb-2">
								Select where all the incomplete issues should be moved:
							</InfoMessageContainer>
							<div className="flex flex-wrap -mx-3 mb-2">
								{sprints ? (
									<CustomSelect
										disabled={false}
										label={<CustomLabel labelFor="sprintId">Move to:</CustomLabel>}
										value={sprintId}
										name="sprintId"
										handleChange={handleChange}
									>
										{sprints.map((x) => (
											<option key={x.title} value={x.id}>
												{x.title}
											</option>
										))}
									</CustomSelect>
								) : null}
							</div>
						</div>
					) : null}
					<div className="p-2 w-full">{children}</div>
				</div>
			</div>
		</form>
	);
};

export default CompleteSprintForm;
