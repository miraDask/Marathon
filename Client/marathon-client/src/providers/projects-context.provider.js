import React, { createContext, useState } from 'react';
const hasUserProjects = localStorage.getItem('hasProjects') !== null ? true : false;
const createdProjects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : null;
const currProject = localStorage.getItem('currentProject') ? JSON.parse(localStorage.getItem('currentProject')) : null;

const initialState = {
	hasProjects: hasUserProjects,
	projects: createdProjects,
	currentProject: currProject,
	saveCurrentProject: () => {},
	saveProjects: () => {},
	deleteProjects: () => {},
	deleteFromProjects: () => {},
	updateProjects: () => {},
	saveHasProjects: () => {},
	removeHasProjects: () => {}
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

	const deleteProjects = () => {
		localStorage.removeItem('projects');
	};

	const deleteFromProjects = (id) => {
		const updatedProjects = projects.filter((x) => x.id !== +id);
		setProjects(updatedProjects);
		localStorage.setItem('projects', JSON.stringify(updatedProjects));
	};

	const updateProjects = ({ name, key }, id) => {
		let updatedProjects = [];
		const newProject = { id, name, key };
		if (!projects) {
			updatedProjects = [ newProject ];
		} else {
			const filteredProjects = projects.filter((x) => x.id !== +id);
			updatedProjects = [ ...filteredProjects, newProject ];
		}

		setProjects(updatedProjects);
		localStorage.setItem('projects', JSON.stringify(updatedProjects));
	};

	const saveHasProjects = () => {
		localStorage.setItem('hasProjects', 'true');
		setHasProjects(true);
	};

	const removeHasProjects = () => {
		localStorage.removeItem('hasProjects');
		setHasProjects(false);
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
				removeHasProjects,
				saveHasProjects,
				deleteFromProjects,
				deleteProjects
			}}
		>
			{children}
		</ProjectsContext.Provider>
	);
};

export default ProjectsContextProvider;
