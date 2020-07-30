import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useFormProcessor from '../../hooks/useFormProcessor';

import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import { createTeam } from '../../services/teams.service';
import { getEmptyInputsErrorsObject } from '../../utils/errors/teams';
import { validateTitle } from '../../utils/validations/teams';

import ErrorMessageContainer from '../messages/form-input-error-message.component';

import FormInput from '../inputs/form-input.component';
import FormButton from '../buttons/form-button.component';

const initialTeam = {
	title: ''
};

const CreateTeamForm = () => {
	const history = useHistory();
	const { data, errors, handleChange, handleOnBlur, handleSubmit } = useFormProcessor(initialTeam, initialTeam);
	const { token } = useContext(Context);
	const { currentProject } = useContext(ProjectsContext);

	const getErrors = () => {
		const { title } = data;
		return getEmptyInputsErrorsObject({ title });
	};

	const handleCreateTeam = async () => {
		const result = await createTeam(currentProject.id, token, { title: data.title, imageUrl: '' });
		console.log(result);
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
