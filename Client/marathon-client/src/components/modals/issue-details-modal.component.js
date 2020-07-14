import React from 'react';
import ModalContainer from '../containers/modal-container.component';

const IssueDetailsModal = ({ item, onClose, show }) => {
	return (
		<ModalContainer onClose={onClose} show={show}>
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
		</ModalContainer>
	);
};

export default IssueDetailsModal;
