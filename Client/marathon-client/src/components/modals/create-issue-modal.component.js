import React, { useContext } from 'react';

import { IssuesContext } from '../../providers/issues-context.provider';
import { Context } from '../../providers/global-context.provider';

import ModalContainer from '../containers/modal-container.component';
import CreateIssueForm from '../forms/create-issue-form.component';

const CreateIssueModal = () => {
	const { creating, toggleCreating } = useContext(IssuesContext);
	const { toggleModalIsOpen } = useContext(Context);

	const handleClose = () => {
		toggleCreating();
		toggleModalIsOpen();
	};

	return (
		<ModalContainer onClose={handleClose} show={creating}>
			<CreateIssueForm />
		</ModalContainer>
	);
};

export default CreateIssueModal;
