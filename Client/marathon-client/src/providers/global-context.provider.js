import React, { useState, createContext, useEffect } from 'react';
const isLogged = localStorage.getItem('isLoggedIn') !== null ? true : false;
const name = localStorage.getItem('name') ? localStorage.getItem('name') : '';
const lastToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';

const initialState = {
	projects: [],
	token: lastToken,
	fullName: name,
	isLoggedIn: isLogged,
	toggleLoggedIn: () => {},
	saveToken: () => {},
	saveProject: () => {}
};

export const Context = createContext(initialState);

const GlobalContextProvider = (props) => {
	const [ token, setToken ] = useState(lastToken);
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
			localStorage.removeItem('token');
			setName('');
		}
		setLoggedIn(!isLoggedIn);
	};

	const saveToken = (newToken) => {
		localStorage.setItem('token', newToken);
		setToken(newToken);
	};

	const saveProject = (newProject) => setProjects([ ...projects, newProject ]);
	useEffect(
		() => {
			setToken(token);
		},
		[ token ]
	);
	return (
		<Context.Provider
			value={{
				token,
				fullName,
				isLoggedIn,
				projects,
				toggleLoggedIn,
				saveToken,
				saveProject
			}}
		>
			{props.children}
		</Context.Provider>
	);
};

export default GlobalContextProvider;
