import React from 'react';
import NavLink from '../../components/navigation/nav-link.component';
import FormButton from '../../components/forms/form-button.component';

const BacklogDndContainer = ({ onDragEnter, top, estimate, issuesCount, index, primary, children }) => {
	const title = index ? `Sprint ${+index + 1}` : 'Backlog';
	const buttonTitle = !index ? 'Add Sprint' : 'Start Sprint';
	const disabled = !primary;

	return (
		<div className={`lg:mx-24 lg:w-5/6 text-right md:w-full w-full ${top}`} onDragEnter={onDragEnter}>
			<div className="flex justify-between text-lg">
				<div className="">
					<NavLink hoverColor="green-400 font-bold">{title}</NavLink>
				</div>
				<div className="inline-flex">
					<FormButton textSize="text-sm" disabled={disabled} addClass="mb-2">
						{buttonTitle}
					</FormButton>
				</div>
			</div>
			<div className="h-full px-2 py-2 border-dashed border-2 border-gray-400 overflow-hidden text-center relative">
				{children}
			</div>
			<div className="flex justify-between mt-2">
				<div className="">
					<NavLink hoverColor="green-400">+ Create issue</NavLink>
				</div>
				<div className="inline-flex">
					{issuesCount} issue / Estimate: {estimate}
				</div>
			</div>
		</div>
	);
};

export default BacklogDndContainer;
