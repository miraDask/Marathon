import React, { useContext, useState } from 'react';
import { Context } from '../../providers/global-context.provider';
import { loginUser } from '../../utils/user';
import { getEmptyInputsErrorsObject } from '../../utils/error-messages';
import ErrorMessageContainer from '../../components/messages/form-input-error-message.component';
import FormInput from './form-input.component';
import FormButton from './form-button.component';

const initialUser = {
	username: '',
	password: ''
};

const SignInForm = () => {
	const { toggleLoggedIn, saveToken } = useContext(Context);
	const [ user, setUser ] = useState(initialUser);
	const [ errors, setErrors ] = useState({ username: '', password: '' });

	const handleChange = (event) => {
		const { value, name } = event.target;
		setUser({ ...user, [name]: value });
		setErrors({ ...errors, [name]: '' });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { username, password } = user;
		let errorsObject = getEmptyInputsErrorsObject({ username, password });
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
		<form
			onSubmit={handleSubmit}
			className="lg:w-2/6 md:w-1/2 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0"
		>
			<h2 class="text-gray-900 text-lg font-medium title-font mb-5">SIGN IN</h2>
			<FormInput
				handleChange={handleChange}
				type="text"
				name="username"
				value={user.username}
				placeholder="Username"
			/>
			{errors.username ? <ErrorMessageContainer>{errors.username}</ErrorMessageContainer> : null}
			<FormInput
				type="password"
				name="password"
				placeholder="Password"
				value={user.password}
				handleChange={handleChange}
			/>
			{errors.password ? <ErrorMessageContainer>{errors.password}</ErrorMessageContainer> : null}
			<FormButton>SUBMIT</FormButton>
			{/* <p class="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p> */}
		</form>
	);
};

export default SignInForm;
