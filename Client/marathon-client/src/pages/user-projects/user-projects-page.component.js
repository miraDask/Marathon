import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../providers/global-context.provider';
import { useHistory } from 'react-router-dom';
import { getProjects } from '../../services/projects.service';

import NoProjects from '../../components/projects/no-projects.component';
import ProjectsAll from '../../components/projects/all-projects.component';
import Spinner from '../../components/spinner/spinner.component';

const UserNoProjectsPage = () => {
	const history = useHistory();
	const { token, toggleLoggedIn } = useContext(Context);
	const [ isLoading, setLoading ] = useState(true);
	const [ projects, setProjects ] = useState(null);

	useEffect(
		() => {
			const getAllProjects = async () => {
				const projectsAll = await getProjects(token);
				if (projectsAll) {
					projectsAll.length > 0 ? setProjects(projectsAll) : setLoading(false);
				} else {
					toggleLoggedIn();
					history.push('/');
				}
			};
			getAllProjects();
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

	return isLoading ? <Spinner color="green-400" /> : !projects ? <NoProjects /> : <ProjectsAll projects={projects} />;
};

export default UserNoProjectsPage;
