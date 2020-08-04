import React from 'react';
import { ReactComponent as Done } from '../../assets/checkmark.svg';
import { ReactComponent as Account } from '../../assets/user-add.svg';
import { ReactComponent as Team } from '../../assets/user-group.svg';
import { ReactComponent as Project } from '../../assets/show-sidebar.svg';
import { ReactComponent as Enjoy } from '../../assets/mood-happy-solid.svg';

const iconTypes = {
	done: Done,
	account: Account,
	team: Team,
	project: Project,
	enjoy: Enjoy
};

const StepIconContainer = ({ name, bgColor }) => {
	const Icon = iconTypes[name];

	return (
		<div
			className={`flex-shrink-0 w-10 h-10 rounded-full bg-${bgColor} inline-flex items-center justify-center text-white relative z-10`}
		>
			<Icon viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" />
		</div>
	);
};

export default StepIconContainer;
