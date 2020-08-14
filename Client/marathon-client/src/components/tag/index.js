import React from 'react';

const Tag = ({ color, size, text }) => {
	return (
		<div
			className={`flex-shrink-0 ${size} rounded-full bg-${color} 
             inline-flex items-center justify-center text-white relative z-10 p-2 pb-3`}
			alt={text}
		>
			{text}
		</div>
	);
};

export default Tag;
