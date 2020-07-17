import { getValidationResult } from './index';

const ISSUE = {
	TITLE_MIN_LENGTH: 3,
	TITLE_MAX_LENGTH: 50,
	DESCRIPTION_MIN_LENGTH: 3,
	DESCRIPTION_MAX_LENGTH: 500
};

const ERROR_MESSAGES = {
	ISSUE: {
		POINTS: 'Story points should be positive integer',
		TITLE: `Title should be between ${ISSUE.TITLE_MIN_LENGTH}
		 and ${ISSUE.TITLE_MAX_LENGTH} characters long`,
		TITLE_REQUIRED: 'Title is required',
		DESCRIPTION_REQUIRED: 'Description is required',
		DESCRIPTION: `Description should be between ${ISSUE.DESCRIPTION_MIN_LENGTH} and ${ISSUE.DESCRIPTION_MAX_LENGTH} characters long`
	}
};

export const validateTitle = ({ title }) => {
	if (!title) {
		return getValidationResult(false, ERROR_MESSAGES.ISSUE.TITLE_REQUIRED);
	}

	const isValid = title.length >= ISSUE.TITLE_MIN_LENGTH && title.length <= ISSUE.TITLE_MAX_LENGTH;
	return getValidationResult(isValid, ERROR_MESSAGES.ISSUE.TITLE);
};

export const validatePoints = ({ storyPoints }) => {
	if (!storyPoints) {
		return true;
	}

	const isValid = Number.isInteger(+storyPoints);
	return getValidationResult(isValid, ERROR_MESSAGES.ISSUE.POINTS);
};

export const validateDescription = ({ description }) => {
	if (!description) {
		return getValidationResult(false, ERROR_MESSAGES.ISSUE.DESCRIPTION_REQUIRED);
	}
	const isValid =
		description.length >= ISSUE.DESCRIPTION_MIN_LENGTH && description.length <= ISSUE.DESCRIPTION_MAX_LENGTH;
	return getValidationResult(isValid, ERROR_MESSAGES.ISSUE.DESCRIPTION);
};
