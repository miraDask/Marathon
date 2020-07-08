import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import { useHistory } from 'react-router-dom';
import { getProjects } from '../../services/projects.service';

import NoProjects from '../../components/projects/no-projects.component';
import ProjectsAll from '../../components/projects/all-projects.component';
import Spinner from '../../components/spinner/spinner.component';

const UserProjectsPage = () => {
	const history = useHistory();
	const { token, toggleLoggedIn } = useContext(Context);
	const { saveProjects, hasProjects, projects } = useContext(ProjectsContext);
	const [ isLoading, setLoading ] = useState(true);

	useEffect(
		() => {
			const getAllProjects = async () => {
				const projectsAll = await getProjects(token);
				if (!projectsAll) {
					toggleLoggedIn();
					history.push('/');
				}

				if (projectsAll.length > 0) {
					saveProjects(projectsAll);
				}
				//setLoading(false);
			};

			if (!projects) {
				getAllProjects();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	useEffect(
		() => {
			if (projects) {
				setLoading(false);
			}
		},
		[ projects ]
	);

	return isLoading ? (
		<Spinner color="green-400" />
	) : !hasProjects ? (
		<NoProjects />
	) : (
		<ProjectsAll projects={projects} />
	);
};

export default UserProjectsPage;
