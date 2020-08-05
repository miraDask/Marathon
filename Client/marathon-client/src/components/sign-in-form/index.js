import React, { useContext } from 'react';
import useFormProcessor from '../../hooks/useFormProcessor';
import { useHistory } from 'react-router-dom';

import { setCookie } from '../../utils/cookie';

import { Context } from '../../providers/global-context.provider';
import { loginUser } from '../../services/users.service';
import { getEmptyInputsErrorsObject } from '../../utils/errors/auth';

import ErrorMessageContainer from '../form-input-error-message';
import FormInput from '../form-input';
import FormButton from '../button-form';

const initialUser = {
	email: '',
	password: ''
};

const SignInForm = () => {
	const { data, errors, setErrors, handleChange, handleSubmit } = useFormProcessor(initialUser, initialUser);
	const { toggleLoggedIn, saveUser } = useContext(Context);
	const history = useHistory();

	const getErrors = () => {
		const { email, password } = data;
		return getEmptyInputsErrorsObject({ email, password });
	};

	const handleSignIn = async () => {
		const result = await loginUser({ ...data });
		if (result.token) {
			saveUser(result.user);
			setCookie('x-auth-token', result.token);
			setErrors(initialUser);
			toggleLoggedIn(true);
			history.push('/user/projects');
		} else {
			setErrors({ ...errors, password: 'Invalid username or password' });
		}
	};

	return (
		<form
			onSubmit={(e) => handleSubmit(e, getErrors(), handleSignIn)}
			className="lg:w-2/6 md:w-1/2 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0"
		>
			<h2 className="text-gray-900 text-lg font-medium title-font mb-5">SIGN IN</h2>
			<FormInput handleChange={handleChange} type="text" name="email" value={data.email} placeholder="Email" />
			{errors.email ? <ErrorMessageContainer>{errors.email}</ErrorMessageContainer> : null}
			<FormInput
				type="password"
				name="password"
				placeholder="Password"
				value={data.password}
				handleChange={handleChange}
			/>
			{errors.password ? <ErrorMessageContainer>{errors.password}</ErrorMessageContainer> : null}
			<FormButton addClass="mt-4">SUBMIT</FormButton>
		</form>
	);
};

export default SignInForm;
