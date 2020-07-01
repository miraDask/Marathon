import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../../pages/home';
const Main = () => (
	<Switch>
		<Route exact path="/" component={HomePage} />
		{/*	<Route path="/shop" component={ShopPage} />
		<Route exact path="/checkout" component={CheckoutPage} />
		<Route
			exact
			path="/signin"
			render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />)}
		/> */}
	</Switch>
);

export default Main;
