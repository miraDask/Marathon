import styled from 'styled-components';

export const HomeContainer = styled.div`padding: 100px 50px 50px 50px;`;

export const Divider = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;

	svg {
		position: relative;
		display: block;
		width: calc(185% + 1.3px);
		height: 144px;
		transform: rotateY(180deg);
	}

	path {
		fill: #fafbfc;
	}
`;
