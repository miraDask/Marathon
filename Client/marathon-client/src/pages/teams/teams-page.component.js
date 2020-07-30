import React, { Fragment, useState, useEffect, useContext } from 'react';

import { ProjectsContext } from '../../providers/projects-context.provider';
import { Context } from '../../providers/global-context.provider';

import { getAllTeams } from '../../services/teams.service';

import MainWrapper from '../../components/main/main-wrapper.component';
import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';
import NavLink from '../../components/navigation/nav-link.component';
import FormButton from '../../components/buttons/form-button.component';
import NoTeams from '../../components/teams/no-teams.component';
import TeamCard from '../../components/cards/team-card.component';
import Spinner from '../../components/spinner/spinner.component';

const TeamsPage = () => {
	const [ teams, setTeams ] = useState(null);
	const [ isLoading, setLoading ] = useState(true);
	const { currentProject } = useContext(ProjectsContext);
	const { token } = useContext(Context);

	useEffect(
		() => {
			const getTeams = async () => {
				const response = await getAllTeams(currentProject.id, token);
				if (response.length > 0) {
					setTeams(response);
				}
				setLoading(false);
			};

			getTeams();
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[ teams ]
	);

	const renderTeams = () => {
		return (
			<div className="lg:w-2/3 flex mb-8 flex-col sm:flex-row sm:items-center items-start mx-auto">
				<div className="w-full">
					{teams.map((team) => <TeamCard key={team.id} initialData={team} setTeams={setTeams} />)}
				</div>
			</div>
		);
	};

	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper otherClasses="pb-24">
				<div className="container px-5 py-8 mx-auto">
					<PageTopicContainer size="lg:w-2/3" title="Teams" bottom="mb-5">
						<NavLink to="/user/team/create">
							<FormButton>Create</FormButton>
						</NavLink>
					</PageTopicContainer>
					{isLoading ? <Spinner /> : teams ? renderTeams() : <NoTeams />}
					<div className="lg:w-2/3 flex-grow justify-center items-center
				 text-center container mx-auto  grid row-gap-4 grid-cols-1 w-full" />
				</div>
			</MainWrapper>
		</Fragment>
	);
};

export default TeamsPage;
