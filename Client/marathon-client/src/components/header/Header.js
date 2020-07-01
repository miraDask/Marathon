import React from 'react';
import logo from '../../assets/rsz_11logo.png';
//import { ReactComponent as Logo } from '../../assets/logo.png';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = () => (
	<HeaderContainer>
		<LogoContainer to="/">
			<img src={logo} alt="Logo" />
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to="/contact">CONTACT</OptionLink>

			{/* <OptionLink as="div">SIGN OUT</OptionLink> */}

			<OptionLink to="/signin"> SIGN IN</OptionLink>
		</OptionsContainer>
	</HeaderContainer>
);
export default Header;
