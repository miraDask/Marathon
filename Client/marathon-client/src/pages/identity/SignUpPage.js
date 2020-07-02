import React, { useContext } from 'react';
import { Context } from '../../providers/GlobalContextProvider';
import { fetchRegisterUser } from '../../utils/user';

const SignInPage = () => {
	const { toggleLoggedIn, setError, registerError } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			username: document.getElementById('name').value,
			email: document.getElementById('email').value,
			password: document.getElementById('password').value
		};
		const { errors } = await fetchRegisterUser(data);
		console.log(errors);
		if (errors) {
			setError(errors);
		} else {
			toggleLoggedIn();
		}
	};

	return (
		<form>
			<h3>sign up</h3>
			<label for="username" />
			<input id="name" name="username" placeholder="Username" />
			<label for="email" />
			<input id="email" name="email" placeholder="Email" />
			<label for="password" />
			<input id="password" name="password" placeholder="Password" />
			<button onClick={handleSubmit}>Click me</button>
			<div>{registerError}</div>
		</form>
	);
};

export default SignInPage;
