/* eslint-disable eqeqeq */
import React, { createContext, useState } from 'react';
const currProject = localStorage.getItem('currentProject') ? JSON.parse(localStorage.getItem('currentProject')) : null;

const initialState = {
	projects: null,
	currentProject: currProject,
	updatedProjects: [],
	saveCurrentProject: () => {},
	saveProjects: () => {},
	updateProjects: () => {}
};

export const ProjectsContext = createContext(initialState);

const ProjectsContextProvider = ({ children }) => {
	const [ currentProject, setCurrentProject ] = useState(currProject);
	const [ updatedProjects, setUpdatedProjects ] = useState([]);
	const saveCurrentProject = (newProject) => {
		if (!newProject) {
			setCurrentProject(null);
			localStorage.removeItem('currentProject');
			return;
		}
		setCurrentProject(newProject);
		localStorage.setItem('currentProject', JSON.stringify(newProject));
	};

	const saveUpdatedProjects = () => setUpdatedProjects([ ...updatedProjects, 1 ]);
	return (
		<ProjectsContext.Provider
			value={{
				currentProject,
				updatedProjects,
				saveCurrentProject,
				saveUpdatedProjects
			}}
		>
			{children}
		</ProjectsContext.Provider>
	);
};

export default ProjectsContextProvider;
