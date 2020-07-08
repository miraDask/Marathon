import React from 'react';
import ProjectCard from '../../components/cards/project-card.component';

const ProjectsList = ({ projects }) => (
	<div className="w-full">
		{projects.map((project) => (
			<ProjectCard key={project.id} data={project.id} title={project.name} subTitle={project.key} />
		))}
	</div>
);

export default ProjectsList;
