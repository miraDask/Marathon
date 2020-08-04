import React, { useState } from 'react';

import MainWrapper from '../../components/main/main-wrapper.component';
const ProfilePage = () => {
	const [ imageUrl, setImageUrl ] = useState('');

	const openWidget = () => {
		const widget = window.cloudinary.createUploadWidget(
			{
				cloudName: 'miradask',
				uploadPreset: 'marathon'
			},
			(error, result) => {
				if (result.event === 'success') {
					setImageUrl(result.info.url);
				}
			}
		);

		widget.open();
	};
	return (
		<MainWrapper>
			<div className="container px-5 py-24 mx-auto">
				<div className="lg:w-4/5 mx-auto flex flex-wrap">
					<div className="lg:w-1/2 w-full lg:pr-10 lg:py-20 mb-6 lg:mb-0">
						<h2 className="text-sm title-font text-gray-500 tracking-widest">FULL NAME</h2>
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-4">USER FULL NAME</h1>

						<div className="flex border-t border-gray-300 py-2">
							<span className="text-gray-500">Username</span>
							<span className="ml-auto text-gray-900">username</span>
						</div>
						{/* <div className="flex border-t border-gray-300 py-2">
							<span className="text-gray-500"></span>
							<span className="ml-auto text-gray-900"></span>
						</div> */}
						<div className="flex border-t border-b mb-6 border-gray-300 py-2">
							<span className="text-gray-500">Email</span>
							<span className="ml-auto text-gray-900">email</span>
						</div>
						<div className="flex">
							<button
								onClick={openWidget}
								className="flex ml-auto text-white bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded"
							>
								Upload image
							</button>
						</div>
					</div>
					<img
						alt="user"
						className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
						src={imageUrl ? imageUrl : 'https://dummyimage.com/400x400'}
					/>
				</div>
			</div>
		</MainWrapper>
	);
};

export default ProfilePage;
