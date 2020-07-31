import React, { useContext, useEffect, useState } from 'react';

import { getAllInvitations } from '../../services/invitations.service';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { Context } from '../../providers/global-context.provider';

import MainWrapper from '../../components/main/main-wrapper.component';
import InvitationCard from '../../components/cards/invitation-card.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';

const InvitationsPage = () => {
	const [ invitations, setInvitations ] = useState(null);
	const { token } = useContext(Context);

	const getInvitations = async () => {
		const response = await getAllInvitations(token);
		setInvitations(response);
		console.log('inv', response);
	};

	useEffect(() => {
		getInvitations();
	}, []);

	return (
		<MainWrapper otherClasses="pb-24">
			<div className="container px-5 py-8 mx-auto">
				<PageTopicContainer size="lg:w-2/3" title="Invitations" bottom="mb-5" />
				<div className="lg:w-2/3 flex mb-8 flex-col sm:flex-row sm:items-center items-start mx-auto">
					<div className="w-full">
						{invitations ? (
							invitations.map((invitation) => (
								<InvitationCard key={invitation.id} invitation={invitation} />
							))
						) : null}
					</div>
				</div>
			</div>
		</MainWrapper>
	);
};

export default InvitationsPage;
