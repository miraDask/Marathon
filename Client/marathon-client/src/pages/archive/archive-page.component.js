import React, { Fragment } from 'react';

import MainWrapper from '../../components/main/main-wrapper.component';
import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';
const ArchivePage = () => {
	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper />
		</Fragment>
	);
};

export default ArchivePage;
