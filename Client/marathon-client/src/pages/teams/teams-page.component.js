import React, { Fragment } from 'react';

import MainWrapper from '../../components/main/main-wrapper.component';
import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';
import NavLink from '../../components/navigation/nav-link.component';
import FormButton from '../../components/buttons/form-button.component';
import InfoMessageContainer from '../../components/messages/form-input-info-message.component';

const TeamsPage = () => {
	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper otherClasses="pb-24">
				<div className="container px-5 py-8 mx-auto">
					<PageTopicContainer size="lg:w-2/3" title="Teams" bottom="mb-5">
						<NavLink to="/user/team/create">
							<FormButton>Create</FormButton>
						</NavLink>
					</PageTopicContainer>
					<InfoMessageContainer addClass="lg:w-2/3 flex mt-8 flex-col  mx-auto">
						Click on team name to see details
					</InfoMessageContainer>
					<div className="lg:w-2/3 flex mb-8 flex-col sm:flex-row sm:items-center items-start mx-auto">
						{/* <div className="w-full">
							{projects.map((project) => <ProjectCard key={project.id} project={project} />)}
						</div> */}
					</div>

					<div className="lg:w-2/3 flex-grow justify-center items-center
				 text-center container mx-auto  grid row-gap-4 grid-cols-1 w-full" />
				</div>
			</MainWrapper>
		</Fragment>
	);
};

export default TeamsPage;
