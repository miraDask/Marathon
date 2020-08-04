import React, { useContext } from 'react';
import NavLink from '../nav-link';
import { ProjectsContext } from '../../providers/projects-context.provider';
import { ReactComponent as Image } from '../../assets/watermelon-pack-illustration-18.svg';

const NoActiveSprint = () => {
	const { currentProject } = useContext(ProjectsContext);

	return (
		<div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
			<Image className="lg:w-1/6 md:w-3/6 w-3/6 mb-10 object-cover object-center rounded" alt="hero" />
			<div className="text-center lg:w-2/3 w-full">
				<h4 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
					There are no active sprints
				</h4>
				<p className="mb-8 leading-relaxed">
					Start sprint in the{' '}
					<NavLink to={`/user/dashboard/${currentProject.id}/backlog`} textColor="green-400">
						<span className="text-lg">Backlog</span>
					</NavLink>
				</p>
			</div>
		</div>
	);
};

export default NoActiveSprint;
