import React from 'react';

import MainWrapper from '../../components/main/maim-wrapper.component';
import NavLink from '../../components/navigation/nav-link.component';
import SignInForm from '../../components/forms/sign-in-form.component';

const SignInPage = () => {
	return (
		<MainWrapper>
			<div className="container px-10 py-16 mx-auto flex flex-wrap">
				<div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 text-center pt-5">
					<h6 className="title-font font-medium text-3xl text-gray-900">You don't have an account ? </h6>
					<NavLink to="/signup" className="mt-4" inverted>
						SIGN UP
					</NavLink>
				</div>
				<SignInForm />
			</div>
		</MainWrapper>
	);
};

export default SignInPage;
