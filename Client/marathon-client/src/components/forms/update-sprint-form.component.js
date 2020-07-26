import React, { useState, useContext, Fragment } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment/moment.js';

import { Context } from '../../providers/global-context.provider';
import { SprintsContext } from '../../providers/sprints-context.provider';

import { validateGoal, validateTitle, validateStartDate, validateEndDate } from '../../utils/validations/sprints';
import { getEmptyInputsErrorsObject } from '../../utils/errors/sprints';

import ErrorMessageContainer from '../messages/form-input-error-message.component';
import IssueFormsInput from '../inputs/issue-forms-input.component';
import CustomLabel from '../labels/custom-label.component';

const SprintForm = ({ handleUpdateSprint, children, showDateInputs, successFunc = null }) => {
	const [ errors, setErrors ] = useState({ title: '', description: '', storyPoints: '' });
	const { toggleModalIsOpen } = useContext(Context);
	const { currentSprint } = useContext(SprintsContext);
	const [ sprint, setSprint ] = useState(currentSprint);

	const minDate = Date.now();
	const startDate = sprint.startDate ? moment(sprint.startDate).toDate() : null;
	const endDate = sprint.endDate ? moment(sprint.endDate).toDate() : null;

	const handleChange = (event) => {
		const { value, name } = event.target;
		setSprint({ ...sprint, [name]: value });
		setErrors({ ...errors, [name]: '' });
	};

	const handleStartDateChange = (date) => {
		setSprint({ ...sprint, startDate: date });
		setErrors({ ...errors, startDate: '' });
	};

	const handleEndDateChange = (date) => {
		setSprint({ ...sprint, endDate: date });
		setErrors({ ...errors, endDate: '' });
	};

	const handleOnBlur = (event, validationFunc, data) => {
		const { name } = event.target;
		const validationResult = validationFunc(data);

		if (validationResult.error) {
			return setErrors({ ...errors, [name]: validationResult.error });
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (Object.keys(errors).some((key) => errors[key] !== '')) {
			return;
		}

		const { title, goal, startDate, endDate } = sprint;
		let errorsObject = getEmptyInputsErrorsObject({ title, goal, startDate, endDate });
		if (Object.keys(errorsObject).some((key) => errorsObject[key] !== '')) {
			return setErrors({ ...errors, ...errorsObject });
		}

		const success = await handleUpdateSprint(sprint);

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
			<Fragment>
				<div className="p-2 w-4/6">
					<CustomLabel labelFor="title">start date</CustomLabel>
					<DatePicker
						name="startDate"
						minDate={minDate}
						onBlur={(event) => handleOnBlur(event, validateStartDate, { startDate: sprint.startDate })}
						dateFormat="dd/MM/yyyy"
						placeholderText="dd/MM/yyyy"
						className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2"
						selected={startDate}
						onChange={handleStartDateChange}
					/>
					{errors.startDate ? <ErrorMessageContainer>{errors.startDate}</ErrorMessageContainer> : null}
				</div>
				<div className="p-2 w-4/6">
					<CustomLabel labelFor="title">end date</CustomLabel>
					<DatePicker
						name="endDate"
						minDate={minDate}
						onBlur={(event) => handleOnBlur(event, validateEndDate, { endDate: sprint.endDate })}
						dateFormat="dd/MM/yyyy"
						placeholderText="dd/MM/yyyy"
						className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 resize-none block"
						selected={endDate}
						onChange={handleEndDateChange}
					/>
					{errors.endDate ? <ErrorMessageContainer>{errors.endDate}</ErrorMessageContainer> : null}
				</div>
			</Fragment>
		);
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
				<p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Sprint details</p>
			</div>
			<div className="lg:w-2/3 md:w-2/3 mx-auto">
				<div className="flex flex-wrap -m-2">
					<div className="p-2 w-4/6">
						<CustomLabel labelFor="title">Title</CustomLabel>
						<IssueFormsInput
							handleChange={handleChange}
							handleOnBlur={(event) => handleOnBlur(event, validateTitle, { title: sprint.title })}
							placeholder="Title"
							type="text"
							name="title"
							value={sprint.title}
						/>
						{errors.title ? <ErrorMessageContainer>{errors.title}</ErrorMessageContainer> : null}
					</div>
					{showDateInputs ? renderDateInputs() : null}
					<div className="p-2 w-full">
						<CustomLabel labelFor="goal">Goal</CustomLabel>
						<textarea
							onChange={handleChange}
							onBlur={(event) => handleOnBlur(event, validateGoal, { goal: sprint.goal })}
							name="goal"
							className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none h-24 focus:border-teal-500 text-base px-4 py-2 resize-none block"
							placeholder="Goal"
							value={sprint.goal}
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
