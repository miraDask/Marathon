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
		USERNAME_REQUIRED: 'Field Username is required',
		PASSWORD_REQUIRED: 'Field Password is required',
		PASSWORD_LENGTH: `Password should be at least ${USER.PASSWORD_MIN_LENGTH} characters long`,
		PASSWORDS_NOT_MATCH: 'Passwords should match',
		CONFIRM_PASSWORD_REQUIRED: 'Password confirmation is required',
		EMAIL: 'Invalid email',
		EMAIL_REQUIRED: 'Field Email is required'
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
