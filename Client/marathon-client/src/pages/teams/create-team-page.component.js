import React, { useEffect } from 'react';

import MainWrapper from '../../components/main-wrapper';
import CreateTeamForm from '../../components/create-team-form';
import DashboardNavBar from '../../components/dashboard-navbar';

const CreateProjectPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<MainWrapper otherClasses="pb-24">
			<DashboardNavBar />
			<div className="container p-16 mx-auto flex flex-wrap justify-center">
				<CreateTeamForm />
			</div>
		</MainWrapper>
	);
};

export default CreateProjectPage;
