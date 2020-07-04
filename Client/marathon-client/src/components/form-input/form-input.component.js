import React from 'react';
import { InputContainer, Input, Label, ErrorContainer } from './form-input.styles';

const FormInput = ({ handleOnBlur, handleOnChange, label, ...otherProps }) => {
	const { value, error } = otherProps;
	return (
		<InputContainer>
			<Input onBlur={handleOnBlur} onChange={handleOnChange} {...otherProps} />
			{label ? <Label className={value ? 'shrink' : ''}>{label}</Label> : null}
			{error ? <ErrorContainer>* {error}</ErrorContainer> : null}
		</InputContainer>
	);
};

export default FormInput;
