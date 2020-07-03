import React, { useContext, useState } from 'react';
import { Context } from '../../providers/global-context.provider';
import { registerUser } from '../../utils/user';
import { SignUpContainer, TitleContainer, ButtonsContainer } from './sign-up.styles';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

const SignUpPage = () => {
	const { toggleLoggedIn, saveToken } = useContext(Context);
	const [ user, setUser ] = useState('');
	const [ errors, setErrors ] = useState('');

	const handleChange = (event) => {
		const { value, name } = event.target;

		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (user.password !== user.confirmPassword) {
			setErrors([ 'Passwords should match' ]);
			return;
		}

		const result = await registerUser({ ...user });

		if (result.token) {
			toggleLoggedIn(user.username);
			saveToken(result.token);
			setErrors(null);
		} else {
			setErrors(result);
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
					handleOnChange={handleChange}
				/>
				<FormInput
					type="email"
					name="email"
					value={user.email}
					label="Email"
					required
					handleOnChange={handleChange}
				/>
				<FormInput
					type="password"
					name="password"
					value={user.password}
					label="Password"
					required
					handleOnChange={handleChange}
				/>
				<FormInput
					type="password"
					name="confirmPassword"
					value={user.confirmPassword}
					label="Confirm Password"
					required
					handleOnChange={handleChange}
				/>
				<ButtonsContainer>
					<CustomButton type="submit" inverted>
						{' '}
						SIGN UP{' '}
					</CustomButton>
				</ButtonsContainer>

				{errors ? Object.keys(errors).map((x) => <div>{errors[x]}</div>) : null}
			</form>
		</SignUpContainer>
	);
};

export default SignUpPage;
