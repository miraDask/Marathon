import React, { useContext } from 'react';
import { Context } from '../../providers/GlobalContextProvider';
import { fetchLoginUser } from '../../utils/user';

const SignInPage = () => {
	const { toggleLoggedIn, saveErrors, errors, saveUser, saveToken, user } = useContext(Context);

	const handleChange = (event) => {
		const { value, name } = event.target;

		saveUser({ ...user, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const result = await fetchLoginUser({ ...user });

		console.log(result);
		if (result.token) {
			toggleLoggedIn(user.username);
			saveToken(result.token);
			saveErrors(null);
		} else {
			saveErrors(result);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3>sign in</h3>
			<label for="username" />
			<input id="name" name="username" placeholder="Username" onChange={handleChange} />
			<label for="password" />
			<input id="password" name="password" placeholder="Password" onChange={handleChange} />
			<button type="submit">Click me</button>

			{errors ? Object.keys(errors).map((x) => <div>{errors[x]}</div>) : null}
		</form>
	);
};

export default SignInPage;
