import React from 'react';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrow-thick-down.svg';
import { ReactComponent as ArrowUpIcon } from '../../assets/arrow-thick-up.svg';

const COLORS = {
	lowest: 'green-200',
	low: 'green-400',
	medium: 'orange-400',
	high: 'red-400',
	highest: 'red-700'
};

const PriorityIcon = ({ priority, size }) => {
	const getIcon = () => {
		switch (priority) {
			case 'low':
			case 'lowest':
				return <ArrowDownIcon className={`${size} rounded-full bg-${COLORS[priority]} p-1`} />;
			case 'medium':
			case 'high':
			case 'highest':
				return <ArrowUpIcon className={`${size} rounded-full bg-${COLORS[priority]} p-1`} />;
			default:
				break;
		}
	};

	return <span>{getIcon()}</span>;
};

export default PriorityIcon;
