import React, { useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Context } from '../../providers/global-context.provider';
import { createProject } from '../../utils/workers/projects';
import { getEmptyInputsErrorsObject } from '../../utils/errors/project';
import { validateKey, validateName } from '../../utils/validations/project';

import ErrorMessageContainer from '../../components/messages/form-input-error-message.component';
import InfoMessageContainer from '../../components/messages/form-input-info-message.component';

import FormInput from './form-input.component';
import FormButton from './form-button.component';

const initialProject = {
	name: '',
	key: ''
};

const CreateProjectForm = () => {
	const history = useHistory();
	const { saveProject, saveToken, token } = useContext(Context);
	const [ project, setProject ] = useState(initialProject);
	const [ errors, setErrors ] = useState({ name: '', key: '' });

	const handleChange = (event) => {
		const { value, name } = event.target;
		setProject({ ...project, [name]: value });
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

		const { name, key } = project;
		let errorsObject = getEmptyInputsErrorsObject({ name, key });
		if (Object.keys(errorsObject).some((key) => errorsObject[key] !== '')) {
			return setErrors({ ...errors, ...errorsObject });
		}

		const result = await createProject({ name, key }, token);
		console.log(result);
		if (result.token) {
			saveToken(result.token);
			console.log(project);
			saveProject({ name: project.name, key: project.key });
			setErrors({ name: '', key: '' });
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
			<h2 className="text-gray-900 text-lg font-medium title-font mb-5">CREATE PROJECT</h2>
			<FormInput
				handleChange={handleChange}
				handleOnBlur={(event) => handleOnBlur(event, validateName, { name: project.name })}
				type="text"
				name="name"
				value={project.name}
				placeholder="Project Name"
			/>
			{errors.name ? <ErrorMessageContainer>{errors.name}</ErrorMessageContainer> : null}

			<FormInput
				type="text"
				name="key"
				placeholder="Key"
				value={project.key}
				handleChange={handleChange}
				handleOnBlur={(event) => handleOnBlur(event, validateKey, { key: project.key })}
			/>
			{errors.key ? (
				<ErrorMessageContainer>{errors.key}</ErrorMessageContainer>
			) : (
				<InfoMessageContainer>
					The project key is used as the prefix of your project's issue keys (e.g. 'TEST-100'). Choose one
					that is descriptive and easy to type.
				</InfoMessageContainer>
			)}
			<FormButton>SUBMIT</FormButton>
		</form>
	);
};

export default CreateProjectForm;
