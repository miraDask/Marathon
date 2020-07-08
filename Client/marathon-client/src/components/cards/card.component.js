import React, { useState } from 'react';
import { ReactComponent as EditIcon } from '../../assets/icon-edit.svg';

const initialIsEditClicked = false;

const Card = ({ title, subTitle, id }) => {
	const [ isEditClicked, setIsEditClicked ] = useState(initialIsEditClicked);

	const handleOnClick = () => {
		setIsEditClicked(!isEditClicked);
	};

	return (
		<div className="mx-auto flex p-6 bg-white rounded-lg shadow-xl mb-3 justify-between">
			<div className="pt-1">
				{!isEditClicked ? (
					<h4 className="cursor-pointer text-xl text-gray-900 leading-tight">{title}</h4>
				) : (
					<input data-id={id} className="focus:outline-none text-xl text-black leading-tight" value={title} />
				)}

				<p className="mt-1">
					{!isEditClicked ? (
						subTitle
					) : (
						<input
							data-id={id}
							class="focus:outline-none text-base text-gray-600 leading-normal"
							value={subTitle}
						/>
					)}
				</p>
			</div>
			<span className="inline-block cursor-pointer">
				<EditIcon onClick={handleOnClick} />
			</span>
		</div>
	);
};

export default Card;
