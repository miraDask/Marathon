import React from 'react';
import MainWrapper from '../../components/main-wrapper';
import { ReactComponent as Image } from '../../assets/watermelon-pack-illustration-05.svg';
import StepsContainer from '../../components/steps-container';

const HelpPage = () => {
	return (
		<MainWrapper>
			<div className="container py-24 mx-auto flex flex-wrap px-20">
				<div className="flex flex-wrap w-full">
					<StepsContainer className="lg:justify-end" />
					<div className="mx-20" />
					<Image
						className="lg:w-2/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
						alt="step"
					/>
				</div>
			</div>
		</MainWrapper>
	);
};

export default HelpPage;
