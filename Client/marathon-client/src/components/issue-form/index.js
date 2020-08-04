import React, { useContext, useEffect } from 'react';
import useFormProcessor from '../../hooks/useFormProcessor';

import { Context } from '../../providers/global-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';

import { validateDescription, validateTitle, validatePoints } from '../../utils/validations/issue';
import { getEmptyInputsErrorsObject } from '../../utils/errors/issues';
import { statuses, priorities, types } from '../../data/constants';

import ErrorMessageContainer from '../form-input-error-message';
import IssueFormsInput from '../issue-forms-input';
import CustomLabel from '../label';
import CustomSelect from '../custom-select';

const initialErrors = { title: '', description: '', storyPoints: '' };
const IssueForm = ({ handleFetchData, formTitle, handleModalClose, children, disabled = null }) => {
	const { openedIssue } = useContext(IssuesContext);
	const { data, errors, setErrors, setData, handleChange, handleOnBlur, handleSubmit } = useFormProcessor(
		initialErrors,
		openedIssue
	);
	const { toggleModalIsOpen } = useContext(Context);

	useEffect(
		() => {
			setData(openedIssue);
		},
		[ openedIssue, setData ]
	);

	const getErrors = () => {
		const { title, description } = data;
		return getEmptyInputsErrorsObject({ title, description });
	};

	const handleFetchAsync = async () => {
		const success = await handleFetchData(data);

		if (success) {
			setErrors({ name: '', key: '' });
			handleModalClose();
			toggleModalIsOpen();
		}
	};

	const getOptions = (options) => {
		return options.map((option, index) => (
			<option key={index} value={index}>
				{option}
			</option>
		));
	};

	return (
		<form
			onSubmit={(e) => handleSubmit(e, getErrors(), handleFetchAsync)}
			className="container px-5 py-2 mx-auto"
			onKeyPress={(e) => {
				e.key === 'Enter' && e.preventDefault();
			}}
		>
			<div className="flex flex-col text-center w-full mb-4">
				<p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">{formTitle}</p>
			</div>
			<div className="lg:w-2/3 md:w-2/3 mx-auto">
				<div className="flex flex-wrap -m-2">
					<div className="p-2 w-4/6">
						<CustomLabel labelFor="title">Title</CustomLabel>
						<IssueFormsInput
							disabled={disabled}
							handleChange={handleChange}
							handleOnBlur={(event) => handleOnBlur(event, validateTitle, { title: data.title })}
							placeholder="Title"
							type="text"
							name="title"
							value={data.title}
						/>
						{errors.title ? <ErrorMessageContainer>{errors.title}</ErrorMessageContainer> : null}
					</div>
					<div className="p-2 w-2/6">
						<CustomLabel labelFor="storyPoints">Story Points</CustomLabel>
						<IssueFormsInput
							disabled={disabled}
							handleChange={handleChange}
							handleOnBlur={(event) =>
								handleOnBlur(event, validatePoints, { storyPoints: data.storyPoints })}
							placeholder="1, 2, 3, 5, 8, …"
							type="number"
							name="storyPoints"
							value={data.storyPoints}
						/>
						{errors.storyPoints ? (
							<ErrorMessageContainer>{errors.storyPoints}</ErrorMessageContainer>
						) : null}
					</div>
					<div className="p-2 w-full">
						<textarea
							disabled={disabled}
							onChange={handleChange}
							onBlur={(event) =>
								handleOnBlur(event, validateDescription, { description: data.description })}
							name="description"
							className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none h-24 focus:border-teal-500 text-base px-4 py-2 resize-none block"
							placeholder="Description"
							value={data.description}
						/>
						{errors.description ? (
							<ErrorMessageContainer>{errors.description}</ErrorMessageContainer>
						) : null}
					</div>
					<div className="p-2 w-full">
						<div className="flex flex-wrap -mx-3 mb-2">
							<CustomSelect
								disabled={disabled}
								label={<CustomLabel>Type</CustomLabel>}
								value={data.type}
								name="type"
								handleChange={handleChange}
							>
								{getOptions(types)}
							</CustomSelect>
							<CustomSelect
								disabled={disabled}
								label={<CustomLabel>Priority</CustomLabel>}
								value={data.priority}
								name="priority"
								handleChange={handleChange}
							>
								{getOptions(priorities)}
							</CustomSelect>
							<CustomSelect
								disabled={disabled}
								label={<CustomLabel>Status</CustomLabel>}
								value={data.status}
								name="status"
								handleChange={handleChange}
							>
								{getOptions(statuses)}
							</CustomSelect>
						</div>
					</div>
					<div className="p-2 w-full">{children}</div>
				</div>
			</div>
		</form>
	);
};

export default IssueForm;
