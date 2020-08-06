import { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { getCookie } from '../utils/cookie';

const useHubConnection = (connectionFuncName) => {
	const [ update, setUpdate ] = useState([]);

	useEffect(() => {
		const token = getCookie('x-auth-token');
		// Builds the SignalR connection, mapping it to /chat
		const hubConnection = new HubConnectionBuilder()
			.withUrl('https://localhost:44391/updatesHub', { accessTokenFactory: () => token })
			.configureLogging(LogLevel.Debug)
			.build();

		// Starts the SignalR connection
		hubConnection
			.start()
			.then(() => console.log('Connection started!'))
			.catch((err) => console.log('Error while establishing connection :('));

		hubConnection.on(connectionFuncName, (message) => {
			setUpdate([ ...update, message ]);
		});
		return () => {
			hubConnection.stop();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		update,
		setUpdate
	};
};

export default useHubConnection;
