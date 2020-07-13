import React, { useContext, useState } from 'react';

import { ProjectsContext } from '../../providers/projects-context.provider';

import DashboardNavItem from './dashboard-navbar-item.component';

const DashboardNavBar = ({ otherClasses }) => {
	const { currentProject } = useContext(ProjectsContext);
	const [ boardLinkIsClicked, setBoardLinkIsClicked ] = useState(false);
	const [ teamLinkIsClicked, setTeamLinkIsClicked ] = useState(false);
	const [ backlogLinkIsClicked, setBacklogLinkIsClicked ] = useState(false);

	const handleBoardLinkClick = () => {
		setBoardLinkIsClicked(true);
		setBacklogLinkIsClicked(false);
		setTeamLinkIsClicked(false);
	};

	const handleBacklogLinkClick = () => {
		setBacklogLinkIsClicked(true);
		setBoardLinkIsClicked(false);
		setTeamLinkIsClicked(false);
	};

	const handleTeamLinkClick = () => {
		setTeamLinkIsClicked(true);
		setBoardLinkIsClicked(false);
		setBacklogLinkIsClicked(false);
	};

	return (
		<div className={`${otherClasses} bg-gray-100 text-center h-10 border-b-2 border-t-1`}>
			<div className=" mx-auto px-10">
				<ul className="list-reset flex flex-row text-center">
					<DashboardNavItem type="inactive" to="/user/dashboard">
						<p>{currentProject ? currentProject.name : 'Choose Project'}</p>
					</DashboardNavItem>
					<DashboardNavItem
						handleClick={handleBoardLinkClick}
						type={boardLinkIsClicked ? 'active' : 'inactive'}
						to="/user/dashboard/board"
					>
						Board
					</DashboardNavItem>
					<DashboardNavItem
						handleClick={handleBacklogLinkClick}
						type={backlogLinkIsClicked ? 'active' : 'inactive'}
						to="/user/dashboard/backlog"
					>
						Backlog
					</DashboardNavItem>
					<DashboardNavItem
						handleClick={handleTeamLinkClick}
						type={teamLinkIsClicked ? 'active' : 'inactive'}
						to="/user/dashboard/team"
					>
						Team
					</DashboardNavItem>
				</ul>
			</div>
		</div>
	);
};

export default DashboardNavBar;
