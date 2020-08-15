import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from '../../providers/global-context.provider';

import HomePage from '../../pages/home';
import HelpPage from '../../pages/help';
import SignUpPage from '../../pages/sign-up';
import SignInPage from '../../pages/sign-in';
import UserProjectsPage from '../../pages/projects';
import CreateProjectPage from '../../pages/create-project';
import CreateTeamPage from '../../pages/create-team';
import BoardPage from '../../pages/board';
import BacklogPage from '../../pages/backlog';
import TeamsPage from '../../pages/teams';
import ArchivePage from '../../pages/archive';
import InvitationsPage from '../../pages/invitations';
import TeamDetailsPage from '../../pages/team-details';
import ProfilePage from '../../pages/profile';
import ErrorPage from '../../pages/error';

const RoutesHandler = () => {
	const { isLoggedIn } = useContext(Context);

	return (
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/help" component={HelpPage} />
			<Route
				exact
				path="/user/projects"
				render={() => (isLoggedIn ? <UserProjectsPage /> : <Redirect to="/" />)}
			/>
			<Route exact path="/user/profile" render={() => (isLoggedIn ? <ProfilePage /> : <Redirect to="/" />)} />
			<Route
				exact
				path="/user/invitations"
				render={() => (isLoggedIn ? <InvitationsPage /> : <Redirect to="/" />)}
			/>
			<Route
				exact
				path="/user/projects/create"
				render={() => (isLoggedIn ? <CreateProjectPage /> : <Redirect to="/" />)}
			/>
			<Route
				exact
				path="/user/team/create"
				render={() => (isLoggedIn ? <CreateTeamPage /> : <Redirect to="/" />)}
			/>
			<Route
				exact
				path="/user/dashboard/:projectId/board"
				render={() => (isLoggedIn ? <BoardPage /> : <Redirect to="/" />)}
			/>
			<Route
				exact
				path="/user/dashboard/:projectId/backlog"
				render={() => (isLoggedIn ? <BacklogPage /> : <Redirect to="/" />)}
			/>
			<Route
				exact
				path="/user/dashboard/:projectId/teams"
				render={() => (isLoggedIn ? <TeamsPage /> : <Redirect to="/" />)}
			/>
			<Route
				exact
				path="/user/dashboard/:projectId/teams/:teamId"
				render={() => (isLoggedIn ? <TeamDetailsPage /> : <Redirect to="/" />)}
			/>
			<Route
				exact
				path="/user/dashboard/:projectId/archive"
				render={() => (isLoggedIn ? <ArchivePage /> : <Redirect to="/" />)}
			/>
			<Route exact path="/signup" render={() => (isLoggedIn ? <Redirect to="/" /> : <SignUpPage />)} />
			<Route exact path="/signin" render={() => (isLoggedIn ? <Redirect to="/" /> : <SignInPage />)} />
			<Route path="/error" component={ErrorPage} />
			<Redirect to="/error" />
		</Switch>
	);
};

export default RoutesHandler;
