import { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { getCookie } from '../utils/cookie';

const useHubConnection = (connectionFuncsCollection) => {
	const [ update, setUpdate ] = useState([]);

	useEffect(() => {
		const token = getCookie('x-auth-token');
		// Builds the SignalR connection, mapping it to /chat
		const hubConnection = new HubConnectionBuilder()
			.withUrl('http://localhost:2277/updatesHub', { accessTokenFactory: () => token })
			.configureLogging(LogLevel.Debug)
			.build();

		// Starts the SignalR connection
		hubConnection
			.start()
			.then(() => console.log('Connection started!'))
			.catch((err) => console.log('Error while establishing connection :('));

		connectionFuncsCollection.forEach((x) => {
			hubConnection.on(x.funcName, (message) => {
				setUpdate([ ...update, message ]);
				if (x.successFunc) {
					x.successFunc();
				}
			});
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
