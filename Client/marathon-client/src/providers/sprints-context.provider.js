import React, { createContext, useState } from 'react';

const sprint = localStorage.getItem('activeSprint') ? JSON.parse(localStorage.getItem('activeSprint')) : null;

const initialState = {
	completingSprint: false,
	updatingSprint: false,
	startingSprint: false,
	activeSprint: sprint,
	activeSprintId: null,
	currentSprint: null,
	saveActiveSprint: () => {},
	toggleCompletingSprint: () => {},
	toggleUpdatingSprint: () => {},
	toggleStartingSprint: () => {},
	saveCurrentSprint: () => {},
	saveActiveSprintId: () => {}
};

export const SprintsContext = createContext(initialState);

const SprintsContextProvider = ({ children }) => {
	const [ updatingSprint, setUpdatingSprint ] = useState(false);
	const [ startingSprint, setStartingSprint ] = useState(false);
	const [ completingSprint, setCompletingSprint ] = useState(false);
	const [ activeSprint, setActiveSprint ] = useState(sprint);
	const [ activeSprintId, setActiveSprintId ] = useState(null);
	const [ currentSprint, setCurrentSprint ] = useState(null);

	const toggleCompletingSprint = () => {
		setCompletingSprint(!completingSprint);
	};

	const toggleUpdatingSprint = () => {
		setUpdatingSprint(!updatingSprint);
	};

	const toggleStartingSprint = () => {
		setStartingSprint(!startingSprint);
	};

	const saveActiveSprint = (sprint) => {
		setActiveSprint(sprint);
		localStorage.setItem('activeSprint', JSON.stringify(sprint));
	};

	const saveActiveSprintId = (id) => {
		setActiveSprintId(id);
	};

	const saveCurrentSprint = (currentSprint) => setCurrentSprint(currentSprint);

	return (
		<SprintsContext.Provider
			value={{
				currentSprint,
				updatingSprint,
				startingSprint,
				activeSprint,
				activeSprintId,
				completingSprint,
				toggleCompletingSprint,
				saveActiveSprintId,
				saveActiveSprint,
				toggleUpdatingSprint,
				toggleStartingSprint,
				saveCurrentSprint
			}}
		>
			{children}
		</SprintsContext.Provider>
	);
};

export default SprintsContextProvider;
