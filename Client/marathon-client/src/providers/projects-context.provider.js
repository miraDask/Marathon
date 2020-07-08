import React, { createContext, useState } from 'react';
const hasUserProjects = localStorage.getItem('hasProjects') !== null ? true : false;
const createdProjects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : null;
const currProject = localStorage.getItem('currentProject') ? localStorage.getItem('currentProject') : null;

const initialState = {
	hasProjects: hasUserProjects,
	projects: createdProjects,
	currentProject: currProject,
	saveCurrentProject: () => {},
	saveProjects: () => {},
	updateProjects: () => {},
	toggleHasProjects: () => {}
};

export const ProjectsContext = createContext(initialState);

const ProjectsContextProvider = ({ children }) => {
	const [ currentProject, setCurrentProject ] = useState(currProject);
	const [ projects, setProjects ] = useState(createdProjects);
	const [ hasProjects, setHasProjects ] = useState(hasUserProjects);

	const saveCurrentProject = (newProject) => setCurrentProject(newProject);
	const saveProjects = (projects) => {
		setProjects(projects);
		localStorage.setItem('projects', JSON.stringify(projects));
	};
	const updateProjects = (id) => {
		const updatedProjects = projects.filter((x) => x.id !== +id);
		setProjects(updatedProjects);
		localStorage.setItem('projects', JSON.stringify(updatedProjects));
	};

	const toggleHasProjects = () => {
		if (!hasProjects) {
			localStorage.setItem('hasProjects', 'true');
		} else {
			localStorage.removeItem('hasProjects');
		}
		setHasProjects(!hasProjects);
	};

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				hasProjects,
				currentProject,
				saveCurrentProject,
				saveProjects,
				updateProjects,
				toggleHasProjects
			}}
		>
			{children}
		</ProjectsContext.Provider>
	);
};

export default ProjectsContextProvider;
