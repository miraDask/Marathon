import React, { useEffect } from 'react';

import MainWrapper from '../../components/main/main-wrapper.component';
import CreateProjectForm from '../../components/forms/create-project-form.component';

const CreateProjectPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<MainWrapper otherClasses="pb-24">
			<div className="container p-16 mx-auto flex flex-wrap justify-center">
				<CreateProjectForm />
			</div>
		</MainWrapper>
	);
};

export default CreateProjectPage;
