import React from 'react';
import NavLink from '../../components/navigation/nav-link.component';

const BacklogDndContainer = ({ onDragEnter, title, top, estimate, issuesCount, children }) => {
	return (
		<div className={`lg:mx-24 lg:w-5/6 text-right md:w-full w-full ${top}`} onDragEnter={onDragEnter}>
			<h2 className="tracking-widest title-font font-medium mb-1">{title}</h2>
			<div className="h-full px-2 py-2 border-dashed border-2 border-gray-400 overflow-hidden text-center relative">
				{children}
			</div>
			<div className="flex justify-between mt-2">
				<div className="">
					<NavLink hoverColor="green-400">+ Create issue</NavLink>
				</div>
				<div className="inline-flex">
					{issuesCount} issue / Estimate: {estimate}
				</div>
			</div>
		</div>
	);
};

export default BacklogDndContainer;
