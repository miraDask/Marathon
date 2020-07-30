import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context } from '../../providers/global-context.provider';
import HomePage from '../../pages/home/homepage.component';
import HelpPage from '../../pages/help/help-page.component';
import SignUpPage from '../../pages/sign-up/sign-up-page.component';
import SignInPage from '../../pages/sign-in/sign-in-page.component';
import UserProjectsPage from '../../pages/user-projects/user-projects-page.component';
import CreateProjectPage from '../../pages/user-projects/user-create-project-page.component';
import CreateTeamPage from '../../pages/teams/create-team-page.component';
import BoardPage from '../../pages/board/board-page.component';
import BacklogPage from '../../pages/backlog/backlog-page.component';
import TeamsPage from '../../pages/teams/teams-page.component';
import ArchivePage from '../../pages/archive/archive-page.component';
import PeoplePage from '../../pages/people/people-page.component';

const Main = () => {
	const { isLoggedIn } = useContext(Context);

	return (
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/help" component={HelpPage} />
			<Route exact path="/user/projects" component={UserProjectsPage} />
			<Route exact path="/user/people" component={PeoplePage} />
			<Route exact path="/user/projects/create" component={CreateProjectPage} />
			<Route exact path="/user/team/create" component={CreateTeamPage} />
			<Route exact path="/user/dashboard/:projectId/board" component={BoardPage} />
			<Route exact path="/user/dashboard/:projectId/backlog" component={BacklogPage} />
			<Route exact path="/user/dashboard/:projectId/teams" component={TeamsPage} />
			<Route exact path="/user/dashboard/:projectId/archive" component={ArchivePage} />
			<Route exact path="/signup" render={() => (isLoggedIn ? <Redirect to="/" /> : <SignUpPage />)} />
			<Route exact path="/signin" render={() => (isLoggedIn ? <Redirect to="/" /> : <SignInPage />)} />
		</Switch>
	);
};

export default Main;
