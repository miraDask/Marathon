import React from 'react';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrow-thick-down.svg';
import { ReactComponent as ArrowUpIcon } from '../../assets/arrow-thick-up.svg';

const COLORS = {
	4: 'green-200',
	3: 'green-400',
	0: 'orange-400',
	2: 'red-400',
	1: 'red-700'
};

const PriorityIcon = ({ priority, size }) => {
	const getIcon = () => {
		switch (+priority) {
			case 3:
			case 4:
				return <ArrowDownIcon className={`${size} rounded-full bg-${COLORS[priority]} p-1`} />;
			case 0:
			case 2:
			case 1:
				return <ArrowUpIcon className={`${size} rounded-full bg-${COLORS[priority]} p-1`} />;
			default:
				break;
		}
	};

	return <span>{getIcon()}</span>;
};

export default PriorityIcon;
