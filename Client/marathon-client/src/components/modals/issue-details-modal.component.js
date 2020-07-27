import React, { useContext } from 'react';

import { Context } from '../../providers/global-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';

import ModalContainer from '../containers/modal-container.component';
import IssueForm from '../forms/issue-form.component';

const IssueDetailsModal = () => {
	const { toggleModalIsOpen } = useContext(Context);
	const { toggleUpdating, updating, saveOpenedIssue } = useContext(IssuesContext);

	const handleClose = () => {
		toggleModalIsOpen();
		toggleUpdating();
		saveOpenedIssue(null);
	};

	return (
		<ModalContainer onClose={handleClose} show={updating} addBgColor="bg-black bg-opacity-25">
			<IssueForm
				disabled={true}
				handleFetchData={null}
				formTitle="issue details"
				handleModalClose={toggleUpdating}
			/>
		</ModalContainer>
	);
};

export default IssueDetailsModal;
