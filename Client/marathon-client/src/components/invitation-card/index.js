import React, { useContext } from 'react';
import { setCookie, getCookie } from '../../utils/cookie';

import { TeamsContext } from '../../providers/teams-context.provider';

import { acceptInvitation, declineInvitation } from '../../services/invitations.service';

import { ReactComponent as DeleteIcon } from '../../assets/icon-trash.svg';
import { ReactComponent as SaveIcon } from '../../assets/icon-check-circle.svg';

const InvitationCard = ({ invitation }) => {
	const { saveChangeInvitations } = useContext(TeamsContext);
	const { senderFullName, projectName, teamName } = invitation;

	const handleSave = async () => {
		const token = getCookie('x-auth-token');

		const { id } = invitation;
		const response = await acceptInvitation(token, { invitationId: id });

		if (response) {
			setCookie('x-auth-token', response);
			saveChangeInvitations();
		}
	};

	const handleDeleteClick = async () => {
		const { id } = invitation;
		const token = getCookie('x-auth-token');

		try {
			await declineInvitation(token, { invitationId: id });
			saveChangeInvitations();
		} catch (error) {
			console.log(error);
		}
	};

	const getMessage = () => (
		<div className="pt-1">
			<span className="text-green-600">{senderFullName}</span> invited you to{' '}
			<span className="text-teal-600">{projectName}</span> project in{' '}
			<span className="text-orange-600">{teamName}</span> team.
		</div>
	);

	return (
		<div className={`mx-auto flex p-6 bg-white rounded-lg shadow-xl mb-3 justify-between`}>
			{getMessage()}
			<div>
				<span className="inline-block mr-2">
					<SaveIcon className="mx-1 cursor-pointer" onClick={handleSave} />
				</span>
				<span className="inline-block mr-10">
					<DeleteIcon className="mx-1 cursor-pointer" onClick={handleDeleteClick} />
				</span>
			</div>
		</div>
	);
};

export default InvitationCard;
