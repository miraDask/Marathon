import React, { useState, useContext } from 'react';
import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import { useHistory } from 'react-router-dom';
import { deleteProject, updateProject } from '../../services/projects.service';
import { getEmptyInputsErrorsObject } from '../../utils/errors/project';
import { validateKey, validateName } from '../../utils/validations/project';

import { ReactComponent as EditIcon } from '../../assets/icon-edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icon-trash.svg';
import { ReactComponent as SaveIcon } from '../../assets/icon-check-circle.svg';
import { ReactComponent as CancelIcon } from '../../assets/icon-x-circle.svg';

import ErrorMessageContainer from '../messages/form-input-error-message.component';
import FormInput from '../../components/inputs/form-input.component';
import NavLink from '../../components/navigation/nav-link.component';

const initialIsEditClicked = false;

const ProjectCard = ({ title, subTitle, data }) => {
	const history = useHistory();
	const { updateProjects, deleteFromProjects } = useContext(ProjectsContext);
	const { token } = useContext(Context);
	const [ isEditClicked, setIsEditClicked ] = useState(initialIsEditClicked);
	const [ editHidden, setEditHidden ] = useState(false);
	const [ project, setProject ] = useState({ name: title, key: subTitle });
	const [ errors, setErrors ] = useState({ name: '', key: '' });

	const handleOnBlur = (event, validationFunc, data) => {
		const { name } = event.target;
		const { error } = validationFunc(data);

		if (error) {
			return setErrors({ ...errors, [name]: error });
		}
	};

	const toggleButtons = () => {
		setIsEditClicked(!isEditClicked);
		setEditHidden(!editHidden);
	};

	const handleEditClick = () => {
		toggleButtons();
	};

	const handleUpdate = async (e) => {
		const id = e.target.id ? e.target.id : e.target.parentNode.id;
		if (Object.keys(errors).some((key) => errors[key] !== '')) {
			return;
		}

		const { name, key } = project;

		if (title === name && subTitle === key) {
			toggleButtons();
			return;
		}

		let errorsObject = getEmptyInputsErrorsObject({ name, key });
		if (Object.keys(errorsObject).some((key) => errorsObject[key] !== '')) {
			return setErrors({ ...errors, ...errorsObject });
		}

		try {
			await updateProject(id, { name, key }, token);
			updateProjects(project, id);
			toggleButtons();
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProject({ ...project, [name]: value });
		setErrors({ ...errors, [name]: '' });
	};

	const handleDeleteClick = async (e) => {
		const id = e.target.id ? e.target.id : e.target.parentNode.id;
		try {
			await deleteProject(token, id);
			deleteFromProjects(id);
			history.push('/user/projects');
		} catch (error) {
			console.log(error);
		}
	};

	const handleLinking = () => {};

	return (
		<div className="mx-auto flex p-6 bg-white rounded-lg shadow-xl mb-3 justify-between">
			<div className="pt-1">
				{!isEditClicked ? (
					<NavLink
						handleClick={handleLinking}
						hoverColor="green-400"
						otherClasses="cursor-pointer text-xl text-gray-900 leading-tight"
					>
						{title}
					</NavLink>
				) : (
					<div>
						<FormInput
							autoFocus
							className="focus:outline-none text-xl text-black leading-tight"
							type="text"
							name="name"
							value={project.name}
							onChange={handleChange}
							handleOnBlur={(event) => handleOnBlur(event, validateName, { name: project.name })}
							placeholder="Project Name"
						/>
						{errors.name ? <ErrorMessageContainer>{errors.name}</ErrorMessageContainer> : null}
					</div>
				)}

				{!isEditClicked ? (
					<p className="mt-1">subTitle</p>
				) : (
					<p className="mt-1">
						<FormInput
							className="focus:outline-none text-base text-gray-600 leading-normal"
							type="text"
							name="key"
							placeholder="Key"
							value={project.key}
							handleChange={handleChange}
							handleOnBlur={(event) => handleOnBlur(event, validateKey, { key: project.key })}
						/>
						{errors.key ? <ErrorMessageContainer>{errors.key}</ErrorMessageContainer> : null}
					</p>
				)}
			</div>
			{editHidden ? (
				<div>
					<span className="inline-block mr-2">
						<CancelIcon className="mx-1
						cursor-pointer" onClick={handleEditClick} />
					</span>
					<span className="inline-block mr-2">
						<SaveIcon id={data} className="mx-1 cursor-pointer" onClick={handleUpdate} />
					</span>
					<span className="inline-block mr-10">
						<DeleteIcon id={data} className="mx-1 cursor-pointer" onClick={handleDeleteClick} />
					</span>
				</div>
			) : (
				<span className="inline-block cursor-pointer">
					<EditIcon onClick={handleEditClick} />
				</span>
			)}
		</div>
	);
};

export default ProjectCard;
