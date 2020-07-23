import React, { createContext, useState } from 'react';

const initialState = {
	updatingSprint: false,
	currentSprint: null,
	toggleUpdatingSprint: () => {},
	saveCurrentSprint: () => {}
};

export const SprintsContext = createContext(initialState);

const SprintsContextProvider = ({ children }) => {
	const [ updatingSprint, setUpdatingSprint ] = useState(false);
	const [ currentSprint, setCurrentSprint ] = useState(null);

	const toggleUpdatingSprint = () => {
		setUpdatingSprint(!updatingSprint);
	};

	const saveCurrentSprint = (currentSprint) => setCurrentSprint(currentSprint);

	return (
		<SprintsContext.Provider
			value={{
				currentSprint,
				updatingSprint,
				toggleUpdatingSprint,
				saveCurrentSprint
			}}
		>
			{children}
		</SprintsContext.Provider>
	);
};

export default SprintsContextProvider;
