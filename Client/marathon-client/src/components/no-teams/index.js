import React from 'react';

import NavLink from '../nav-link';
import { ReactComponent as Image } from '../../assets/watermelon-pack-illustration-14.svg';

const NoTeams = () => {
	return (
		<div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
			<Image className="lg:w-1/6 md:w-3/6 w-3/6 mb-10 object-cover object-center rounded" alt="hero" />
			<div className="text-center lg:w-2/3 w-full">
				<h4 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
					There are no teams working on this project
				</h4>
				<p className="mb-8 leading-relaxed">
					You better{' '}
					<NavLink to={'/user/team/create'} textColor="green-400">
						<span className="text-lg">Create some</span>
					</NavLink>
				</p>
			</div>
		</div>
	);
};

export default NoTeams;
