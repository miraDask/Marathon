import { validateTitle } from '../validations/teams';

export const getEmptyInputsErrorsObject = (inputsObject) => {
	let errorsObject = {};
	Object.keys(inputsObject).forEach((key) => {
		const value = inputsObject[key];
		if (!value) {
			if (key === 'title') {
				const { error } = validateTitle({ value });
				errorsObject = { ...errorsObject, title: error };
			}
		}
	});
	return errorsObject;
};
