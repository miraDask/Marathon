import { validateName, validateKey } from '../validations/project';

export const getEmptyInputsErrorsObject = (inputsObject) => {
	let errorsObject = {};
	Object.keys(inputsObject).forEach((key) => {
		const value = inputsObject[key];
		if (!value) {
			if (key === 'name') {
				const { error } = validateName({ value });
				errorsObject = { ...errorsObject, name: error };
			} else {
				const { error } = validateKey({ value });
				errorsObject = { ...errorsObject, key: error };
			}
		}
	});
	return errorsObject;
};
