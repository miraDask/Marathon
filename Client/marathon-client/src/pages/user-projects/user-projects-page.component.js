import React, { useContext } from 'react';
import { Context } from '../../providers/global-context.provider';

import NoProjects from '../../components/projects/no-projects.component';
import ProjectsAll from '../../components/projects/all-projects.component';

const UserNoProjectsPage = () => {
	const { projects } = useContext(Context);

	return projects.length === projects ? <NoProjects /> : <ProjectsAll />;
};

export default UserNoProjectsPage;
