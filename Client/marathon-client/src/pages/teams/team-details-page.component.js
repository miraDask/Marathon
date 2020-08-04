import React, { Fragment, useState, useEffect, useContext, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getTeamDetails } from '../../services/teams.service';
import { ReactComponent as Icon } from '../../assets/watermelon-pack-illustration-14.svg';

import { ProjectsContext } from '../../providers/projects-context.provider';
import { Context } from '../../providers/global-context.provider';
import { TeamsContext } from '../../providers/teams-context.provider';

import UnacceptedInvitationsList from '../../components/invitations/unaccepted-invitations-list.component';
import TeamMatesList from '../../components/teams/team-mates-list.component';
import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';
import MainWrapper from '../../components/main/main-wrapper.component';
import InviteToTeamForm from '../../components/forms/invite-team-member-form.component';
import NoTeamMates from '../../components/teams/no-team-mates.component';
import InfoMessageContainer from '../../components/messages/form-input-info-message.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';
import DeleteModal from '../../components/modals/delete-modal.component';

const TeamDetailsPage = () => {
	const [ team, setTeam ] = useState(null);
	const { currentProject } = useContext(ProjectsContext);
	const { token, deleteModal } = useContext(Context);
	const { invitationsAreChanged } = useContext(TeamsContext);
	const { teamId, projectId } = useParams();
	const history = useHistory();

	const getTeam = useCallback(
		async () => {
			const response = await getTeamDetails(projectId, teamId, token);
			const { error } = response;
			if (error) {
				history.push('/404');
				return;
			}
			setTeam(response);
		},
		[ projectId, teamId, token, history ]
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
