import React, { useContext } from 'react';

import { removeFromTeam } from '../../services/teams.service';

import { ProjectsContext } from '../../providers/projects-context.provider';
import { Context } from '../../providers/global-context.provider';
import { TeamsContext } from '../../providers/teams-context.provider';

import Avatar from '../../components/user/user-avatar.component';
import UserCard from '../../components/cards/user-card.component';

const TeamMatesList = ({ people, teamId }) => {
	const { currentProject } = useContext(ProjectsContext);
	const { token } = useContext(Context);
	const { saveChangeInvitations } = useContext(TeamsContext);

	const handleRemoveFromTeam = async (id) => {
		try {
			await removeFromTeam(currentProject.id, token, teamId, { id });
			saveChangeInvitations();
		} catch (error) {
			console.log(error);
		}
	};

	return people.map((person) => (
		<UserCard
			fetchDelete={handleRemoveFromTeam}
			key={person.id}
			id={person.id}
			value={person.email}
			valueOffset="ml-4"
		>
			<Avatar bgColor="orange-400" size="w-8 h-8" user={{ fullName: person.fullName, image: person.image }} />
		</UserCard>
	));
};

export default TeamMatesList;
