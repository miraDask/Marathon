import React, { createContext, useState } from 'react';

const boardIssues = localStorage.getItem('boardIssues') ? JSON.parse(localStorage.getItem('boardIssues')) : [];
const backlogIssues = localStorage.getItem('backlogIssues') ? JSON.parse(localStorage.getItem('backlogIssues')) : [];

const initialState = {
	boardIssuesCollections: boardIssues,
	backlogIssuesCollections: backlogIssues,
	creating: false,
	currentSprintId: null,
	toggleCreating: () => {},
	saveCurrentIssue: () => {},
	saveCurrentSprintId: () => {},
	updateBoardIssues: () => {},
	updateBacklogIssues: () => {}
};

export const IssuesContext = createContext(initialState);

const IssuesContextProvider = ({ children }) => {
	const [ boardIssuesCollections, setBoardIssuesCollections ] = useState(boardIssues);
	const [ backlogIssuesCollections, setBacklogIssuesCollections ] = useState(backlogIssues);

	const [ creating, setCreating ] = useState(false);
	const [ currentSprintId, setCurrentSprintId ] = useState(null);

	const toggleCreating = () => {
		setCreating(!creating);
	};

	const saveCurrentSprintId = (id) => setCurrentSprintId(id);

	const updateBoardIssues = (newIssuesList) => {
		setBoardIssuesCollections(newIssuesList);
		localStorage.setItem('boardIssues', JSON.stringify(newIssuesList));
	};

	const updateBacklogIssues = (newIssuesList) => {
		setBacklogIssuesCollections(newIssuesList);
		localStorage.setItem('backlogIssues', JSON.stringify(newIssuesList));
	};

	return (
		<IssuesContext.Provider
			value={{
				backlogIssuesCollections,
				boardIssuesCollections,
				creating,
				currentSprintId,
				updateBacklogIssues,
				updateBoardIssues,
				toggleCreating,
				saveCurrentSprintId
			}}
		>
			{children}
		</IssuesContext.Provider>
	);
};

export default IssuesContextProvider;
