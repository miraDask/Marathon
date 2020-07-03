import React, { useContext, useState } from 'react';
import { Context } from '../../providers/global-context.provider';
import { loginUser } from '../../utils/user';
import { SignInContainer, TitleContainer, ButtonsContainer } from './sign-in.styles';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

const SignInPage = () => {
	const { toggleLoggedIn, saveToken } = useContext(Context);
	const [ user, setUser ] = useState('');
	const [ errors, setErrors ] = useState('');

	const handleChange = (event) => {
		const { value, name } = event.target;

		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const result = await loginUser({ ...user });

		console.log(result);
		if (result.token) {
			toggleLoggedIn(user.username);
			saveToken(result.token);
			setErrors(null);
		} else {
			setErrors(result);
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
					required
					handleOnChange={handleChange}
				/>
				<FormInput
					type="password"
					name="password"
					label="Password"
					value={user.password}
					required
					handleOnChange={handleChange}
				/>
				<ButtonsContainer>
					<CustomButton type="submit" inverted>
						Sign In
					</CustomButton>
				</ButtonsContainer>

				{errors ? Object.keys(errors).map((x) => <div>{errors[x]}</div>) : null}
			</form>
		</SignInContainer>
	);
};

export default SignInPage;
