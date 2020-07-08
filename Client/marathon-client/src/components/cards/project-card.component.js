import React, { useState, useContext } from 'react';
import { Context } from '../../providers/global-context.provider';
import { ProjectsContext } from '../../providers/projects-context.provider';

import { useHistory } from 'react-router-dom';
import { deleteProject } from '../../services/projects.service';

import { ReactComponent as EditIcon } from '../../assets/icon-edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icon-trash.svg';
import { ReactComponent as SaveIcon } from '../../assets/icon-check-circle.svg';

const initialIsEditClicked = false;

const ProjectCard = ({ title, subTitle, data }) => {
	const history = useHistory();
	const { updateProjects } = useContext(ProjectsContext);
	const { token } = useContext(Context);
	const [ isEditClicked, setIsEditClicked ] = useState(initialIsEditClicked);
	const [ editHidden, setEditHidden ] = useState(false);

	const handleEditClick = () => {
		setIsEditClicked(!isEditClicked);
		setEditHidden(!editHidden);
	};

	const handleDeleteClick = async (e) => {
		const { id } = e.target.parentNode;
		try {
			await deleteProject(token, id);
			updateProjects(id);
			history.push('/user/projects');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="mx-auto flex p-6 bg-white rounded-lg shadow-xl mb-3 justify-between">
			<div className="pt-1">
				{!isEditClicked ? (
					<h4 className="cursor-pointer text-xl text-gray-900 leading-tight">{title}</h4>
				) : (
					<div>
						<input
							data-id={data}
							className="focus:outline-none text-xl text-black leading-tight"
							value={title}
						/>
						<span className="inline-block cursor-pointer">
							<SaveIcon /*>onClick={}*/ />
						</span>
						<span id={data} className="inline-block cursor-pointer " onClick={handleDeleteClick}>
							<DeleteIcon id={data} className="ml-1" />
						</span>
					</div>
				)}

				<p className="mt-1">
					{!isEditClicked ? (
						subTitle
					) : (
						<input
							data-id={data}
							className="focus:outline-none text-base text-gray-600 leading-normal"
							value={subTitle}
						/>
					)}
				</p>
			</div>
			{editHidden ? null : (
				<span className="inline-block cursor-pointer">
					<EditIcon onClick={handleEditClick} />
				</span>
			)}
		</div>
	);
};

export default ProjectCard;
