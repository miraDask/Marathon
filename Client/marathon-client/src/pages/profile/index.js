import React, { useState, useContext } from 'react';

import { getCookie } from '../../utils/cookie';

import { updateUser } from '../../services/users.service';
import { Context } from '../../providers/global-context.provider';
import MainWrapper from '../../components/main-wrapper';

const ProfilePage = () => {
	const [ loading, setLoading ] = useState(false);
	const { user, saveUser } = useContext(Context);

	const openWidget = () => {
		setLoading(true);
		const widget = window.cloudinary.createUploadWidget(
			{
				cloudName: process.env.REACT_APP_CLOUD_NAME,
				uploadPreset: process.env.REACT_APP_CLOUD_PRESET
			},
			async (error, result) => {
				const token = getCookie('x-auth-token');
				if (result.event === 'success') {
					saveUser({ ...user, imageUrl: result.info.url });
					await updateUser(
						{
							fullName: '',
							userName: '',
							imageUrl: result.info.url
						},
						token
					);
				}
				setLoading(false);
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
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{user.fullName}</h1>

						<div className="flex border-t border-gray-300 py-2">
							<span className="text-gray-500">Username</span>
							<span className="ml-auto text-gray-900">{user.userName}</span>
						</div>
						{/* <div className="flex border-t border-gray-300 py-2">
							<span className="text-gray-500"></span>
							<span className="ml-auto text-gray-900"></span>
						</div> */}
						<div className="flex border-t border-b mb-6 border-gray-300 py-2">
							<span className="text-gray-500">Email</span>
							<span className="ml-auto text-gray-900">{user.email}</span>
						</div>
						<div className="flex">
							<button
								onClick={openWidget}
								className="flex ml-auto text-white bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded"
							>
								{!loading ? 'Upload image' : 'Loading ...'}
							</button>
						</div>
					</div>
					<img
						alt="user"
						className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
						src={user.imageUrl ? user.imageUrl : 'https://dummyimage.com/400x400'}
					/>
				</div>
			</div>
		</MainWrapper>
	);
};

export default ProfilePage;
