import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const NavContainer = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
	padding-top: 3px;
`;

export const OptionsContainer = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
 padding: 0px 15px;
  cursor: pointer;
  font-weight: 300;
`;
