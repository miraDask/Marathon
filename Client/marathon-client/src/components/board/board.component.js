import React from 'react';

import IssueCard from '../../components/cards/issue-card.component';

const Board = ({ number }) => {
	const items = !number ? 3 : +number;

	return (
		<div className="container px-5 py-24 mx-auto">
			<div className="flex flex-wrap m-4 md:mb-4">
				<div className={`p-4 lg:w-1/${items} text-right md:w-full w-full`}>
					<h2 className="tracking-widest title-font font-medium mb-1">TO DO</h2>
					<div className="h-full bg-gray-200 px-8 py-6 rounded-lg overflow-hidden text-center relative">
						<IssueCard />
						<IssueCard />
						<IssueCard />
						<IssueCard />
						<IssueCard />
						<IssueCard />
						<IssueCard />
						<IssueCard />
						<IssueCard />
						<IssueCard />
						<IssueCard />
					</div>
				</div>
				<div className={`p-4 lg:w-1/${items} text-right md:w-full w-full`}>
					<h2 className="tracking-widest title-font font-medium mb-1">IN PROGRESS</h2>
					<div className="h-full bg-gray-200 px-8 py-6 rounded-lg overflow-hidden text-center relative">
						<IssueCard />
						<IssueCard />
						<IssueCard />
						<IssueCard />
					</div>
				</div>
				<div className={`p-4 lg:w-1/${items} text-right md:w-full w-full`}>
					<h2 className="tracking-widest title-font font-medium mb-1">DONE</h2>
					<div className="h-full bg-gray-200 px-8 py-6 rounded-lg overflow-hidden text-center relative" />
				</div>
			</div>
		</div>
	);
};

export default Board;
