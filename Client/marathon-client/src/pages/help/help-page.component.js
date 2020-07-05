import React from 'react';
import MainWrapper from '../../components/main/maim-wrapper.component';
import { ReactComponent as Image } from '../../assets/watermelon-pack-illustration-07.svg';
import StepsContainer from '../../components/steps/steps-container.component';

const HelpPage = () => {
	return (
		<MainWrapper>
			<div class="container px-10 py-24 mx-auto flex flex-wrap">
				<div class="flex flex-wrap w-full">
					<StepsContainer />
					<Image class="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12" alt="step" />
				</div>
			</div>
		</MainWrapper>
	);
};

export default HelpPage;
