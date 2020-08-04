import React from 'react';
import MainWrapper from '../main-wrapper';
const Spinner = ({ color }) => (
	<MainWrapper>
		<div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
			<div className={`w-12 h-12 border-4 border-${color} rounded-full loader`} />
		</div>
	</MainWrapper>
);

export default Spinner;
