import React from 'react';
import { AboutContainer, AboutTitle, AboutInfo } from './index.styles';
const About = () => (
	<div>
		<AboutContainer className="container">
			<AboutTitle className="title-font">Go Agile! Be Agile! Stay Agile!</AboutTitle>
			<AboutInfo>Marathon is here to help your agile team to plan, track, and build great projects.</AboutInfo>
		</AboutContainer>
	</div>
);

export default About;
