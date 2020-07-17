import { validateTitle, validateDescription } from '../validations/issue';

export const getEmptyInputsErrorsObject = (inputsObject) => {
	let errorsObject = {};
	Object.keys(inputsObject).forEach((key) => {
		const value = inputsObject[key];
		if (!value) {
			if (key === 'title') {
				const { error } = validateTitle({ value });
				errorsObject = { ...errorsObject, title: error };
			} else if (key === 'description') {
				const { error } = validateDescription({ value });
				errorsObject = { ...errorsObject, description: error };
			}
		}
	});
	return errorsObject;
};
