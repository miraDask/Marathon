import React from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../../assets/logo.png';

const Footer = () => {
	return (
		<footer className="text-gray-700 body-font">
			<div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
				<p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">© 2020 MiraDask</p>
				{/* <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 sm:justify-start lg:justify-end">
					<Link to="/#hero" className="flex order-first lg:order-none lg:w-1/5 mb-4 ml-2 md:mb-0 mr-5">
						<img src={logo} alt="Logo" width="650" />
					</Link>
				</span> */}
			</div>
		</footer>
	);
};

export default Footer;
