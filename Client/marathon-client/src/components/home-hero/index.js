import React from 'react';

import { ReactComponent as HeroImage } from '../../assets/watermelon-pack-illustration-07.svg';
import NavLink from '../nav-link';
import FormButton from '../button-form';

const HomeHero = () => {
	return (
		<div className="container mx-auto flex lg:py-20 py-10 md:flex-row flex-col items-center px-16 ">
			<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center">
				<h1 className="title-font sm:text-4xl text-5xl mb-4 font-medium text-gray-900">
					Marathon
					<br className="hidden lg:inline-block" />helps you stay on track!
				</h1>
				<p className="mb-8 leading-relaxed">
					Building good project is not a matter of one sprint, but a whole marathon. Our project management
					tool is designed for agile teams to organize and prioritize their projects in a fun, flexible way.
				</p>
				<div className="flex items-center flex-wrap">
					<NavLink to="/signup">
						<FormButton>Try - It's free!</FormButton>
					</NavLink>
				</div>
			</div>
			<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
				<HeroImage className="object-cover object-center rounded" alt="hero" />
			</div>
		</div>
	);
};

export default HomeHero;
