import React from 'react';
import { InputContainer, Input, Label } from './form-input.styles';

const FormInput = ({ handleOnChange, label, ...otherProps }) => {
	const { value } = otherProps;
	return (
		<InputContainer>
			<Input onChange={handleOnChange} {...otherProps} />
			{label ? <Label className={value ? 'shrink' : ''}>{label}</Label> : null}
		</InputContainer>
	);
};

export default FormInput;
