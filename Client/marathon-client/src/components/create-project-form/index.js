import React from 'react';
import { useHistory } from 'react-router-dom';
import useFormProcessor from '../../hooks/useFormProcessor';

import { setCookie, getCookie } from '../../utils/cookie';

import { createProject } from '../../services/projects.service';
import { getEmptyInputsErrorsObject } from '../../utils/errors/project';
import { validateKey, validateName } from '../../utils/validations/project';

import ErrorMessageContainer from '../form-input-error-message';
import InfoMessageContainer from '../form-input-info-message';

import FormInput from '../form-input';
import FormButton from '../button-form';

const initialProject = {
	name: '',
	key: ''
};

const CreateProjectForm = () => {
	const { data, errors, handleChange, handleOnBlur, handleSubmit } = useFormProcessor(initialProject, initialProject);
	const history = useHistory();

	const getErrors = () => {
		const { name, key } = data;
		return getEmptyInputsErrorsObject({ name, key });
	};

	const handleCreateProject = async () => {
		const token = getCookie('x-auth-token');
		const { name, key } = data;
		const result = await createProject({ name, key }, token);

		if (result.token) {
			setCookie('x-auth-token', result.token);
			history.push('/user/projects');
		}
	};

	return (
		<form
			onSubmit={(e) => handleSubmit(e, getErrors(), handleCreateProject)}
			className="lg:w-2/6 md:w-1/2 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0"
		>
			<h2 className="text-gray-900 text-lg font-medium title-font mb-5">CREATE PROJECT</h2>
			<FormInput
				handleChange={handleChange}
				handleOnBlur={(event) => handleOnBlur(event, validateName, { name: data.name })}
				type="text"
				name="name"
				value={data.name}
				placeholder="Project Name"
			/>
			{errors.name ? <ErrorMessageContainer>{errors.name}</ErrorMessageContainer> : null}

			<FormInput
				type="text"
				name="key"
				placeholder="Key"
				value={data.key}
				handleChange={handleChange}
				handleOnBlur={(event) => handleOnBlur(event, validateKey, { key: data.key })}
			/>
			{errors.key ? (
				<ErrorMessageContainer>{errors.key}</ErrorMessageContainer>
			) : (
				<InfoMessageContainer>
					The project key is used as the prefix of your project's issue keys (e.g. 'TEST-100'). Choose one
					that is descriptive and easy to type.
				</InfoMessageContainer>
			)}
			<FormButton addClass="mt-4">SUBMIT</FormButton>
		</form>
	);
};

export default CreateProjectForm;
