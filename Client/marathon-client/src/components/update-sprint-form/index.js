import React, { useContext } from 'react';
import useFormProcessor from '../../hooks/useFormProcessor';

import { Context } from '../../providers/global-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';

import { validateGoal, validateTitle, validateStartDate, validateEndDate } from '../../utils/validations/sprints';
import { getEmptyInputsErrorsObject } from '../../utils/errors/sprints';

import DateInputs from '../date-inputs-container';
import ErrorMessageContainer from '../form-input-error-message';
import IssueFormsInput from '../issue-forms-input';
import CustomLabel from '../label';

const initialError = { title: '', goal: '', storyPoints: '' };

const SprintForm = ({ handleUpdateSprint, children, showDateInputs, successFunc = null }) => {
	const { toggleModalIsOpen } = useContext(Context);
	const { currentSprint } = useContext(SprintsContext);
	const { data, errors, setErrors, setData, handleChange, handleOnBlur, handleSubmit } = useFormProcessor(
		initialError,
		currentSprint.goal ? currentSprint : { ...currentSprint, goal: '' }
	);

	const getErrors = () => {
		const { title, goal, startDate, endDate } = data;
		const errorObj = showDateInputs ? { title, goal, startDate, endDate } : { title, goal };
		return getEmptyInputsErrorsObject(errorObj);
	};

	const updateSprint = async () => {
		const success = await handleUpdateSprint(data);

		if (success) {
			setErrors({ name: '', key: '' });
			toggleModalIsOpen();
			if (successFunc) {
				successFunc();
			}
		}
	};

	const renderDateInputs = () => {
		return (
			<DateInputs
				data={data}
				errors={errors}
				setErrors={setErrors}
				setData={setData}
				startDateOnBlur={(event) => handleOnBlur(event, validateStartDate, { startDate: data.startDate })}
				endDateOnBlur={(event) => handleOnBlur(event, validateEndDate, { endDate: data.endDate })}
			/>
		);
	};

	return (
		<form
			onSubmit={(e) => handleSubmit(e, getErrors(), updateSprint)}
			className="container px-5 py-2 mx-auto"
			onKeyPress={(e) => {
				e.key === 'Enter' && e.preventDefault();
			}}
		>
			<div className="flex flex-col text-center w-full mb-4">
				<p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Sprint details</p>
			</div>
			<div className="lg:w-2/3 md:w-2/3 mx-auto">
				<div className="flex flex-wrap -m-2">
					<div className="p-2 w-4/6">
						<CustomLabel labelFor="title">Title</CustomLabel>
						<IssueFormsInput
							handleChange={handleChange}
							handleOnBlur={(event) => handleOnBlur(event, validateTitle, { title: data.title })}
							placeholder="Title"
							type="text"
							name="title"
							value={data.title}
						/>
						{errors.title ? <ErrorMessageContainer>{errors.title}</ErrorMessageContainer> : null}
					</div>
					{showDateInputs ? renderDateInputs() : null}
					<div className="p-2 w-full">
						<CustomLabel labelFor="goal">Goal</CustomLabel>
						<textarea
							onChange={handleChange}
							onBlur={(event) => handleOnBlur(event, validateGoal, { goal: data.goal })}
							name="goal"
							className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none h-24 focus:border-teal-500 text-base px-4 py-2 resize-none block"
							placeholder="Goal"
							value={data.goal}
						/>
						{errors.goal ? <ErrorMessageContainer>{errors.goal}</ErrorMessageContainer> : null}
					</div>

					<div className="p-2 w-full">{children}</div>
				</div>
			</div>
		</form>
	);
};

export default SprintForm;
