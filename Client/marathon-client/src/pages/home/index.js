import React, { useEffect } from 'react';
import MainWrapper from '../../components/main-wrapper';
import HomeHero from '../../components/home-hero';
import StepsContainer from '../../components/steps-container';
import About from '../../components/about';
import image from '../../assets/watermelon-pack-illustration-18.svg';

const HomePage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<MainWrapper>
			<HomeHero id="hero" />
			<About />
			<div className="container px-5 lg:py-24 py-6 mx-auto flex flex-wrap">
				<div id="about" className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden mr-24">
					<img src={image} alt="feature" className="object-cover object-center h-full w-full" />
				</div>
				<StepsContainer />
			</div>
		</MainWrapper>
	);
};

export default HomePage;
