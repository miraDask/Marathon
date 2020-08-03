import React, { Fragment, useState, useEffect, useContext, useCallback } from 'react';

import { getTeamDetails } from '../../services/teams.service';

import { ProjectsContext } from '../../providers/projects-context.provider';
import { Context } from '../../providers/global-context.provider';
import { TeamsContext } from '../../providers/teams-context.provider';

import { ReactComponent as Icon } from '../../assets/awaiting-acceptance.svg';

import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';
import MainWrapper from '../../components/main/main-wrapper.component';
import InviteToTeamForm from '../../components/forms/invite-team-member-form.component';
import UserCard from '../../components/cards/user-card.component';
import NoTeamMates from '../../components/teams/no-team-mates.component';
import InfoMessageContainer from '../../components/messages/form-input-info-message.component';
import Avatar from '../../components/user/user-avatar.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';

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
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper otherClasses="mt-8">
				<PageTopicContainer size="lg:w-2/3" title={`Team : ${team ? team.title : ''}`} bottom="mb-2">
					{currentProject.isCreator ? <InviteToTeamForm teamId={teamId} /> : null}
				</PageTopicContainer>
				<div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
					{/* Team members here */}
					<div className="lg:ml-12 lg:flex-grow md:w-1/2 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
						{!team ? null : team.teamUsers.length > 0 ? (
							<p className="title-font text-2xl font-medium text-gray-900">Team members:</p>
						) : null}
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
					<div className="lg:ml-12 lg:flex-grow md:w-1/2 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
						<div className="flex flex-wrap sm:mb-2 mt-2 ml-0">
							{!team ? null : team.invitations.length > 0 ? (
								<InfoMessageContainer>Awaiting acceptance: </InfoMessageContainer>
							) : null}
							{!team ? null : team.invitations.length > 0 ? (
								team.invitations.map((x) => (
									<UserCard
										key={x.recipientEmail}
										value={
											<div>
												{x.recipientEmail}{' '}
												{x.declined ? (
													<span className="ml-8 text-red-400">Declined</span>
												) : null}
											</div>
										}
									>
										<Icon />
									</UserCard>
								))
							) : null}
						</div>
					</div>
				</div>
			</MainWrapper>
		</Fragment>
	);
};

export default TeamDetailsPage;
