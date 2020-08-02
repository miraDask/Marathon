import React, { createContext, useState } from 'react';

const initialState = {
	updatedTeams: [],
	invitationsAreChanged: [],
	saveChangeInvitations: () => {},
	saveUpdatedTeams: () => {}
};

export const TeamsContext = createContext(initialState);

const TeamsContextProvider = ({ children }) => {
	const [ updatedTeams, setUpdatedTeams ] = useState([]);
	const [ invitationsAreChanged, setInvitationsAreChanged ] = useState([]);
	const saveUpdatedTeams = () => setUpdatedTeams([ ...updatedTeams, 1 ]);

	const saveChangeInvitations = () => setInvitationsAreChanged([ ...invitationsAreChanged, 1 ]);
	return (
		<TeamsContext.Provider
			value={{
				updatedTeams,
				invitationsAreChanged,
				saveChangeInvitations,
				saveUpdatedTeams
			}}
		>
			{children}
		</TeamsContext.Provider>
	);
};

export default TeamsContextProvider;
