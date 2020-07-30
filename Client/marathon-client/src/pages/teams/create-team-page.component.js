import React, { useEffect } from 'react';

import MainWrapper from '../../components/main/main-wrapper.component';
import CreateTeamForm from '../../components/forms/create-team-form.component';
import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';

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
