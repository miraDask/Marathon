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
			overlayClassName="flex justify-center fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-25"
		>
			<div className="flex justify-end">
				<CancelIcon className="cursor-pointer justify-end m-2" onClick={onClose} />
			</div>
			<div className="lg:mb-0">
				<div className="m-8 h-full text-left">
					<div className=" p-3 object-cover object-center inline-block border-2 border-gray-200 bg-gray-100">
						{item.title}
					</div>
					<p className="leading-relaxed">
						Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1
						kinfolk.
					</p>
					<span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4" />
					<h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">{item.assignee}</h2>
					<p className="text-gray-500">UI Develeoper</p>
				</div>
			</div>
		</Modal>
	);
};

export default PopupWindow;
