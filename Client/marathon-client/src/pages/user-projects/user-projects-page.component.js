import React, { useContext } from 'react';
import { Context } from '../../providers/global-context.provider';

import NoProjects from '../../components/projects/no-projects.component';

const UserNoProjectsPage = () => {
	const { projects } = useContext(Context);

	return projects.length === 0 ? <NoProjects /> : null;
};

export default UserNoProjectsPage;
