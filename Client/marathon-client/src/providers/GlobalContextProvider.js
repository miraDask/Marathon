import React, { useState, createContext, useEffect } from 'react';

const initialState = {
	token: '',
	user: null,
	isLoggedIn: false,
	toggleLoggedIn: () => {},
	registerError: ''
};

export const Context = createContext(initialState);

const GlobalContextProvider = (props) => {
	const [ token, setToken ] = useState('');
	const [ user, setUser ] = useState(null);
	const [ isLoggedIn, setLoggedIn ] = useState(false);
	const [ registerError, setRegisterError ] = useState('');

	const setError = (error) => setRegisterError(error);
	const toggleLoggedIn = () => setLoggedIn(!isLoggedIn);
	return (
		<Context.Provider
			value={{
				token,
				user,
				toggleLoggedIn,
				isLoggedIn,
				setError,
				registerError
			}}
		>
			{props.children}
		</Context.Provider>
	);
};

export default GlobalContextProvider;
