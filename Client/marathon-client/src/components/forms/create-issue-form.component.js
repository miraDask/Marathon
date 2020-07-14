import React, { useState, useContext } from 'react';

import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';

import { validateDescription, validateTitle, validatePoints } from '../../utils/validations/issue';
import { getEmptyInputsErrorsObject } from '../../utils/errors/issues';
import { statuses, priorities, types } from '../../data/constants';
import { createIssue } from '../../services/issues.service';

import ErrorMessageContainer from '../messages/form-input-error-message.component';
import IssueFormsInput from '../inputs/issue-forms-input.component';
import CustomLabel from '../labels/custom-label.component';
import CustomSelect from '../select/custom-select.component';

const initialIssue = {
	title: '',
	description: '',
	type: 0,
	priority: 0,
	status: 0,
	storyPoints: null,
	sprintId: null
};

const CreateIssueForm = () => {
	const [ issue, setIssue ] = useState(initialIssue);
	const [ errors, setErrors ] = useState({ title: '', description: '', storyPoints: '' });
	const { token } = useContext(Context);
	const { currentProject } = useContext(ProjectsContext);
	const { toggleCreating, updateIssues, issues } = useContext(IssuesContext);

	const handleChange = (event) => {
		const { value, name } = event.target;
		setIssue({ ...issue, [name]: value });
		setErrors({ ...errors, [name]: '' });
	};

	const handleOnBlur = (event, validationFunc, data) => {
		const { name } = event.target;
		const { error } = validationFunc(data);

		if (error) {
			return setErrors({ ...errors, [name]: error });
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (Object.keys(errors).some((key) => errors[key] !== '')) {
			return;
		}

		const { title } = issue;
		let errorsObject = getEmptyInputsErrorsObject({ title });
		if (Object.keys(errorsObject).some((key) => errorsObject[key] !== '')) {
			return setErrors({ ...errors, ...errorsObject });
		}

		const result = await createIssue({ ...issue }, token, currentProject.id);

		if (result.id) {
			const newIssue = {
				id: result.id,
				...issue
			};

			updateIssues(issues.concat(newIssue));
			setErrors({ name: '', key: '' });
			toggleCreating();
		}
	};

	return (
		<form onSubmit={handleSubmit} className="container px-5 py-2 mx-auto">
			<div className="flex flex-col text-center w-full mb-4">
				<p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Create issue</p>
			</div>
			<div className="lg:w-2/3 md:w-2/3 mx-auto">
				<div className="flex flex-wrap -m-2">
					<div className="p-2 w-4/6">
						<CustomLabel labelFor="title">Title</CustomLabel>
						<IssueFormsInput
							handleChange={handleChange}
							handleOnBlur={(event) => handleOnBlur(event, validateTitle, { title: issue.title })}
							placeholder="Title"
							type="text"
							name="title"
							value={issue.title}
						/>
						{errors.title ? <ErrorMessageContainer>{errors.title}</ErrorMessageContainer> : null}
					</div>
					<div className="p-2 w-2/6">
						<CustomLabel labelFor="storyPoints">Story Points</CustomLabel>
						<IssueFormsInput
							handleChange={handleChange}
							handleOnBlur={(event) =>
								handleOnBlur(event, validatePoints, { storyPoints: issue.storyPoints })}
							placeholder="1, 2, 3, 5, 8, …"
							type="number"
							name="storyPoints"
							value={issue.storyPoints}
						/>
						{errors.storyPoints ? (
							<ErrorMessageContainer>{errors.storyPoints}</ErrorMessageContainer>
						) : null}
					</div>
					<div className="p-2 w-full">
						<textarea
							onChange={handleChange}
							onBlur={(event) =>
								handleOnBlur(event, validateDescription, { description: issue.description })}
							name="description"
							className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none h-24 focus:border-teal-500 text-base px-4 py-2 resize-none block"
							placeholder="Description"
							value={issue.description}
						/>
						{errors.description ? (
							<ErrorMessageContainer>{errors.description}</ErrorMessageContainer>
						) : null}
					</div>
					<div className="p-2 w-full">
						<div className="flex flex-wrap -mx-3 mb-2">
							<CustomSelect options={types} value={issue.type} name="type" handleChange={handleChange}>
								<CustomLabel>Type</CustomLabel>
							</CustomSelect>
							<CustomSelect
								options={priorities}
								value={issue.priority}
								name="priority"
								handleChange={handleChange}
							>
								<CustomLabel>Priority</CustomLabel>
							</CustomSelect>
							<CustomSelect
								options={statuses}
								value={issue.status}
								name="status"
								handleChange={handleChange}
							>
								<CustomLabel>Status</CustomLabel>
							</CustomSelect>
						</div>
					</div>
					<div className="p-2 w-full">
						<button
							type="submit"
							className="flex mx-auto text-white bg-green-400 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
						>
							Create
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default CreateIssueForm;
