import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import { getProjects } from '../../services/projects.service';

import NoProjects from '../../components/no-projects';
import ProjectsAll from '../../components/all-projects';
import Spinner from '../../components/spinner';

const UserProjectsPage = () => {
	const [ projects, setProjects ] = useState(null);
	const [ isLoading, setLoading ] = useState(true);
	const { token } = useContext(Context);
	const { updatedProjects } = useContext(ProjectsContext);

	const getAllProjects = useCallback(
		async () => {
			const projectsAll = await getProjects(token);

			if (projectsAll.length > 0) {
				setProjects(projectsAll);
			}
			setLoading(false);
		},
		[ token ]
	);

	useEffect(
		() => {
			getAllProjects();
		},
		[ getAllProjects, updatedProjects ]
	);

	if (isLoading) {
		return <Spinner color="green-400" />;
	}

	return !projects ? <NoProjects /> : <ProjectsAll projects={projects} />;
};

export default UserProjectsPage;
