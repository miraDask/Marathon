import React from 'react';

import Avatar from '../../components/user/user-avatar.component';
import UserCard from '../../components/cards/user-card.component';

const TeamMatesList = ({ people }) => {
	return people.map((person) => (
		<UserCard key={person.id} id={person.id} value={person.email} valueOffset="ml-4">
			<Avatar bgColor="orange-400" size="w-8 h-8" user={{ fullName: person.fullName, image: person.image }} />
		</UserCard>
	));
};

export default TeamMatesList;
