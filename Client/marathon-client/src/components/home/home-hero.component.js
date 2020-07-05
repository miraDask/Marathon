import React from 'react';
import { ReactComponent as HeroImage } from '../../assets/watermelon-pack-illustration-07.svg';
import NavLink from '../../components/navigation/nav-link.component';
import FormButton from '../../components/forms/form-button.component';
const HomeHero = () => {
	return (
		<div className="container mx-auto flex py-20 md:flex-row flex-col items-center px-16 ">
			<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center">
				<h1 className="title-font sm:text-4xl text-5xl mb-4 font-medium text-gray-900">
					Marathon
					<br className="hidden lg:inline-block" />helps you stay on track with you project management.
				</h1>
				<p className="mb-8 leading-relaxed">
					Our software development tool is designed to be used by agile teams and help them to organize and
					prioritize their projects in a fun, flexible way.
				</p>
				<div className="flex items-center flex-wrap">
					<NavLink to="/signup">
						<FormButton inverted>Try - It's free!</FormButton>
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
