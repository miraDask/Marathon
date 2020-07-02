import React, { useContext, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { Context } from '../../providers/GlobalContextProvider';
//import { ReactComponent as Logo } from '../../assets/logo.png';

import { NavContainer, LogoContainer, OptionsContainer, OptionLink } from './navigation.styles';

const Navigation = () => {
	const { isLoggedIn } = useContext(Context);

	return (
		<NavContainer>
			<LogoContainer to="/">
				<img src={logo} alt="Logo" />
			</LogoContainer>
			<OptionsContainer>
				{isLoggedIn ? (
					<OptionLink to="/contact">SIGN OUT</OptionLink>
				) : (
					<OptionLink to="/signin"> SIGN IN</OptionLink>
				)}
			</OptionsContainer>
		</NavContainer>
	);
};
export default Navigation;
