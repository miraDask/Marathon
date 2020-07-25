import { validateTitle, validateGoal, validateEndDate, validateStartDate } from '../validations/sprints';

export const getEmptyInputsErrorsObject = (inputsObject) => {
	let errorsObject = {};
	Object.keys(inputsObject).forEach((key) => {
		const value = inputsObject[key];
		if (!value) {
			if (key === 'title') {
				const { error } = validateTitle({ value });
				errorsObject = { ...errorsObject, title: error };
			} else if (key === 'description') {
				const { error } = validateGoal({ value });
				errorsObject = { ...errorsObject, goal: error };
			} else if (key === 'endDate') {
				const { error } = validateEndDate({ value });
				errorsObject = { ...errorsObject, endDate: error };
			} else if (key === 'startDate') {
				const { error } = validateStartDate({ value });
				errorsObject = { ...errorsObject, startDate: error };
			}
		}
	});
	return errorsObject;
};
