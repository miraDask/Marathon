import React, { useState, createContext } from 'react';
const isLogged = localStorage.getItem('isLoggedIn') !== null ? true : false;
const name = localStorage.getItem('username') ? localStorage.getItem('username') : '';

const initialState = {
	token: '',
	username: name,
	isLoggedIn: isLogged,
	toggleLoggedIn: () => {},
	saveToken: () => {}
};

export const Context = createContext(initialState);

const GlobalContextProvider = (props) => {
	const [ token, setToken ] = useState('');
	const [ username, setUsername ] = useState(name);
	const [ isLoggedIn, setLoggedIn ] = useState(isLogged);

	const toggleLoggedIn = (username = null) => {
		if (!isLoggedIn) {
			localStorage.setItem('isLoggedIn', 'true');
			localStorage.setItem('username', username);
			setUsername(username);
		} else {
			localStorage.removeItem('isLoggedIn');
			localStorage.removeItem('username');
			setUsername('');
		}
		setLoggedIn(!isLoggedIn);
	};

	const saveToken = (newToken) => setToken(newToken);

	return (
		<Context.Provider
			value={{
				token,
				username,
				isLoggedIn,
				toggleLoggedIn,
				saveToken
			}}
		>
			{props.children}
		</Context.Provider>
	);
};

export default GlobalContextProvider;
