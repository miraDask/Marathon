import React from 'react';
import MainWrapper from '../../components/main/maim-wrapper.component';
import HomeHero from '../../components/home/home-hero.component';
import StepsContainer from '../../components/steps/steps-container.component';
import About from '../../components/home/about.component';
import image from '../../assets/watermelon-pack-illustration-18.svg';

const HomePage = () => (
	<MainWrapper>
		<HomeHero />
		<About />
		<div className="container px-5 py-24 mx-auto flex flex-wrap">
			<div id="about" className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden mr-24">
				<img src={image} alt="feature" className="object-cover object-center h-full w-full" />
			</div>
			<StepsContainer />
		</div>
	</MainWrapper>
);

export default HomePage;
