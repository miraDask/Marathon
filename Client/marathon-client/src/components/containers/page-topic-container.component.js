import React from 'react';

const PageTopicContainer = ({ title, size, bottom, children }) => {
	return (
		<div
			className={`${size} ${bottom} flex flex-col sm:flex-row sm:items-center items-center mx-auto mt-5 md:px-10 sm:px-0`}
		>
			<h1 className="flex-grow sm:pr-16 text-3xl font-medium title-font text-gray-900">{title}</h1>
			{children}
		</div>
	);
};

export default PageTopicContainer;
