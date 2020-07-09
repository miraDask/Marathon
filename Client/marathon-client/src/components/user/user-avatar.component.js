import React, { useContext } from 'react';
import { Context } from '../../providers/global-context.provider';

const Avatar = ({ bgColor, handleClick }) => {
	const { fullName, image } = useContext(Context);
	const initials = fullName.split(' ').map((x) => x.charAt(0)).join('');
	return (
		<div
			className={`flex-shrink-0 w-8 h-8 rounded-full bg-${bgColor} 
        inline-flex items-center justify-center text-white relative z-10 cursor-pointer`}
			alt={fullName}
			onClick={handleClick}
		>
			{!image ? initials : <img className="w-full h-full rounded-full" src={image} alt={initials} />}
		</div>
	);
};

export default Avatar;
