import React from 'react';

import MainWrapper from '../main/maim-wrapper.component';
import Board from '../../components/board/board.component';

const DashboardContent = ({ otherClasses }) => {
	return (
		<MainWrapper otherClasses={otherClasses}>
			<Board />
		</MainWrapper>
	);
};

export default DashboardContent;
