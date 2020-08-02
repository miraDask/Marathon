import React, { useState } from 'react';

import { ReactComponent as EditIcon } from '../../assets/icon-edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icon-trash.svg';
import { ReactComponent as SaveIcon } from '../../assets/icon-check-circle.svg';
import { ReactComponent as CancelIcon } from '../../assets/icon-x-circle.svg';

const CardFormContainer = ({
	children,
	showEdit,
	isEditClicked,
	setIsEditClicked,
	initialData,
	initialError,
	setData,
	setErrors,
	handleDeleteClick,
	handleSubmit
}) => {
	const [ editHidden, setEditHidden ] = useState(false);

	const toggleButtons = () => {
		setIsEditClicked(!isEditClicked);
		setEditHidden(!editHidden);
	};

	const handleEditClick = (e) => {
		setData(initialData);
		setErrors(initialError);
		toggleButtons();
	};

	const handleSave = async (e) => {
		const result = await handleSubmit(e);
		if (result.success) {
			toggleButtons();
		}
	};

	return (
		<div
			className={`mx-auto flex p-6 bg-${!isEditClicked
				? 'white'
				: 'orange-200'} rounded-lg shadow-xl mb-3 justify-between`}
		>
			<div className="pt-1">{children}</div>
			{showEdit ? editHidden ? (
				<div>
					<span className="inline-block mr-2">
						<CancelIcon className="mx-1
						cursor-pointer" onClick={handleEditClick} />
					</span>
					<span className="inline-block mr-2">
						<SaveIcon className="mx-1 cursor-pointer" onClick={handleSave} />
					</span>
					<span className="inline-block mr-10">
						<DeleteIcon className="mx-1 cursor-pointer" onClick={handleDeleteClick} />
					</span>
				</div>
			) : (
				<span className="inline-block cursor-pointer">
					<EditIcon onClick={handleEditClick} />
				</span>
			) : null}
		</div>
	);
};

export default CardFormContainer;
