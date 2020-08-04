import React from 'react';

import InfoMessageContainer from '../form-input-info-message';
import MainWrapper from '../main-wrapper';
import FormButton from '../button-form';
import NavLink from '../nav-link';
import ProjectCard from '../project-card';
import PageTopicContainer from '../page-topic-container';

const ProjectsAll = ({ projects }) => {
	return (
		<MainWrapper otherClasses="pb-24">
			<div className="container px-5 py-8 mx-auto">
				<PageTopicContainer size="lg:w-2/3" title="Projects" bottom="mb-5">
					<NavLink to="/user/projects/create">
						<FormButton>Create</FormButton>
					</NavLink>
				</PageTopicContainer>
				<InfoMessageContainer addClass="lg:w-2/3 flex mt-8 flex-col  mx-auto">
					Click on project name to open it in the backlog
				</InfoMessageContainer>
				<div className="lg:w-2/3 flex mb-8 mt-2 flex-col sm:flex-row sm:items-center items-start mx-auto">
					<div className="w-full">
						{projects.map((project) => <ProjectCard key={project.id} initialData={project} />)}
					</div>
				</div>

				<div className="lg:w-2/3 flex-grow justify-center items-center
				 text-center container mx-auto  grid row-gap-4 grid-cols-1 w-full" />
			</div>
		</MainWrapper>
	);
};

export default ProjectsAll;
