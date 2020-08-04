import React, { Fragment } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment/moment.js';

import ErrorMessageContainer from '../form-input-error-message';
import CustomLabel from '../label';

const DateInputs = ({ data, errors, setErrors, setData, startDateOnBlur, endDateOnBlur }) => {
	const minDate = Date.now();
	const startDate = data.startDate ? moment(data.startDate).toDate() : null;
	const endDate = data.endDate ? moment(data.endDate).toDate() : null;

	const handleStartDateChange = (date) => {
		setData({ ...data, startDate: date });
		setErrors({ ...errors, startDate: '' });
	};

	const handleEndDateChange = (date) => {
		setData({ ...data, endDate: date });
		setErrors({ ...errors, endDate: '' });
	};

	return (
		<Fragment>
			<div className="p-2 w-4/6">
				<CustomLabel labelFor="title">start date</CustomLabel>
				<DatePicker
					name="startDate"
					minDate={minDate}
					onBlur={startDateOnBlur}
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
					onBlur={endDateOnBlur}
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

export default DateInputs;
