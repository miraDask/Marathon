import React from 'react';

import MainWrapper from '../../components/main/maim-wrapper.component';
import FormButton from '../../components/forms/form-button.component';
import NavLink from '../../components/navigation/nav-link.component';
import ProjectCard from '../../components/cards/project-card.component';

const ProjectsAll = ({ projects }) => {
	return (
		<MainWrapper otherClasses="pb-24">
			<div className="container px-5 py-8 mx-auto">
				<div className="lg:w-2/3 flex mb-8 flex-col sm:flex-row sm:items-center items-start mx-auto">
					<h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">Projects</h1>
					<NavLink to="/user/projects/create">
						<FormButton>Create</FormButton>
					</NavLink>
				</div>
				<div className="lg:w-2/3 flex mb-8 flex-col sm:flex-row sm:items-center items-start mx-auto">
					<div className="w-full">
						{projects.map((project) => (
							<ProjectCard
								key={project.id}
								data={project.id}
								title={project.name}
								subTitle={project.key}
							/>
						))}
					</div>
				</div>

				<div className="lg:w-2/3 flex-grow justify-center items-center
				 text-center container mx-auto  grid row-gap-4 grid-cols-1 w-full" />
			</div>
		</MainWrapper>
	);
};

export default ProjectsAll;
