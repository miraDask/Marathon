import React from 'react';
import Modal from 'react-modal';
import { ReactComponent as CancelIcon } from '../../assets/icon-x-circle.svg';

Modal.setAppElement('body');

const ModalContainer = ({ children, onClose, show, addBgColor }) => {
	return (
		<Modal
			className="lg:w-2/3 mx-auto my-10 bg-gray-100 border-2 overflow-y-scroll"
			isOpen={show}
			onRequestClose={onClose}
			overlayClassName={`flex justify-center fixed top-0 bottom-0 left-0 right-0 ${addBgColor}`}
		>
			<div className="flex justify-end">
				<CancelIcon id="close" className="cursor-pointer justify-end m-2" onClick={onClose} />
			</div>
			{children}
		</Modal>
	);
};

export default ModalContainer;
