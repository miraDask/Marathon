import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context } from '../../providers/global-context.provider';
import HomePage from '../../pages/home/homepage.component';
import SignUpPage from '../../pages/sign-up/sign-up.component';
import SignInPage from '../../pages/sign-in/sign-in.component';
const Main = () => {
	const { isLoggedIn } = useContext(Context);

	return (
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/signup" render={() => (isLoggedIn ? <Redirect to="/" /> : <SignUpPage />)} />
			<Route exact path="/signin" render={() => (isLoggedIn ? <Redirect to="/" /> : <SignInPage />)} />
		</Switch>
	);
};

export default Main;