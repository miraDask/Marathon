import React, { useEffect } from 'react';

import { ReactComponent as Image } from '../../assets/watermelon-pack-illustration-10.svg';
import MainWrapper from '../../components/main-wrapper';
import SignUpForm from '../../components/sign-up-form';

const SignUpPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<MainWrapper>
			<div className="container p-16 mx-auto flex flex-wrap">
				<div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 text-center pt-5">
					<Image />
				</div>
				<SignUpForm />
			</div>
		</MainWrapper>
	);
};

export default SignUpPage;
