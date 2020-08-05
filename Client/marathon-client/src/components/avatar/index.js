import React from 'react';
import { Initials, AvatarContainer, AvatarImage } from './index.styles';

const Avatar = ({ bgColor, handleClick, user }) => {
	const { fullName, imageUrl } = user;
	const initials = fullName.split(' ').map((x) => x.charAt(0)).join('');
	return (
		<AvatarContainer onClick={handleClick}>
			{' '}
			{!imageUrl ? (
				<Initials className={`bg-${bgColor}-400`}>{initials}</Initials>
			) : (
				<AvatarImage src={imageUrl} alt={initials} />
			)}
		</AvatarContainer>
	);
};

export default Avatar;
