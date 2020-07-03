import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../../pages/home/HomePage';
import SignUpPage from '../../pages/identity/SignUpPage';
import SignInPage from '../../pages/identity/SignInPage';
const Main = () => (
	<Switch>
		<Route exact path="/" component={HomePage} />
		<Route
			exact
			path="/signup"
			render={() => <SignUpPage />}
			// render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInPage />)}
		/>
		<Route
			exact
			path="/signin"
			render={() => <SignInPage />}
			// render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInPage />)}
		/>
	</Switch>
);

export default Main;
