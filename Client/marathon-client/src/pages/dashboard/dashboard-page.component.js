import React from 'react';

import MainWrapper from '../../components/main/maim-wrapper.component';
import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';
import DashboardContent from '../../components/dashboard/dashboard-content.component';

const DashboardPage = () => {
	return (
		<MainWrapper otherClasses="">
			<DashboardNavBar otherClasses="w-full" />
			<DashboardContent />
		</MainWrapper>
	);
};

export default DashboardPage;
