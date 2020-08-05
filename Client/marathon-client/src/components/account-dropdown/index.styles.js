import tw from 'tailwind.macro';

const getStyles = (props) => {
	return !props.visible ? 'invisible' : '';
};

export const AccountDropdownContainer = tw.div`
${getStyles}
`;
