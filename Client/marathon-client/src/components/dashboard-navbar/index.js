/* eslint-disable default-case */
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { ProjectsContext } from '../../providers/projects-context.provider';

import DashboardNavItem from '../dashboard-navbar-item';

const DashboardNavBar = ({ otherClasses }) => {
	const { currentProject } = useContext(ProjectsContext);
	const [ boardLinkIsClicked, setBoardLinkIsClicked ] = useState(false);
	const [ teamLinkIsClicked, setTeamLinkIsClicked ] = useState(false);
	const [ backlogLinkIsClicked, setBacklogLinkIsClicked ] = useState(false);
	const [ archiveLinkIsClicked, setArchiveLinkIsClicked ] = useState(false);
	const { pathname } = useLocation();
	const { projectId } = useParams();
	const id = currentProject ? currentProject.id : projectId;
	useEffect(
		() => {
			const splittedPath = pathname.split('/');
			const pageName = splittedPath[splittedPath.length - 1];
			switch (pageName) {
				case 'board':
					setBoardLinkIsClicked(true);
					break;
				case 'teams':
				case 'create':
					setTeamLinkIsClicked(true);
					break;
				case 'backlog':
					setBacklogLinkIsClicked(true);
					break;
				case 'archive':
					setArchiveLinkIsClicked(true);
					break;
			}
		},
		[ pathname ]
	);

	// const handleArchiveLinkClick = () => {
	// 	setArchiveLinkIsClicked(true);
	// 	setBoardLinkIsClicked(false);
	// 	setBacklogLinkIsClicked(false);
	// 	setTeamLinkIsClicked(false);
	// };

	const handleBoardLinkClick = () => {
		setBoardLinkIsClicked(true);
		setBacklogLinkIsClicked(false);
		setTeamLinkIsClicked(false);
		setArchiveLinkIsClicked(false);
	};

	const handleBacklogLinkClick = () => {
		setBacklogLinkIsClicked(true);
		setBoardLinkIsClicked(false);
		setTeamLinkIsClicked(false);
		setArchiveLinkIsClicked(false);
	};

	const handleTeamLinkClick = () => {
		setTeamLinkIsClicked(true);
		setBoardLinkIsClicked(false);
		setBacklogLinkIsClicked(false);
		setArchiveLinkIsClicked(false);
	};

	return (
		<div className={`${otherClasses} bg-gray-100 text-center h-10 border-b-2 border-t-1`}>
			<div className=" mx-auto px-10">
				<ul className="list-reset flex flex-row text-center">
					<DashboardNavItem
						handleClick={handleBoardLinkClick}
						type={boardLinkIsClicked ? 'active' : 'inactive'}
						to={`/user/dashboard/${id}/board`}
					>
						Board
					</DashboardNavItem>
					<DashboardNavItem
						handleClick={handleBacklogLinkClick}
						type={backlogLinkIsClicked ? 'active' : 'inactive'}
						to={`/user/dashboard/${id}/backlog`}
					>
						Backlog
					</DashboardNavItem>

					<DashboardNavItem
						handleClick={handleTeamLinkClick}
						type={teamLinkIsClicked ? 'active' : 'inactive'}
						to={`/user/dashboard/${id}/teams`}
					>
						Teams
					</DashboardNavItem>

					{/* <DashboardNavItem
						handleClick={handleArchiveLinkClick}
						type={archiveLinkIsClicked ? 'active' : 'inactive'}
						to={`/user/dashboard/${id}/archive`}
					>
						Archive
					</DashboardNavItem> */}
				</ul>
			</div>
		</div>
	);
};

export default DashboardNavBar;
