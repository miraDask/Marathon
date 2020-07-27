import React, { useContext } from 'react';

import { Context } from '../../providers/global-context.provider';
import { IssuesContext } from '../../providers/issues-context.provider';

import ModalContainer from '../containers/modal-container.component';
import IssueForm from '../forms/issue-form.component';

const IssueDetailsModal = ({ item }) => {
	const { toggleModalIsOpen } = useContext(Context);
	const { toggleUpdating, updating } = useContext(IssuesContext);

	const handleClose = () => {
		toggleModalIsOpen();
		toggleUpdating();
	};

	return (
		<ModalContainer onClose={handleClose} show={updating} addBgColor="bg-black bg-opacity-25">
			<IssueForm
				disabled={true}
				initialIssue={item}
				handleFetchData={null}
				formTitle="issue details"
				handleModalClose={toggleUpdating}
				buttonTitle="Edit"
			/>
		</ModalContainer>
	);
};

export default IssueDetailsModal;
