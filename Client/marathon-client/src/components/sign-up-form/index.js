import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useFormProcessor from '../../hooks/useFormProcessor';

import { setCookie } from '../../utils/cookie';
import { registerUser } from '../../services/users.service';

import { Context } from '../../providers/global-context.provider';
import {
	validatePassword,
	validateConfirmPassword,
	validateUsername,
	validateEmail,
	validateFirstName,
	validateLastName
} from '../../utils/validations/auth';
import { getServerErrorsObject, getEmptyInputsErrorsObject } from '../../utils/errors/auth';
import ErrorMessageContainer from '../form-input-error-message';
import FormInput from '../form-input';
import FormButton from '../button-form';

const initialUser = {
	firstName: '',
	lastName: '',
	username: '',
	email: '',
	password: '',
	confirmPassword: ''
};

const SignUpForm = ({ classes, ...otherProps }) => {
	const { data, errors, setErrors, handleChange, handleOnBlur, handleSubmit } = useFormProcessor({}, initialUser);
	const { toggleLoggedIn, saveUser } = useContext(Context);
	const history = useHistory();

	const handleSignUp = async () => {
		const { firstName, lastName, username, email, password } = data;
		const fullName = `${firstName} ${lastName}`;
		const result = await registerUser({ fullName, username, email, password });

		if (result.token) {
			saveUser(result.user);
			setCookie('x-auth-token', result.token);
			toggleLoggedIn(true);
			setErrors(initialUser);
			history.push('/user/projects');
		} else {
			const errorsObject = getServerErrorsObject(result);
			setErrors({ ...errors, ...errorsObject });
		}
	};

	return (
		<form
			onSubmit={(e) => handleSubmit(e, getEmptyInputsErrorsObject({ ...data }), handleSignUp)}
			className={`lg:w-2/6 md:w-1/2 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0 ${classes}`}
			{...otherProps}
		>
			<h2 className="text-gray-900 text-lg font-medium title-font mb-5">SIGN UP</h2>
			<FormInput
				type="text"
				name="firstName"
				value={data.firstName}
				placeholder="First Name"
				handleOnBlur={(event) => handleOnBlur(event, validateFirstName, { firstName: data.firstName })}
				handleChange={handleChange}
			/>
			{errors.firstName ? <ErrorMessageContainer>{errors.firstName}</ErrorMessageContainer> : null}

			<FormInput
				type="text"
				name="lastName"
				value={data.lastName}
				placeholder="Last Name"
				handleOnBlur={(event) => handleOnBlur(event, validateLastName, { lastName: data.lastName })}
				handleChange={handleChange}
			/>
			{errors.lastName ? <ErrorMessageContainer>{errors.lastName}</ErrorMessageContainer> : null}

			<FormInput
				type="text"
				name="username"
				value={data.username}
				placeholder="Username"
				handleOnBlur={(event) => handleOnBlur(event, validateUsername, { username: data.username })}
				handleChange={handleChange}
			/>
			{errors.username ? <ErrorMessageContainer>{errors.username}</ErrorMessageContainer> : null}

			<FormInput
				type="email"
				name="email"
				value={data.email}
				placeholder="Email"
				handleOnBlur={(event) => handleOnBlur(event, validateEmail, { email: data.email })}
				handleChange={handleChange}
			/>
			{errors.email ? <ErrorMessageContainer>{errors.email}</ErrorMessageContainer> : null}

			<FormInput
				type="password"
				name="password"
				value={data.password}
				placeholder="Password"
				handleOnBlur={(event) => handleOnBlur(event, validatePassword, { password: data.password })}
				handleChange={handleChange}
			/>
			{errors.password ? <ErrorMessageContainer>{errors.password}</ErrorMessageContainer> : null}

			<FormInput
				type="password"
				name="confirmPassword"
				value={data.confirmPassword}
				placeholder="Confirm Password"
				handleOnBlur={(event) =>
					handleOnBlur(event, validateConfirmPassword, {
						password: data.password,
						confirmPassword: data.confirmPassword
					})}
				handleChange={handleChange}
			/>
			{errors.confirmPassword ? <ErrorMessageContainer>{errors.confirmPassword}</ErrorMessageContainer> : null}

			<FormButton addClass="mt-4">SUBMIT</FormButton>
		</form>
	);
};

export default SignUpForm;
