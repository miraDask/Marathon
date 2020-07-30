import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
	const [ team, setTeam ] = useState(initialTeam);
	const [ errors, setErrors ] = useState({ title: '' });
	const { token } = useContext(Context);
	const { currentProject } = useContext(ProjectsContext);

	const handleChange = (event) => {
		const { value, name } = event.target;
		setTeam({ ...team, [name]: value });
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

		const { title } = team;
		let errorsObject = getEmptyInputsErrorsObject({ title });
		if (Object.keys(errorsObject).some((key) => errorsObject[key] !== '')) {
			return setErrors({ ...errors, ...errorsObject });
		}

		const result = await createTeam(currentProject.id, token, { title, imageUrl: '' });
		console.log(result);
		if (result) {
			setErrors({ title: '' });
			history.push(`/user/teams/${result}`);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="lg:w-2/6 md:w-1/2 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0"
		>
			<h2 className="text-gray-900 text-lg font-medium title-font mb-5">CREATE TEAM</h2>
			<FormInput
				handleChange={handleChange}
				handleOnBlur={(event) => handleOnBlur(event, validateTitle, { title: team.title })}
				type="text"
				name="title"
				value={team.title}
				placeholder="Team Title"
			/>
			{errors.title ? <ErrorMessageContainer>{errors.title}</ErrorMessageContainer> : null}
			<FormButton addClass="mt-4">SUBMIT</FormButton>
		</form>
	);
};

export default CreateTeamForm;
