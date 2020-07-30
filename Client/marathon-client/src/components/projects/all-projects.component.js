import React, { useContext, useEffect } from 'react';
import { ProjectsContext } from '../../providers/projects-context.provider';

import InfoMessageContainer from '../messages/form-input-info-message.component';
import MainWrapper from '../main/main-wrapper.component';
import FormButton from '../../components/buttons/form-button.component';
import NavLink from '../../components/navigation/nav-link.component';
import ProjectCard from '../../components/cards/project-card.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';

const ProjectsAll = ({ projects }) => {
	const { removeHasProjects } = useContext(ProjectsContext);

	useEffect(
		() => {
			if (projects.length < 1) {
				removeHasProjects();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ projects ]
	);

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
