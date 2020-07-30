import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useFormProcessor from '../../hooks/useFormProcessor';

import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import { createProject } from '../../services/projects.service';
import { getEmptyInputsErrorsObject } from '../../utils/errors/project';
import { validateKey, validateName } from '../../utils/validations/project';

import ErrorMessageContainer from '../messages/form-input-error-message.component';
import InfoMessageContainer from '../messages/form-input-info-message.component';

import FormInput from '../inputs/form-input.component';
import FormButton from '../buttons/form-button.component';

const initialProject = {
	name: '',
	key: ''
};

const CreateProjectForm = () => {
	const history = useHistory();
	const { data, errors, handleChange, handleOnBlur, handleSubmit } = useFormProcessor(initialProject, initialProject);
	const { saveToken, token } = useContext(Context);
	const { updateProjects, saveHasProjects } = useContext(ProjectsContext);

	const getErrors = () => {
		const { name, key } = data;
		return getEmptyInputsErrorsObject({ name, key });
	};

	const handleCreateProject = async () => {
		const { name, key } = data;
		const result = await createProject({ name, key }, token);

		if (result.token) {
			saveToken(result.token);
			saveHasProjects();
			updateProjects({ name, key }, result.id);
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
