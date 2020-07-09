import React from 'react';

import MainWrapper from '../main/maim-wrapper.component';
import NoProjects from '../../components/projects/no-projects.component';

const DashboardContent = ({ otherClasses }) => {
	return (
		<MainWrapper otherClasses={otherClasses}>
			<NoProjects />
		</MainWrapper>
	);
};

export default DashboardContent;
