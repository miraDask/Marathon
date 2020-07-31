import React, { createContext, useState } from 'react';

const initialState = {
	teams: null,
	saveTeams: () => {}
};

export const TeamsContext = createContext(initialState);

const TeamsContextProvider = ({ children }) => {
	const [ teams, setTeams ] = useState(null);

	const saveTeams = (teams) => {
		setTeams(teams);
	};

	return (
		<TeamsContext.Provider
			value={{
				teams,
				saveTeams
			}}
		>
			{children}
		</TeamsContext.Provider>
	);
};

export default TeamsContextProvider;
