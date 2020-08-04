import React, { useState, createContext, useEffect } from 'react';
const isLogged = localStorage.getItem('isLoggedIn') !== null ? true : false;
const userObj = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const lastToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';

const initialState = {
	isModalOpen: false,
	token: lastToken,
	user: userObj,
	alertMessage: null,
	isLoggedIn: isLogged,
	deleteModal: false,
	saveDeleteModal: () => {},
	saveAlert: () => {},
	toggleModalIsOpen: () => {},
	toggleLoggedIn: () => {},
	saveToken: () => {}
};

export const Context = createContext(initialState);

const GlobalContextProvider = ({ children }) => {
	const [ token, setToken ] = useState(lastToken);
	const [ user, setUser ] = useState(userObj);
	const [ isLoggedIn, setLoggedIn ] = useState(isLogged);
	const [ isModalOpen, setModalOpen ] = useState(false);
	const [ alertMessage, setAlert ] = useState(null);
	const [ deleteModal, setDeleteModal ] = useState(false);
	const saveAlert = (message) => {
		setAlert(message);
	};

	const toggleLoggedIn = (user) => {
		if (!isLoggedIn) {
			localStorage.setItem('isLoggedIn', 'true');
			localStorage.setItem('user', JSON.stringify(user));
			setUser(user);
		} else {
			localStorage.removeItem('isLoggedIn');
			localStorage.removeItem('user');
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

	const saveDeleteModal = (value) => setDeleteModal(value);

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
				user,
				isLoggedIn,
				isModalOpen,
				alertMessage,
				deleteModal,
				saveDeleteModal,
				saveAlert,
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
