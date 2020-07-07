import { getValidationResult } from './index';

const USER = {
	USERNAME_MIN_LENGTH: 6,
	USERNAME_MAX_LENGTH: 25,
	NAME_MIN_LENGTH: 2,
	NAME_MAX_LENGTH: 12,
	PASSWORD_MIN_LENGTH: 6,
	EMAIL_PATTERN: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

const ERROR_MESSAGES = {
	USER: {
		USERNAME: `Username should be between ${USER.USERNAME_MIN_LENGTH}
		 and ${USER.USERNAME_MAX_LENGTH} characters long`,
		USERNAME_REQUIRED: 'Username is required',
		NAME: `Name should be between ${USER.NAME_MIN_LENGTH} and ${USER.NAME_MAX_LENGTH} characters long`,
		NAME_REQUIRED: 'Name is required',
		PASSWORD_REQUIRED: 'Password is required',
		PASSWORD_LENGTH: `Password should be at least ${USER.PASSWORD_MIN_LENGTH} characters long`,
		PASSWORDS_NOT_MATCH: 'Passwords should match',
		CONFIRM_PASSWORD_REQUIRED: 'Password confirmation is required',
		EMAIL: 'Invalid email',
		EMAIL_REQUIRED: 'Email is required'
	}
};

export const validateUsername = ({ username }) => {
	if (!username) {
		return getValidationResult(false, ERROR_MESSAGES.USER.USERNAME_REQUIRED);
	}

	const isValid = username.length >= USER.USERNAME_MIN_LENGTH && username.length <= USER.USERNAME_MAX_LENGTH;
	return getValidationResult(isValid, ERROR_MESSAGES.USER.USERNAME);
};

export const validateEmail = ({ email }) => {
	if (!email) {
		return getValidationResult(false, ERROR_MESSAGES.USER.EMAIL_REQUIRED);
	}
	const isValid = !!email.match(USER.EMAIL_PATTERN);
	return getValidationResult(isValid, ERROR_MESSAGES.USER.EMAIL);
};

export const validatePassword = ({ password }) => {
	if (!password) {
		return getValidationResult(false, ERROR_MESSAGES.USER.PASSWORD_REQUIRED);
	}
	const isValid = password.length >= USER.PASSWORD_MIN_LENGTH;
	return getValidationResult(isValid, ERROR_MESSAGES.USER.PASSWORD_LENGTH);
};

export const validateConfirmPassword = ({ password, confirmPassword }) => {
	if (!confirmPassword) {
		return getValidationResult(false, ERROR_MESSAGES.USER.CONFIRM_PASSWORD_REQUIRED);
	}

	const isValid = !password ? false : password === confirmPassword;
	return getValidationResult(isValid, ERROR_MESSAGES.USER.PASSWORDS_NOT_MATCH);
};
export const validateFirstName = ({ firstName }) => validateName(firstName);
export const validateLastName = ({ lastName }) => validateName(lastName);

const validateName = (name) => {
	if (!name) {
		return getValidationResult(false, ERROR_MESSAGES.USER.NAME_REQUIRED);
	}
	const isValid = name.length >= USER.NAME_MIN_LENGTH && name.length <= USER.NAME_MAX_LENGTH;
	return getValidationResult(isValid, ERROR_MESSAGES.USER.NAME);
};
