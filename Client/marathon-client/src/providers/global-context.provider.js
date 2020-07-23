import React, { useState, createContext, useEffect } from 'react';
const isLogged = localStorage.getItem('isLoggedIn') !== null ? true : false;
const name = localStorage.getItem('name') ? localStorage.getItem('name') : '';
const userEmail = localStorage.getItem('email') ? localStorage.getItem('email') : '';
const lastToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';

const initialState = {
	isModalOpen: false,
	token: lastToken,
	email: userEmail,
	fullName: name,
	isLoggedIn: isLogged,
	toggleModalIsOpen: () => {},
	toggleLoggedIn: () => {},
	saveToken: () => {}
};

export const Context = createContext(initialState);

const GlobalContextProvider = ({ children }) => {
	const [ token, setToken ] = useState(lastToken);
	const [ email, setEmail ] = useState(userEmail);
	const [ fullName, setName ] = useState(name);
	const [ isLoggedIn, setLoggedIn ] = useState(isLogged);
	const [ isModalOpen, setModalOpen ] = useState(false);

	const toggleLoggedIn = (email, userFullName) => {
		if (!isLoggedIn) {
			localStorage.setItem('isLoggedIn', 'true');
			localStorage.setItem('name', userFullName);
			localStorage.setItem('email', email);
			setName(userFullName);
			setEmail(email);
		} else {
			localStorage.removeItem('isLoggedIn');
			localStorage.removeItem('name');
			localStorage.removeItem('token');
			localStorage.removeItem('email');
			setName('');
			setEmail('');
		}
		setLoggedIn(!isLoggedIn);
	};

	const saveToken = (newToken) => {
		localStorage.setItem('token', newToken);
		setToken(newToken);
	};

	const toggleModalIsOpen = () => {
		setModalOpen(!isModalOpen);
	};

	useEffect(
		() => {
			setToken(token);
		},
		[ token ]
	);

	return (
		<Context.Provider
			value={{
				email,
				token,
				fullName,
				isLoggedIn,
				isModalOpen,
				toggleLoggedIn,
				saveToken,
				toggleModalIsOpen
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default GlobalContextProvider;
