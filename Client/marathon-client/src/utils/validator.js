const USER = {
	USERNAME_MIN_LENGTH: 6,
	USERNAME_MAX_LENGTH: 25,
	PASSWORD_MIN_LENGTH: 6,
	EMAIL_PATTERN: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

const ERROR_MESSAGES = {
	USER: {
		USERNAME: `Username should be at least ${USER.USERNAME_MIN_LENGTH}
         and no more than ${USER.USERNAME_MAX_LENGTH} characters long`,
		PASSWORD_LENGTH: `Password should be at least ${USER.PASSWORD_MIN_LENGTH} characters long`,
		PASSWORDS_NOT_MATCH: 'Passwords should match',
		EMAIL: 'Invalid email'
	}
};

export const validateUsername = ({ username }) => {
	const isValid = !username
		? false
		: username.length >= USER.USERNAME_MIN_LENGTH && username.length <= USER.USERNAME_MAX_LENGTH;
	const message = ERROR_MESSAGES.USER.USERNAME;

	return getValidationResult(isValid, message);
};

export const validateEmail = ({ email }) => {
	const isValid = !email ? false : !!email.match(USER.EMAIL_PATTERN);
	const message = ERROR_MESSAGES.USER.EMAIL;

	return getValidationResult(isValid, message);
};

export const validatePassword = ({ password }) => {
	const isValid = !password ? false : password.length >= USER.PASSWORD_MIN_LENGTH;
	const message = ERROR_MESSAGES.USER.PASSWORD_LENGTH;

	return getValidationResult(isValid, message);
};

export const validatePasswordsMatch = ({ password, confirmPassword }) => {
	const isValid = !password ? false : !confirmPassword ? false : password === confirmPassword;
	const message = ERROR_MESSAGES.USER.PASSWORDS_NOT_MATCH;

	return getValidationResult(isValid, message);
};

const getValidationResult = (isValid, message) => {
	if (isValid === false) {
		return {
			isValid: false,
			error: message
		};
	}

	return {
		isValid
	};
};
