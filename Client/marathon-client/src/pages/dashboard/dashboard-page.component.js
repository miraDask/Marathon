import React from 'react';

import MainWrapper from '../../components/main/maim-wrapper.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import DashboardContent from '../../components/dashboard/dashboard-content.component';

const DashboardPage = () => {
	return (
		<MainWrapper otherClasses="flex md:flex-row flex-wrap">
			<Sidebar otherClasses="w-full md:w-1/5" />
			<DashboardContent className="w-full md:w-4/5" />
		</MainWrapper>
	);
};

export default DashboardPage;
