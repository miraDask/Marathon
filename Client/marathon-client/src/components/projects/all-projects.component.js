import React from 'react';
import MainWrapper from '../../components/main/maim-wrapper.component';
import FormButton from '../../components/forms/form-button.component';
import NavLink from '../../components/navigation/nav-link.component';
import { ReactComponent as EditIcon } from '../../assets/icon-edit.svg';

const ProjectsAll = () => {
	return (
		<MainWrapper otherClasses="pb-24">
			<div className="container px-5 py-8 mx-auto">
				<div className="lg:w-2/3 flex mb-8 flex-col sm:flex-row sm:items-center items-start mx-auto">
					<h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">Projects</h1>
					<NavLink to="/user/projects/create">
						<FormButton>Create</FormButton>
					</NavLink>
				</div>
				<div class="lg:w-2/3 flex mb-8 flex-col sm:flex-row sm:items-center items-start mx-auto">
					<table class="w-full">
						<tr>
							<div class="mx-auto flex p-6 bg-white rounded-lg shadow-xl mb-3 justify-between">
								<div class="pt-1">
									<input
										className="focus:outline-none text-xl text-black leading-tight"
										value="Project 1"
									/>

									<p class="text-base text-gray-600 leading-normal">Key</p>
								</div>
								<span className="inline-block cursor-pointer">
									<EditIcon />
								</span>
							</div>
						</tr>
						<tr>
							<div class="mx-auto flex p-6 bg-white rounded-lg shadow-xl">
								<div class="pt-1">
									<h4 class="cursor-pointer text-xl text-gray-900 leading-tight">John Doe</h4>
									<p class="text-base text-gray-600 leading-normal">Key</p>
								</div>
							</div>
						</tr>
					</table>
				</div>

				<div class="lg:w-2/3 flex-grow justify-center items-center
				 text-center container mx-auto  grid row-gap-4 grid-cols-1 w-full" />
			</div>
		</MainWrapper>
	);
};

export default ProjectsAll;
