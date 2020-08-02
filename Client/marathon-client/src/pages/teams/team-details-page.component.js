import React, { useState, useEffect, useContext, useCallback } from 'react';

import { getTeamDetails } from '../../services/teams.service';

import { ProjectsContext } from '../../providers/projects-context.provider';
import { Context } from '../../providers/global-context.provider';
import { TeamsContext } from '../../providers/teams-context.provider';

import { ReactComponent as Icon } from '../../assets/awaiting-acceptance.svg';

import MainWrapper from '../../components/main/main-wrapper.component';
import InviteToTeamForm from '../../components/forms/invite-team-member-form.component';
import UserCard from '../../components/cards/user-card.component';
import NoTeamMates from '../../components/teams/no-team-mates.component';
import InfoMessageContainer from '../../components/messages/form-input-info-message.component';
import Avatar from '../../components/user/user-avatar.component';

const TeamDetailsPage = ({ match }) => {
	const [ team, setTeam ] = useState(null);
	const { currentProject } = useContext(ProjectsContext);
	const { token } = useContext(Context);
	const { invitationsAreChanged } = useContext(TeamsContext);
	const teamId = match.params.teamId;

	const getTeam = useCallback(
		async () => {
			const response = await getTeamDetails(currentProject.id, teamId, token);
			setTeam(response);
		},
		[ currentProject.id, teamId, token ]
	);

	useEffect(
		() => {
			getTeam();
		},
		[ getTeam, invitationsAreChanged ]
	);

	return (
		<MainWrapper>
			<div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
				<div className="ml-12 lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
					<InviteToTeamForm teamId={teamId} teamTitle={team ? team.title : ''} />
					<div className="flex flex-wrap sm:mx-auto sm:mb-2 mt-12">
						<InfoMessageContainer>Awaiting acceptance: </InfoMessageContainer>
						{!team ? null : team.invitations.length > 0 ? (
							team.invitations.map((x) => (
								<UserCard
									key={x.recipientEmail}
									value={`${x.recipientEmail}     ${x.declined ? 'Declined' : ''}`}
								>
									<Icon />
								</UserCard>
							))
						) : null}
					</div>
				</div>
				{/* Team members here */}
				<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
					{!team ? null : team.teamUsers.length > 0 ? (
						team.teamUsers.map((x) => (
							<UserCard key={x.id} value={x.email} valueOffset="ml-4">
								<Avatar
									bgColor="orange-400"
									size="w-8 h-8"
									user={{ fullName: x.fullName, image: x.image }}
								/>
							</UserCard>
						))
					) : (
						<NoTeamMates />
					)}
				</div>
			</div>
		</MainWrapper>
	);
};

export default TeamDetailsPage;
