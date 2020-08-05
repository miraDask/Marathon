import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useFormProcessor from '../../hooks/useFormProcessor';

import { getCookie } from '../../utils/cookie';

import { ProjectsContext } from '../../providers/projects-context.provider';

import { createTeam } from '../../services/teams.service';
import { getEmptyInputsErrorsObject } from '../../utils/errors/teams';
import { validateTitle } from '../../utils/validations/teams';

import ErrorMessageContainer from '../form-input-error-message';

import FormInput from '../form-input';
import FormButton from '../button-form';

const initialTeam = {
	title: ''
};

const CreateTeamForm = () => {
	const history = useHistory();
	const { data, errors, handleChange, handleOnBlur, handleSubmit } = useFormProcessor(initialTeam, initialTeam);
	const { currentProject } = useContext(ProjectsContext);

	const getErrors = () => {
		const { title } = data;
		return getEmptyInputsErrorsObject({ title });
	};

	const handleCreateTeam = async () => {
		const token = getCookie('x-auth-token');
		const result = await createTeam(currentProject.id, token, { title: data.title, imageUrl: '' });
		if (result) {
			//history.push(`/user/teams/${result}`);
			history.push(`/user/dashboard/${currentProject.id}/teams`);
		}
	};

	return (
		<form
			onSubmit={(e) => handleSubmit(e, getErrors(), handleCreateTeam)}
			className="lg:w-2/6 md:w-1/2 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0"
		>
			<h2 className="text-gray-900 text-lg font-medium title-font mb-5">CREATE TEAM</h2>
			<FormInput
				handleChange={handleChange}
				handleOnBlur={(event) => handleOnBlur(event, validateTitle, { title: data.title })}
				type="text"
				name="title"
				value={data.title}
				placeholder="Team Title"
			/>
			{errors.title ? <ErrorMessageContainer>{errors.title}</ErrorMessageContainer> : null}
			<FormButton addClass="mt-4">SUBMIT</FormButton>
		</form>
	);
};

export default CreateTeamForm;
