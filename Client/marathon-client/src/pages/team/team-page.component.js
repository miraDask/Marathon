import React, { Fragment } from 'react';

import MainWrapper from '../../components/main/main-wrapper.component';
import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';

const TeamPage = () => {
	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper otherClasses="pb-24" />
		</Fragment>
	);
};

export default TeamPage;
