import React, { createContext, useState } from 'react';

const projectIssues = localStorage.getItem('issues') ? JSON.parse(localStorage.getItem('issues')) : [];

const initialState = {
	issues: projectIssues,
	creating: false,
	toggleCreating: () => {},
	saveCurrentIssue: () => {},
	updateIssues: () => {}
};

export const IssuesContext = createContext(initialState);

const IssuesContextProvider = ({ children }) => {
	const [ issues, setIssues ] = useState(projectIssues);
	const [ creating, setCreating ] = useState(false);

	const toggleCreating = () => {
		setCreating(!creating);
	};

	const updateIssues = (newIssuesList) => setIssues(newIssuesList);

	return (
		<IssuesContext.Provider value={{ issues, creating, updateIssues, toggleCreating }}>
			{children}
		</IssuesContext.Provider>
	);
};

export default IssuesContextProvider;
