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
	const [ errors, setErrors ] = useState({});

	const displayServerErrors = (serverErrors) => {
		let errorsObject = {};
		Object.keys(serverErrors).forEach((key) => {
			const message = serverErrors[key][0];
			if (message.toLowerCase().includes('username')) {
				errorsObject = { ...errorsObject, username: message };
			} else if (message.toLowerCase().includes('password')) {
				errorsObject = { ...errorsObject, password: message };
			} else if (message.toLowerCase().includes('email')) {
				errorsObject = { ...errorsObject, email: message };
			}
		});
		setErrors({ ...errors, ...errorsObject });
	};

	const handleOnChange = (event) => {
		const { value, name } = event.target;
		setUser({ ...user, [name]: value });
		setErrors({ ...errors, [name]: '' });
	};

	const handleOnBlur = (event, validationFunc, data) => {
		const { name } = event.target;
		const { error } = validationFunc(data);

		if (error) {
			return setErrors({ ...errors, [name]: error });
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (Object.keys(errors).some((key) => errors[key] !== '')) {
			return;
		}

		//todo add validation for empty inputs
		const { username, email, password } = user;
		const result = await registerUser({ username, email, password });

		if (result.token) {
			toggleLoggedIn(user.username);
			saveToken(result.token);
		} else {
			displayServerErrors(result);
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
					value={user.username || ''}
					label="Username"
					//required
					error={errors.username || ''}
					handleOnBlur={(event) => handleOnBlur(event, validateUsername, { username: user.username })}
					handleOnChange={handleOnChange}
				/>
				<FormInput
					type="email"
					name="email"
					value={user.email || ''}
					label="Email"
					//required
					error={errors.email || ''}
					handleOnBlur={(event) => handleOnBlur(event, validateEmail, { email: user.email })}
					handleOnChange={handleOnChange}
				/>
				<FormInput
					type="password"
					name="password"
					value={user.password || ''}
					label="Password"
					//required
					error={errors.password || ''}
					handleOnBlur={(event) => handleOnBlur(event, validatePassword, { password: user.password })}
					handleOnChange={handleOnChange}
				/>
				<FormInput
					type="password"
					name="confirmPassword"
					value={user.confirmPassword || ''}
					label="Confirm Password"
					//required
					error={errors.confirmPassword || ''}
					handleOnBlur={(event) =>
						handleOnBlur(event, validatePasswordsMatch, {
							password: user.password,
							confirmPassword: user.confirmPassword
						})}
					handleOnChange={handleOnChange}
				/>
				<ButtonsContainer>
					<CustomButton type="submit" inverted>
						{' '}
						SIGN UP{' '}
					</CustomButton>
				</ButtonsContainer>
			</form>
		</SignUpContainer>
	);
};

export default SignUpPage;
