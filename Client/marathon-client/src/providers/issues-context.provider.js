import React, { createContext, useState } from 'react';
import { initialStatuses } from '../data/constants';

const boardIssues = localStorage.getItem('boardIssues')
	? JSON.parse(localStorage.getItem('boardIssues'))
	: initialStatuses;
const backlogIssues = localStorage.getItem('backlogIssues') ? JSON.parse(localStorage.getItem('backlogIssues')) : [];

const initialState = {
	boardIssuesCollections: boardIssues,
	backlogIssuesCollections: backlogIssues,
	creating: false,
	updating: false,
	toggleCreating: () => {},
	toggleUpdating: () => {},
	saveCurrentIssue: () => {},
	updateBoardIssues: () => {},
	updateBacklogIssues: () => {}
};

export const IssuesContext = createContext(initialState);

const IssuesContextProvider = ({ children }) => {
	const [ boardIssuesCollections, setBoardIssuesCollections ] = useState(boardIssues);
	const [ backlogIssuesCollections, setBacklogIssuesCollections ] = useState(backlogIssues);

	const [ creating, setCreating ] = useState(false);
	const [ updating, setUpdating ] = useState(false);

	const toggleCreating = () => {
		setCreating(!creating);
	};

	const toggleUpdating = () => {
		setUpdating(!updating);
	};

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
				updating,
				updateBacklogIssues,
				updateBoardIssues,
				toggleCreating,
				toggleUpdating
			}}
		>
			{children}
		</IssuesContext.Provider>
	);
};

export default IssuesContextProvider;
