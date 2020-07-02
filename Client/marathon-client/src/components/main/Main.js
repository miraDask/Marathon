import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../../pages/home/HomePage';
import SignUpPage from '../../pages/identity/SignUpPage';
const Main = () => (
	<Switch>
		<Route exact path="/" component={HomePage} />
		<Route
			exact
			path="/signin"
			render={() => <SignUpPage />}
			// render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInPage />)}
		/>
	</Switch>
);

export default Main;
