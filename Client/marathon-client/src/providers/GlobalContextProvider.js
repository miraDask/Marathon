import React, { useState, createContext } from 'react';
const isLogged = localStorage.getItem('isLoggedIn') !== null ? true : false;
const username = localStorage.getItem('username');
const userObj = {
	username: username !== null ? username : ''
};

const initialState = {
	token: '',
	user: userObj,
	isLoggedIn: isLogged,
	errors: '',
	toggleLoggedIn: () => {},
	setError: () => {},
	saveToken: () => {},
	saveUser: () => {}
};

export const Context = createContext(initialState);

const GlobalContextProvider = (props) => {
	const [ token, setToken ] = useState('');
	const [ user, setUser ] = useState(userObj);
	const [ isLoggedIn, setLoggedIn ] = useState(isLogged);
	const [ errors, setErrors ] = useState('');

	const saveErrors = (value) => setErrors(value);
	const toggleLoggedIn = (username = null) => {
		if (!isLoggedIn) {
			localStorage.setItem('isLoggedIn', 'true');
			localStorage.setItem('username', username);
		} else {
			localStorage.removeItem('isLoggedIn');
			localStorage.removeItem('username');
		}
		setLoggedIn(!isLoggedIn);
	};

	const saveToken = (newToken) => setToken(newToken);
	const saveUser = (value) => setUser(value);

	return (
		<Context.Provider
			value={{
				token,
				user,
				errors,
				toggleLoggedIn,
				isLoggedIn,
				saveErrors,
				saveToken,
				saveUser
			}}
		>
			{props.children}
		</Context.Provider>
	);
};

export default GlobalContextProvider;
