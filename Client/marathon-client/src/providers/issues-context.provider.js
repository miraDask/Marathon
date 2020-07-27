import React, { createContext, useState } from 'react';
import { initialStatuses } from '../data/constants';

const boardIssues = localStorage.getItem('boardIssues')
	? JSON.parse(localStorage.getItem('boardIssues'))
	: initialStatuses;
const backlogIssues = localStorage.getItem('backlogIssues') ? JSON.parse(localStorage.getItem('backlogIssues')) : [];

const initialState = {
	newAssignee: null,
	boardIssuesCollections: boardIssues,
	backlogIssuesCollections: backlogIssues,
	openedIssue: null,
	creating: false,
	updating: false,
	saveNewAssignee: () => {},
	saveOpenedIssue: () => {},
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
	const [ newAssignee, setNewAssignee ] = useState(null);
	const [ openedIssue, setOpenedIssue ] = useState(null);
	const [ creating, setCreating ] = useState(false);
	const [ updating, setUpdating ] = useState(false);

	const toggleCreating = () => {
		setCreating(!creating);
	};

	const toggleUpdating = () => {
		setUpdating(!updating);
	};

	const saveNewAssignee = (newAssignee) => setNewAssignee(newAssignee);

	const saveOpenedIssue = (issue) => setOpenedIssue(issue);

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
				openedIssue,
				newAssignee,
				saveNewAssignee,
				saveOpenedIssue,
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
