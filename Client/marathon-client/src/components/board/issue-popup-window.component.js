import React from 'react';
import Modal from 'react-modal';

//Modal.setAppElement('#app');
const PopupWindow = ({ item, onClose, show }) => {
	return (
		<Modal isOpen={show} onRequestClose={onClose} className="" overlayClassName="">
			<div>
				<button onClick={onClose}>Close</button>
			</div>
		</Modal>
	);
};

export default PopupWindow;
