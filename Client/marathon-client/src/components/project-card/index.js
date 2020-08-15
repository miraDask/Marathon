import React, { useState, useContext, Fragment } from 'react';
import useFormProcessor from '../../hooks/useFormProcessor';

import { getCookie, setCookie } from '../../utils/cookie';

import { ProjectsContext } from '../../providers/projects-context.provider';

import { deleteProject, updateProject } from '../../services/projects.service';
import { getEmptyInputsErrorsObject } from '../../utils/errors/project';
import { validateKey, validateName } from '../../utils/validations/project';

import ErrorMessageContainer from '../form-input-error-message';
import FormInput from '../form-input';
import NavLink from '../nav-link';
import CardFormContainer from '../card-form-container';
import Tag from '../tag';

const initialIsEditClicked = false;
const initialError = { name: '', key: '' };

const ProjectCard = ({ initialData }) => {
	const {
		data,
		errors,
		setErrors,
		setData,
		handleChange,
		handleOnBlur,
		handleSubmit
	} = useFormProcessor(initialError, {
		...initialData
	});
	const { currentProject, saveCurrentProject, saveUpdatedProjects } = useContext(ProjectsContext);
	const [ isEditClicked, setIsEditClicked ] = useState(initialIsEditClicked);

	const handleUpdate = async () => {
		const { name, key } = data;
		const token = getCookie('x-auth-token');

		try {
			await updateProject(initialData.id, { name, key }, token);
			saveUpdatedProjects();
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteClick = async () => {
		const token = getCookie('x-auth-token');

		try {
			var updatedToken = await deleteProject(token, initialData.id);

			if (currentProject && currentProject.id === initialData.id) {
				saveCurrentProject(null);
			}

			setCookie('x-auth-token', updatedToken);
			saveUpdatedProjects();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<CardFormContainer
			showEdit={data.isCurrentUserCreator}
			isEditClicked={isEditClicked}
			setIsEditClicked={setIsEditClicked}
			initialData={initialData}
			initialError={initialError}
			setData={setData}
			setErrors={setErrors}
			handleDeleteClick={handleDeleteClick}
			handleSubmit={(e) =>
				handleSubmit(e, getEmptyInputsErrorsObject({ name: data.name, key: data.key }), handleUpdate)}
		>
			<div className="pt-1">
				{!isEditClicked ? (
					<NavLink
						to={`/user/dashboard/${data.id}/backlog`}
						hoverColor="green-400"
						otherClasses="cursor-pointer text-xl text-gray-900 leading-tight"
					>
						{data.name}
					</NavLink>
				) : (
					<div>
						<FormInput
							autoFocus
							className="focus:outline-none p-1 pl-2 text-xl text-black leading-tight"
							type="text"
							name="name"
							value={data.name}
							onChange={handleChange}
							handleOnBlur={(event) => handleOnBlur(event, validateName, { name: data.name })}
							placeholder="Project Name"
						/>
						{errors.name ? <ErrorMessageContainer>{errors.name}</ErrorMessageContainer> : null}
					</div>
				)}

				{!isEditClicked ? (
					<Fragment>
						<p className="mt-1">{data.key}</p>
						<div>
							{data.isCurrentUserCreator ? (
								<Tag text="creator" color="orange-500" size="w-16 h-4" />
							) : (
								<Tag text="team" color="green-500" size="w-16 h-4" />
							)}
						</div>
					</Fragment>
				) : (
					<p className="mt-1">
						<FormInput
							className="focus:outline-none p-1 pl-2 text-base text-gray-600 leading-normal"
							type="text"
							name="key"
							placeholder="Key"
							value={data.key}
							handleChange={handleChange}
							handleOnBlur={(event) => handleOnBlur(event, validateKey, { key: data.key })}
						/>
						{errors.key ? <ErrorMessageContainer>{errors.key}</ErrorMessageContainer> : null}
					</p>
				)}
			</div>
		</CardFormContainer>
	);
};

export default ProjectCard;
