import React, { useContext } from 'react';

import { ProjectsContext } from '../../providers/projects-context.provider';

import SidebarNavItem from './sidebar-nav-item.component';

const Sidebar = ({ otherClasses }) => {
	const { currentProject } = useContext(ProjectsContext);

	return (
		<aside
			class={`${otherClasses} bg-gray-100 md:bg-gray-100 text-center md-fixed
    md-bottom-0  md:top-0 md:left-0 h-16 md:h-screen md:border-r-2 md:border-gray-300`}
		>
			<div class="md:relative mx-auto px-10 md:pt-3">
				<p>{currentProject ? currentProject.name : 'Choose Project'}</p>
			</div>
			<div class="md:relative mx-auto px-10 md:pt-6">
				<ul class="list-reset flex flex-row md:flex-col text-center md:text-left">
					<SidebarNavItem type="active">Board</SidebarNavItem>
					<SidebarNavItem type="inactive">Backlog</SidebarNavItem>
					<SidebarNavItem type="inactive">Team</SidebarNavItem>
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
/*sm-w-full md:w-1/5*/
