import React, { useContext, useState } from 'react';
import { Context } from '../../providers/global-context.provider';
import { loginUser } from '../../utils/user';
import { validatePassword, validateUsername } from '../../utils/validator';

import { SignInContainer, TitleContainer, ButtonsContainer } from './sign-in.styles';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

const SignInPage = () => {
	const { toggleLoggedIn, saveToken } = useContext(Context);
	const [ user, setUser ] = useState('');
	const [ errors, setErrors ] = useState({ username: '', password: '' });

	const handleChange = (event) => {
		const { value, name } = event.target;
		setUser({ ...user, [name]: value });
		setErrors({ ...errors, [name]: '' });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		let errorsObject = {};
		if (!user.username) {
			const { error } = validateUsername(user);
			errorsObject = { ...errorsObject, username: error };
		}

		if (!user.password) {
			const { error } = validatePassword(user);
			errorsObject = { ...errorsObject, password: error };
		}

		if (Object.keys(errorsObject).some((key) => errorsObject[key] !== '')) {
			return setErrors({ ...errors, ...errorsObject });
		}

		const result = await loginUser({ ...user });
		if (result.token) {
			toggleLoggedIn(user.username);
			saveToken(result.token);
			setErrors(null);
		} else {
			setErrors({ ...errors, password: 'Invalid username or password' });
		}
	};

	return (
		<SignInContainer>
			<TitleContainer>You already have an account ?</TitleContainer>
			<span>Sign in with your username and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					type="username"
					name="username"
					value={user.username}
					label="Username"
					handleOnChange={handleChange}
					error={errors.username || ''}
				/>
				<FormInput
					type="password"
					name="password"
					label="Password"
					value={user.password}
					handleOnChange={handleChange}
					error={errors.password || ''}
				/>
				<ButtonsContainer>
					<CustomButton type="submit" inverted>
						Sign In
					</CustomButton>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInPage;
