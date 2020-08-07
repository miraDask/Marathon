import React, { Fragment, useState, useEffect, useContext, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useHubConnection from '../../hooks/useHubConnection';

import { getTeamDetails } from '../../services/teams.service';
import { getCookie } from '../../utils/cookie';

import { ReactComponent as Icon } from '../../assets/watermelon-pack-illustration-14.svg';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { TeamsContext } from '../../providers/teams-context.provider';

import UnacceptedInvitationsList from '../../components/unaccepted-invitations-list';
import TeamMatesList from '../../components/team-mates-list';
import DashboardNavBar from '../../components/dashboard-navbar';
import MainWrapper from '../../components/main-wrapper';
import InviteToTeamForm from '../../components/invite-team-member-form';
import NoTeamMates from '../../components/no-team-mates';
import InfoMessageContainer from '../../components/form-input-info-message';
import PageTopicContainer from '../../components/page-topic-container';

const TeamDetailsPage = () => {
	const [ team, setTeam ] = useState(null);
	const { currentProject } = useContext(ProjectsContext);
	const { invitationsAreChanged } = useContext(TeamsContext);
	const { teamId, projectId } = useParams();
	const { update } = useHubConnection([ { funcName: 'UnAcceptedInvitationsUpdate' } ]);
	const history = useHistory();

	const getTeam = useCallback(
		async () => {
			const token = getCookie('x-auth-token');
			const response = await getTeamDetails(projectId, teamId, token);
			const { error } = response;
			if (error) {
				history.push('/404');
				return;
			}
			setTeam(response);
		},
		[ projectId, teamId, history ]
	);

	useEffect(
		() => {
			getTeam();
		},
		[ getTeam, invitationsAreChanged, update ]
	);

	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper otherClasses="mt-8">
				<PageTopicContainer size="lg:w-3/4" title={`Team : ${team ? team.title : ''}`} bottom="mb-2">
					{currentProject.isCreator ? <InviteToTeamForm teamId={teamId} /> : null}
				</PageTopicContainer>
				<div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
					<div className="lg:ml-12 lg:flex-grow md:w-1/2 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
						{!team ? null : team.teamUsers.length > 0 ? (
							<p className="title-font text-2xl font-medium text-gray-900">Team members:</p>
						) : null}
						{!team ? null : team.teamUsers.length > 0 ? (
							<TeamMatesList people={team.teamUsers} teamId={team.id} />
						) : (
							<NoTeamMates />
						)}
					</div>
					<div className="lg:ml-12 lg:flex-grow md:w-1/2 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
						{!team ? null : team.invitations.length > 0 ? (
							<Fragment>
								<InfoMessageContainer>Pending Invitations: </InfoMessageContainer>
								<UnacceptedInvitationsList invitations={team.invitations} />
							</Fragment>
						) : team.teamUsers.length > 0 ? (
							<Icon className="w-64 h-64 sm:ml-32 md:ml-32" />
						) : null}
					</div>
				</div>
				{/* <DeleteModal show={deleteModal} /> */}
			</MainWrapper>
		</Fragment>
	);
};

export default TeamDetailsPage;
