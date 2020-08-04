import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import { getProjects } from '../../services/projects.service';

import NoProjects from '../../components/projects/no-projects.component';
import ProjectsAll from '../../components/projects/all-projects.component';
import Spinner from '../../components/spinner/spinner.component';

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
