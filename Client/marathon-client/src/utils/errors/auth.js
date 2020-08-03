import {
	validatePassword,
	validateConfirmPassword,
	validateUsername,
	validateEmail,
	validateFirstName,
	validateLastName
} from '../validations/auth';

export const getServerErrorsObject = (serverErrors) => {
	let errorsObject = {};
	Object.keys(serverErrors).forEach((key) => {
		const message = serverErrors[key][0];
		if (message.toLowerCase().includes('user name')) {
			errorsObject = { ...errorsObject, username: message };
		} else if (message.toLowerCase().includes('password')) {
			errorsObject = { ...errorsObject, password: message };
		} else if (message.toLowerCase().includes('email')) {
			errorsObject = { ...errorsObject, email: message };
		}
	});
	return errorsObject;
};

export const getEmptyInputsErrorsObject = (inputsObject) => {
	let errorsObject = {};
	Object.keys(inputsObject).forEach((key) => {
		const value = inputsObject[key];
		if (!value) {
			if (key === 'username') {
				const { error } = validateUsername({ value });
				errorsObject = { ...errorsObject, username: error };
			} else if (key === 'password') {
				const { error } = validatePassword({ value });
				errorsObject = { ...errorsObject, password: error };
			} else if (key === 'firstName') {
				const { error } = validateFirstName({ value });
				errorsObject = { ...errorsObject, firstName: error };
			} else if (key === 'lastName') {
				const { error } = validateLastName({ value });
				errorsObject = { ...errorsObject, lastName: error };
			} else if (key === 'email') {
				const { error } = validateEmail({ value });
				errorsObject = { ...errorsObject, email: error };
			} else {
				const { error } = validateConfirmPassword({ value });
				errorsObject = { ...errorsObject, confirmPassword: error };
			}
		}
	});
	return errorsObject;
};
