import React from 'react';
import Modal from 'react-modal';
import { ReactComponent as CancelIcon } from '../../assets/icon-x-circle.svg';
Modal.setAppElement('body');
const PopupWindow = ({ item, onClose, show }) => {
	return (
		<Modal
			className="lg:w-2/3 mx-auto my-10 bg-gray-100 border-2"
			isOpen={show}
			onRequestClose={onClose}
			overlayClassName="flex justify-center fixed top-0 bottom-0 left-0 right-0 bg-gray-600 bg-opacity-25"
		>
			<div class="flex justify-end">
				<CancelIcon className="cursor-pointer object-right-top m-2" onClick={onClose} />
			</div>
		</Modal>
	);
};

export default PopupWindow;
