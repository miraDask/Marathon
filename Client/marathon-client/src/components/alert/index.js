import React, { Fragment, useState, useContext } from 'react';
import { AlertContainer, MessageContainer, Message, Button } from './index.styles';

import { Context } from '../../providers/global-context.provider';

const Alert = ({ show, onClose }) => {
	const { alertMessage, saveAlert } = useContext(Context);
	const [ showAlert, setShowAlert ] = useState(show);

	const handleClick = () => {
		saveAlert(null);
		setShowAlert(false);
		onClose();
	};

	if (!showAlert || !alertMessage) {
		return null;
	}
	return (
		<Fragment>
			<AlertContainer>
				<MessageContainer>
					<Message>{alertMessage} !</Message>
				</MessageContainer>
				<Button onClick={handleClick}>
					<span>×</span>
				</Button>
			</AlertContainer>
		</Fragment>
	);
};

export default Alert;
