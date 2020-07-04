import styled, { css } from 'styled-components';

const subColor = 'grey';
const mainColor = '#6ab0a0';

const shrinkLabelStyles = css`
	top: -25px;
	font-size: 14px;
	color: ${mainColor};
`;

export const InputContainer = styled.div`
	position: relative;
	margin: 45px 0;
	input[type='password'] {
		letter-spacing: 0.3em;
	}
`;

export const Input = styled.input`
	background: none;
	background-color: white;
	color: ${subColor};
	font-size: 18px;
	padding: 10px 10px 10px 5px;
	display: block;
	width: 100%;
	border: none;
	border-radius: 0;
	border-bottom: 1px solid ${subColor};
	margin: 25px 0;
	&:focus {
		outline: none;
	}
	&:focus ~ label {
		${shrinkLabelStyles};
	}
`;

export const Label = styled.label`
	color: ${subColor};
	font-size: 16px;
	font-weight: normal;
	position: absolute;
	pointer-events: none;
	left: 5px;
	top: 10px;
	transition: 300ms ease all;

	&.shrink {
		${shrinkLabelStyles};
	}
`;

export const ErrorContainer = styled.div`color: #e88300;`;
