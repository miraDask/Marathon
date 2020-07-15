import React, { useContext } from 'react';

import { IssuesContext } from '../../providers/issues-context.provider';
import { Context } from '../../providers/global-context.provider';

import NavLink from '../navigation/nav-link.component';
import ClearButton from '../buttons/button-clear.component';
import { ReactComponent as EditIcon } from '../../assets/icon-edit.svg';
import CreateIssueModal from '../modals/create-issue-modal.component';

const BacklogDndContainer = ({ onDragEnter, top, estimate, issuesCount, index, primary, children }) => {
	const { toggleCreating } = useContext(IssuesContext);
	const { toggleModalIsOpen } = useContext(Context);

	const title = index ? `Sprint ${+index + 1}` : 'Backlog';
	const buttonTitle = !index ? 'Add Sprint' : 'Start Sprint';
	const disabled = !primary;

	const handleCreateIssueClick = (e) => {
		e.preventDefault();
		toggleCreating();
		toggleModalIsOpen();
	};

	return (
		<div className={`lg:mx-24 lg:w-5/6 text-right md:w-full w-full ${top}`} onDragEnter={onDragEnter}>
			<div className="flex justify-between text-lg">
				<div className="">
					<NavLink hoverColor="green-400 font-bold" to="">
						{title}
					</NavLink>
				</div>
				<div className="inline-flex">
					<ClearButton textSize="text-sm" disabled={disabled} addClass="mb-2">
						{buttonTitle}
					</ClearButton>
					{disabled ? null : (
						<div className="inline-flex">
							<ClearButton textSize="text-sm" disabled={disabled} addClass="mb-2 ml-2">
								<EditIcon />
							</ClearButton>
						</div>
					)}
				</div>
			</div>
			<div className="h-full px-2 py-2 border-dashed border-2 border-gray-400 overflow-hidden text-center relative">
				{children}
			</div>
			<div className="flex justify-between mt-2">
				<div className="">
					<ClearButton onClick={handleCreateIssueClick}>+ Create issue</ClearButton>
					<CreateIssueModal />
				</div>
				<div className="inline-flex">
					{issuesCount} issue / Estimate: {estimate}
				</div>
			</div>
		</div>
	);
};

export default BacklogDndContainer;
