import React, { createContext, useState } from 'react';

const projectIssues = localStorage.getItem('issues') ? JSON.parse(localStorage.getItem('issues')) : [];

const initialState = {
	issues: projectIssues,
	creating: false,
	currentSprintId: null,
	toggleCreating: () => {},
	saveCurrentIssue: () => {},
	saveCurrentSprintId: () => {},
	updateIssues: () => {}
};

export const IssuesContext = createContext(initialState);

const IssuesContextProvider = ({ children }) => {
	const [ issues, setIssues ] = useState(projectIssues);
	const [ creating, setCreating ] = useState(false);
	const [ currentSprintId, setCurrentSprintId ] = useState(null);

	const toggleCreating = () => {
		setCreating(!creating);
	};

	const saveCurrentSprintId = (id) => setCurrentSprintId(id);

	const updateIssues = (newIssuesList) => setIssues(newIssuesList);

	return (
		<IssuesContext.Provider
			value={{ issues, creating, currentSprintId, updateIssues, toggleCreating, saveCurrentSprintId }}
		>
			{children}
		</IssuesContext.Provider>
	);
};

export default IssuesContextProvider;
