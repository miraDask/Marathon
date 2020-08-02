import React, { useContext } from 'react';
import useFormProcessor from '../../hooks/useFormProcessor';

import { inviteToTeam } from '../../services/teams.service';
import { getEmptyInputsErrorsObject } from '../../utils/errors/auth';

import { TeamsContext } from '../../providers/teams-context.provider';
import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import ErrorMessageContainer from '../../components/messages/form-input-error-message.component';
import InfoMessageContainer from '../../components/messages/form-input-info-message.component';
import FormInput from '../inputs/form-input.component';

const initialUser = {
	email: ''
};
const InviteToTeamForm = ({ teamId, teamTitle }) => {
	const { data, errors, setData, setErrors, handleChange, handleSubmit } = useFormProcessor(initialUser, initialUser);
	const { token } = useContext(Context);
	const { currentProject } = useContext(ProjectsContext);
	const { saveChangeInvitations } = useContext(TeamsContext);

	const getErrors = () => {
		const { email } = data;
		return getEmptyInputsErrorsObject({ email });
	};

	const handleInvite = async () => {
		const { email } = data;
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
			<h4 className="title-font sm:text-4xl text-4xl mb-4 font-medium text-gray-900">Team : {teamTitle}</h4>
			<InfoMessageContainer className="mb-2 leading-relaxed">Invite team member</InfoMessageContainer>
			<div className="flex w-full md:justify-start justify-between">
				<FormInput
					handleChange={handleChange}
					className="bg-gray-100 rounded mr-4 px-2 border border-gray-400 focus:outline-none focus:border-teal-500 text-base lg:w-full xl:w-1/2 w-full md:w-full"
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
