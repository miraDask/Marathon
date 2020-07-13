import React from 'react';

const PageTopicContainer = ({ title, size, bottom, children }) => {
	return (
		<div className={`${size} ${bottom} flex flex-col sm:flex-row sm:items-center items-start mx-auto mt-5`}>
			<h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">{title}</h1>
			{children}
		</div>
	);
};

export default PageTopicContainer;
