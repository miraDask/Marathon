import React, { createContext, useState } from 'react';

const initialState = {
	teams: null,
	invitationsAreChanged: false,
	saveChangeInvitations: () => {},
	saveTeams: () => {}
};

export const TeamsContext = createContext(initialState);

const TeamsContextProvider = ({ children }) => {
	const [ teams, setTeams ] = useState(null);
	const [ invitationsAreChanged, setInvitationsAreChanged ] = useState(false);
	const saveTeams = (teams) => {
		setTeams(teams);
	};

	const saveChangeInvitations = (value) => setInvitationsAreChanged(value);
	return (
		<TeamsContext.Provider
			value={{
				teams,
				invitationsAreChanged,
				saveChangeInvitations,
				saveTeams
			}}
		>
			{children}
		</TeamsContext.Provider>
	);
};

export default TeamsContextProvider;
