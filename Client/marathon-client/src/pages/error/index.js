import React from 'react';
import { ReactComponent as ErrorImage } from '../../assets/watermelon-pack-illustration-15.svg';

import MainWrapper from '../../components/main-wrapper';

const ErrorPage = ({ goBack }) => {
	return (
		<MainWrapper>
			<div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
				<ErrorImage className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded opacity-50" />
				<div className="absolute top-auto text-center mb-48">
					<h1 className="title-font sm:text-4xl text-3xl font-medium text-gray-900">Sorry!</h1>
					<h6 className="leading-relaxed">Something went wrong</h6>
				</div>
			</div>
		</MainWrapper>
	);
};

export default ErrorPage;
