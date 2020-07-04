import React, { useContext, useState } from 'react';
import { Context } from '../../providers/global-context.provider';
import { registerUser } from '../../utils/user';
import { validatePassword, validatePasswordsMatch, validateUsername, validateEmail } from '../../utils/validator';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { SignUpContainer, TitleContainer, ButtonsContainer } from './sign-up.styles';

const SignUpPage = () => {
	const { toggleLoggedIn, saveToken } = useContext(Context);
	const [ user, setUser ] = useState('');
	const [ serverErrors, setServerErrors ] = useState('');
	const [ usernameError, setUsernameError ] = useState('');
	const [ emailError, setEmailError ] = useState('');
	const [ passwordError, setPasswordError ] = useState('');
	const [ passwordConfirmError, setPasswordConfirmError ] = useState('');

	const handleOnChange = (event) => {
		const { value, name } = event.target;
		setUser({ ...user, [name]: value });
	};

	const handleOnBlur = (validationFunc, data, setFunc) => {
		const { error } = validationFunc(data);

		if (error) {
			return setFunc(error);
		}

		setFunc('');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (passwordConfirmError || passwordError || emailError || usernameError) {
			return;
		}

		const { username, email, password } = user;
		const result = await registerUser({ username, email, password });

		if (result.token) {
			toggleLoggedIn(user.username);
			saveToken(result.token);
			setServerErrors(null);
		} else {
			setServerErrors(result);
		}
	};

	return (
		<SignUpContainer>
			<TitleContainer>You don't have an account ?</TitleContainer>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="username"
					value={user.username}
					label="Username"
					required
					error={usernameError}
					handleOnBlur={() => handleOnBlur(validateUsername, { username: user.username }, setUsernameError)}
					handleOnChange={handleOnChange}
				/>
				<FormInput
					type="email"
					name="email"
					value={user.email}
					label="Email"
					required
					error={emailError}
					handleOnBlur={() => handleOnBlur(validateEmail, { email: user.email }, setEmailError)}
					handleOnChange={handleOnChange}
				/>
				<FormInput
					type="password"
					name="password"
					value={user.password}
					label="Password"
					required
					error={passwordError}
					handleOnBlur={() => handleOnBlur(validatePassword, { password: user.password }, setPasswordError)}
					handleOnChange={handleOnChange}
				/>
				<FormInput
					type="password"
					name="confirmPassword"
					value={user.confirmPassword}
					label="Confirm Password"
					required
					error={passwordConfirmError}
					handleOnBlur={() =>
						handleOnBlur(
							validatePasswordsMatch,
							{ password: user.password, confirmPassword: user.confirmPassword },
							setPasswordConfirmError
						)}
					handleOnChange={handleOnChange}
				/>
				<ButtonsContainer>
					<CustomButton type="submit" inverted>
						{' '}
						SIGN UP{' '}
					</CustomButton>
				</ButtonsContainer>
				{serverErrors ? Object.keys(serverErrors).map((x) => <div>{serverErrors[x]}</div>) : null}
			</form>
		</SignUpContainer>
	);
};

export default SignUpPage;
