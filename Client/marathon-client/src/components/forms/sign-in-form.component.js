import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { loginUser } from '../../services/users.service';
import { getEmptyInputsErrorsObject } from '../../utils/errors/auth';

import ErrorMessageContainer from '../../components/messages/form-input-error-message.component';
import FormInput from './form-input.component';
import FormButton from './form-button.component';

const initialUser = {
	email: '',
	password: ''
};

const SignInForm = () => {
	const history = useHistory();
	const { toggleLoggedIn, saveToken } = useContext(Context);
	const { toggleHasProjects } = useContext(ProjectsContext);

	const [ user, setUser ] = useState(initialUser);
	const [ errors, setErrors ] = useState({ username: '', password: '' });

	const handleChange = (event) => {
		const { value, name } = event.target;
		setUser({ ...user, [name]: value });
		setErrors({ ...errors, [name]: '' });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { email, password } = user;
		let errorsObject = getEmptyInputsErrorsObject({ email, password });
		if (Object.keys(errorsObject).some((key) => errorsObject[key] !== '')) {
			return setErrors({ ...errors, ...errorsObject });
		}

		const result = await loginUser({ ...user });
		if (result.token) {
			toggleLoggedIn(result.fullName);
			saveToken(result.token);
			setErrors(null);

			if (result.hasProjects) {
				toggleHasProjects();
			}

			history.push('/user/dashboard');
		} else {
			setErrors({ ...errors, password: 'Invalid username or password' });
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="lg:w-2/6 md:w-1/2 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0"
		>
			<h2 className="text-gray-900 text-lg font-medium title-font mb-5">SIGN IN</h2>
			<FormInput handleChange={handleChange} type="text" name="email" value={user.email} placeholder="Email" />
			{errors.email ? <ErrorMessageContainer>{errors.email}</ErrorMessageContainer> : null}
			<FormInput
				type="password"
				name="password"
				placeholder="Password"
				value={user.password}
				handleChange={handleChange}
			/>
			{errors.password ? <ErrorMessageContainer>{errors.password}</ErrorMessageContainer> : null}
			<FormButton>SUBMIT</FormButton>
		</form>
	);
};

export default SignInForm;
