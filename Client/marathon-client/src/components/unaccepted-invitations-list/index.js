import React, { useContext } from 'react';

import { deleteInvitation } from '../../services/invitations.service';
import { getCookie } from '../../utils/cookie';

import { TeamsContext } from '../../providers/teams-context.provider';

import UserCard from '../user-card';
import { ReactComponent as Icon } from '../../assets/awaiting-acceptance.svg';

const UnacceptedInvitationsList = ({ invitations }) => {
	const { saveChangeInvitations } = useContext(TeamsContext);

	const handleDeleteInvitation = async (id) => {
		const token = getCookie('x-auth-token');

		try {
			await deleteInvitation(token, { invitationId: id });
			saveChangeInvitations();
		} catch (error) {
			console.log(error);
		}
	};

	return invitations.map((invitation) => (
		<UserCard
			showDelete={true}
			key={invitation.id}
			id={invitation.id}
			fetchDelete={handleDeleteInvitation}
			value={
				<div>
					{invitation.recipientEmail}{' '}
					{invitation.declined ? <span className="ml-2 text-red-400">Declined</span> : null}
				</div>
			}
		>
			<Icon />
		</UserCard>
	));
};

export default UnacceptedInvitationsList;
