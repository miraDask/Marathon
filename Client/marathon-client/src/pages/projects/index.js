import React, { useState, useEffect, useContext, useCallback } from 'react';

import { getCookie } from '../../utils/cookie';

import { ProjectsContext } from '../../providers/projects-context.provider';

import { getProjects } from '../../services/projects.service';

import NoProjects from '../../components/no-projects';
import ProjectsAll from '../../components/all-projects';
import Spinner from '../../components/spinner';

const UserProjectsPage = () => {
	const [ projects, setProjects ] = useState([]);
	const [ isLoading, setLoading ] = useState(true);
	const { updatedProjects } = useContext(ProjectsContext);

	const getAllProjects = useCallback(async () => {
		const token = getCookie('x-auth-token');

		const projectsAll = await getProjects(token);
		setProjects(projectsAll);

		setLoading(false);
	}, []);

	useEffect(
		() => {
			getAllProjects();
		},
		[ getAllProjects, updatedProjects ]
	);

	if (isLoading) {
		return <Spinner color="green-400" />;
	}

	return projects.length === 0 ? <NoProjects /> : <ProjectsAll projects={projects} />;
};

export default UserProjectsPage;
