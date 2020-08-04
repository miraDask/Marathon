import React from 'react';

const StatusList = ({ title, children, onDragEnter }) => {
	return (
		<div className={`p-4 lg:w-1/4 text-right md:w-full w-full`} onDragEnter={onDragEnter}>
			<h2 className="tracking-widest title-font font-medium mb-1">{title}</h2>
			<div className="h-full bg-gray-200 px-2 py-2 rounded-lg overflow-hidden text-center relative">
				{children}
			</div>
		</div>
	);
};

export default StatusList;
