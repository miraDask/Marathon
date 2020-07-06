import React, { useState, createContext } from 'react';
const isLogged = localStorage.getItem('isLoggedIn') !== null ? true : false;
const name = localStorage.getItem('name') ? localStorage.getItem('name') : '';

const initialState = {
	projects: [],
	token: '',
	fullName: name,
	isLoggedIn: isLogged,
	toggleLoggedIn: () => {},
	saveToken: () => {}
};

export const Context = createContext(initialState);

const GlobalContextProvider = (props) => {
	const [ token, setToken ] = useState('');
	const [ projects, setProjects ] = useState([]);
	const [ fullName, setName ] = useState(name);
	const [ isLoggedIn, setLoggedIn ] = useState(isLogged);

	const toggleLoggedIn = (userFullName = null) => {
		if (!isLoggedIn) {
			localStorage.setItem('isLoggedIn', 'true');
			localStorage.setItem('name', userFullName);
			setName(userFullName);
		} else {
			localStorage.removeItem('isLoggedIn');
			localStorage.removeItem('name');
			setName('');
		}
		setLoggedIn(!isLoggedIn);
	};

	const saveToken = (newToken) => setToken(newToken);

	return (
		<Context.Provider
			value={{
				token,
				fullName,
				isLoggedIn,
				toggleLoggedIn,
				saveToken,
				projects
			}}
		>
			{props.children}
		</Context.Provider>
	);
};

export default GlobalContextProvider;
