import React, { useState, useContext, useRef, Fragment } from 'react';
import useFormProcessor from '../../hooks/useFormProcessor';

import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import { useHistory } from 'react-router-dom';
import { deleteProject, updateProject } from '../../services/projects.service';
import { getEmptyInputsErrorsObject } from '../../utils/errors/project';
import { validateKey, validateName } from '../../utils/validations/project';

import ErrorMessageContainer from '../messages/form-input-error-message.component';
import FormInput from '../inputs/form-input.component';
import NavLink from '../navigation/nav-link.component';
import CardFormContainer from '../containers/card-form-container.component';
import ProjectRoleTag from '../../components/tags/project-role-tag.component';

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
	const { deleteFromProjects, currentProject, saveCurrentProject } = useContext(ProjectsContext);
	const { token } = useContext(Context);
	const [ isEditClicked, setIsEditClicked ] = useState(initialIsEditClicked);
	const history = useHistory();
	const dataIdRef = useRef(null);

	const saveIdRef = (id) => {
		dataIdRef.current = id;
	};

	const handleUpdate = async () => {
		const { name, key } = data;
		const id = dataIdRef.current;
		try {
			await updateProject(id, { name, key }, token);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteClick = async () => {
		const id = dataIdRef.current;
		try {
			await deleteProject(token, id);
			deleteFromProjects(id);
			if (currentProject.id === +id) {
				saveCurrentProject(null);
			}
			history.push('/user/projects');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<CardFormContainer
			id={initialData.id}
			showEdit={data.isCurrentUserCreator}
			saveIdRef={saveIdRef}
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
						<p>
							{data.isCurrentUserCreator ? (
								<ProjectRoleTag text="creator" color="orange-500" size="w-16 h-4" />
							) : (
								<ProjectRoleTag text="team" color="green-500" size="w-16 h-4" />
							)}
						</p>
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
