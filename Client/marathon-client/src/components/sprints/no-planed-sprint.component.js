import React from 'react';
import { ReactComponent as Image } from '../../assets/watermelon-pack-illustration-14.svg';

const NoPlanedSprint = () => {
	return (
		<div class=" w-full ml-4">
			<div class="flex p-8 sm:flex-row flex-col">
				<div class="w-40 h-40 lg:mr-16 mr-4 
                        flex-shrink-0">
					<Image />
				</div>
				<div class="flex-grow text-left m-10">
					<h6 class="text-gray-900 text-lg title-font font-medium mb-3">Plan your sprint</h6>
					<p class="leading-relaxed text-base">
						As a team, agree on what work needs to be completed, and drag these issues to the sprint.
					</p>
				</div>
			</div>
		</div>
	);
};

export default NoPlanedSprint;
