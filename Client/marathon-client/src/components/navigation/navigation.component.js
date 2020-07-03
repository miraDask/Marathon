import React, { useContext } from 'react';
import logo from '../../assets/logo.png';
import { Context } from '../../providers/global-context.provider';
import { logoutUser } from '../../utils/user';
//import { ReactComponent as Logo } from '../../assets/logo.png';

import { NavContainer, LogoContainer, OptionsContainer, OptionLink } from './navigation.styles';

const Navigation = () => {
	const { isLoggedIn, username, toggleLoggedIn, token } = useContext(Context);

	const handleSignOut = async (e) => {
		await logoutUser(token);
		toggleLoggedIn();
	};

	return (
		<NavContainer>
			<LogoContainer to="/">
				<img src={logo} alt="Logo" />
			</LogoContainer>
			<OptionsContainer>
				{isLoggedIn ? (
					<div>
						<div>Hello, {username}</div>
						<OptionLink onClick={handleSignOut}>SIGN OUT</OptionLink>
					</div>
				) : (
					<div>
						<OptionLink to="/signin"> SIGN IN</OptionLink>
						<OptionLink to="/signup"> SIGN UP</OptionLink>
					</div>
				)}
			</OptionsContainer>
		</NavContainer>
	);
};
export default Navigation;