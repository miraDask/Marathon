import { getValidationResult } from './index';

const SPRINT = {
	TITLE_MIN_LENGTH: 3,
	TITLE_MAX_LENGTH: 25,
	GOAL_MIN_LENGTH: 2,
	GOAL_MAX_LENGTH: 500
};

const ERROR_MESSAGES = {
	SPRINT: {
		TITLE: `Title should be between ${SPRINT.TITLE_MIN_LENGTH}
		 and ${SPRINT.TITLE_MAX_LENGTH} characters long`,
		TITLE_REQUIRED: 'Title is required',
		GOAL: `Goal should be between ${SPRINT.GOAL_MIN_LENGTH} and ${SPRINT.GOAL_MAX_LENGTH} characters long`,
		END_DATE_REQUIRED: 'End date is required',
		START_DATE_REQUIRED: 'Start date is required'
	}
};

export const validateTitle = ({ title }) => {
	if (!title) {
		return getValidationResult(false, ERROR_MESSAGES.SPRINT.TITLE_REQUIRED);
	}

	const isValid = title.length >= SPRINT.TITLE_MIN_LENGTH && title.length <= SPRINT.TITLE_MAX_LENGTH;
	return getValidationResult(isValid, ERROR_MESSAGES.SPRINT.TITLE);
};

export const validateStartDate = ({ date }) => {
	if (!date) {
		return getValidationResult(false, ERROR_MESSAGES.SPRINT.START_DATE_REQUIRED);
	}
};

export const validateEndDate = ({ date }) => {
	if (!date) {
		return getValidationResult(false, ERROR_MESSAGES.SPRINT.END_DATE_REQUIRED);
	}
};

export const validateGoal = ({ goal }) => {
	if (!goal) {
		return true;
	}
	const isValid = goal.length >= SPRINT.GOAL_MIN_LENGTH && goal.length <= SPRINT.GOAL_MAX_LENGTH;
	return getValidationResult(isValid, ERROR_MESSAGES.SPRINT.GOAL);
};
