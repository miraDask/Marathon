import React, { useContext } from 'react';

import { removeFromTeam } from '../../services/teams.service';
import { getCookie } from '../../utils/cookie';

import { ProjectsContext } from '../../providers/projects-context.provider';
import { TeamsContext } from '../../providers/teams-context.provider';

import Avatar from '../avatar';
import UserCard from '../user-card';

const TeamMatesList = ({ people, teamId }) => {
	const { currentProject } = useContext(ProjectsContext);
	const { saveChangeInvitations } = useContext(TeamsContext);

	const handleRemoveFromTeam = async (id) => {
		const token = getCookie('x-auth-token');

		try {
			await removeFromTeam(currentProject.id, token, teamId, { id });
			saveChangeInvitations();
		} catch (error) {
			console.log(error);
		}
	};

	return people.map((person) => (
		<UserCard
			showDelete={currentProject.isCreator}
			fetchDelete={handleRemoveFromTeam}
			key={person.id}
			id={person.id}
			value={person.email}
			valueOffset="ml-4"
		>
			<Avatar bgColor="orange" user={person} />
		</UserCard>
	));
};

export default TeamMatesList;
