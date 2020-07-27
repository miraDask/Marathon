import React from 'react';
import { ReactComponent as BugIcon } from '../../assets/bug.svg';
import { ReactComponent as TaskIcon } from '../../assets/checkmark.svg';
import { ReactComponent as StoryIcon } from '../../assets/ticket.svg';

const IssueIcon = ({ type, size }) => {
	const getIcon = () => {
		switch (+type) {
			case 0:
				return <StoryIcon className={`${size} bg-teal-300 rounded-full p-1`} />;
			case 1:
				return <TaskIcon className={`${size} bg-blue-400 rounded-full p-1`} />;
			case 2:
				return <BugIcon className={`${size} bg-red-400 rounded-full p-1`} />;
			default:
				return null;
		}
	};

	return getIcon();
};

export default IssueIcon;
