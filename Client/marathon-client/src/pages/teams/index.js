import React, { Fragment, useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getCookie } from '../../utils/cookie';

import { ProjectsContext } from '../../providers/projects-context.provider';
import { TeamsContext } from '../../providers/teams-context.provider';

import { getAllTeams } from '../../services/teams.service';

import MainWrapper from '../../components/main-wrapper';
import DashboardNavBar from '../../components/dashboard-navbar';
import PageTopicContainer from '../../components/page-topic-container';
import NavLink from '../../components/nav-link';
import FormButton from '../../components/button-form';
import NoTeams from '../../components/no-teams';
import TeamCard from '../../components/team-card';
import Spinner from '../../components/spinner';

const TeamsPage = () => {
	const [ teams, setTeams ] = useState(null);
	const { currentProject } = useContext(ProjectsContext);
	const { updatedTeams } = useContext(TeamsContext);
	const { projectId } = useParams();
	const history = useHistory();

	const getTeams = useCallback(
		async () => {
			const token = getCookie('x-auth-token');
			const response = await getAllTeams(projectId, token);
			const { error } = response;
			if (error) {
				history.push('/404');
				return;
			}

			setTeams(response);
		},
		[ projectId, setTeams, history ]
	);

	useEffect(
		() => {
			getTeams();
		},
		[ getTeams, updatedTeams ]
	);

	const renderTeams = () => {
		return teams.length > 0 ? (
			<div className="lg:w-2/3 flex mb-8 flex-col sm:flex-row sm:items-center items-start mx-auto">
				<div className="w-full">{teams.map((team) => <TeamCard key={team.id} initialData={team} />)}</div>
			</div>
		) : (
			<NoTeams />
		);
	};

	if (!teams) {
		return <Spinner color="green-400" />;
	}

	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper otherClasses="pb-24">
				<div className="container px-5 py-8 mx-auto">
					<PageTopicContainer size="lg:w-2/3" title="Teams" bottom="mb-5">
						{currentProject.isCreator ? (
							<NavLink to="/user/team/create">
								<FormButton>Create</FormButton>
							</NavLink>
						) : null}
					</PageTopicContainer>
					{renderTeams()}
					<div className="lg:w-2/3 flex-grow justify-center items-center
				 text-center container mx-auto  grid row-gap-4 grid-cols-1 w-full" />
				</div>
			</MainWrapper>
		</Fragment>
	);
};

export default TeamsPage;
