import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { ProjectsContext } from '../../providers/projects-context.provider';

import DashboardNavItem from './dashboard-navbar-item.component';

const DashboardNavBar = ({ otherClasses }) => {
	const { currentProject } = useContext(ProjectsContext);
	const [ boardLinkIsClicked, setBoardLinkIsClicked ] = useState(false);
	const [ teamLinkIsClicked, setTeamLinkIsClicked ] = useState(false);
	const [ backlogLinkIsClicked, setBacklogLinkIsClicked ] = useState(false);
	const { pathname } = useLocation();

	useEffect(
		() => {
			const splittedPath = pathname.split('/');
			const pageName = splittedPath[splittedPath.length - 1];
			switch (pageName) {
				case 'board':
					setBoardLinkIsClicked(true);
					break;
				case 'team':
					setTeamLinkIsClicked(true);
					break;
				case 'backlog':
					setBacklogLinkIsClicked(true);
					break;
				default:
					return null;
			}
		},
		[ pathname ]
	);

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
					{currentProject ? (
						<li className="mr-3 flex-1 text-center">currentProject.name</li>
					) : (
						<DashboardNavItem type="inactive" to="/user/projects">
							'Open Project
						</DashboardNavItem>
					)}

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
