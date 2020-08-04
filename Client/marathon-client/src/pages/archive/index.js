import React, { Fragment } from 'react';

import MainWrapper from '../../components/main-wrapper';
import DashboardNavBar from '../../components/dashboard-navbar';
const ArchivePage = () => {
	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper />
		</Fragment>
	);
};

export default ArchivePage;
