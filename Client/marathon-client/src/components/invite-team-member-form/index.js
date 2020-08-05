import React, { useContext } from 'react';
import useFormProcessor from '../../hooks/useFormProcessor';

import { getCookie } from '../../utils/cookie';
import { inviteToTeam } from '../../services/teams.service';
import { getEmptyInputsErrorsObject } from '../../utils/errors/auth';

import { TeamsContext } from '../../providers/teams-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import ErrorMessageContainer from '../form-input-error-message';
import InfoMessageContainer from '../form-input-info-message';
import FormInput from '../form-input';

const initialUser = {
	email: ''
};
const InviteToTeamForm = ({ teamId }) => {
	const { data, errors, setData, setErrors, handleChange, handleSubmit } = useFormProcessor(initialUser, initialUser);
	const { currentProject } = useContext(ProjectsContext);
	const { saveChangeInvitations } = useContext(TeamsContext);

	const getErrors = () => {
		const { email } = data;
		return getEmptyInputsErrorsObject({ email });
	};

	const handleInvite = async () => {
		const { email } = data;
		const token = getCookie('x-auth-token');
		const { error } = await inviteToTeam(currentProject.id, teamId, token, { email });

		if (error) {
			setErrors({ email: error });
		} else {
			setErrors({ email: '' });
			setData({ email: '' });
			saveChangeInvitations();
		}
	};

	return (
		<form onSubmit={(e) => handleSubmit(e, getErrors(), handleInvite)}>
			<InfoMessageContainer className="mb-2 leading-relaxed">Invite team member</InfoMessageContainer>
			<div className="flex w-full md:justify-start justify-between">
				<FormInput
					handleChange={handleChange}
					className="bg-gray-100 rounded mr-4 px-2 border border-gray-400 focus:outline-none focus:border-teal-500 text-base w-full"
					placeholder="Email"
					value={data.email}
					name="email"
					type="text"
				/>
				<button
					type="submit"
					className="inline-flex justify-end text-white bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded text-lg"
				>
					Invite
				</button>
			</div>
			{errors.email ? <ErrorMessageContainer>{errors.email}</ErrorMessageContainer> : null}
		</form>
	);
};

export default InviteToTeamForm;
