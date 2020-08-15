import React, { useState, createContext, useEffect } from 'react';

import { getCookie, deleteCookie } from '../utils/cookie';
import { getUser } from '../services/users.service';

import Spinner from '../components/spinner';

const initialState = {
	isModalOpen: false,
	user: null,
	alertMessage: null,
	isLoggedIn: false,
	deleteModal: false,
	saveDeleteModal: () => {},
	saveUser: () => {},
	saveAlert: () => {},
	toggleModalIsOpen: () => {},
	toggleLoggedIn: () => {}
};

export const Context = createContext(initialState);

const GlobalContextProvider = ({ children }) => {
	const [ loading, setLoading ] = useState(true);
	const [ user, setUser ] = useState(null);
	const [ isLoggedIn, setLoggedIn ] = useState(false);
	const [ isModalOpen, setModalOpen ] = useState(false);
	const [ alertMessage, setAlert ] = useState(null);
	const [ deleteModal, setDeleteModal ] = useState(false);
	const saveAlert = (message) => {
		setAlert(message);
	};

	const saveUser = (user) => setUser(user);

	const toggleLoggedIn = (value) => setLoggedIn(value);

	const toggleModalIsOpen = () => {
		setModalOpen(!isModalOpen);
	};

	const saveDeleteModal = (value) => setDeleteModal(value);

	const fetchUser = async () => {
		const token = getCookie('x-auth-token');
		if (!token) {
			setLoggedIn(false);
			deleteCookie('x-auth-token');
			setLoading(false);
			return;
		}

		const response = await getUser(token);
		if (response.error) {
			setLoggedIn(false);
			deleteCookie('x-auth-token');
			setLoading(false);
			return;
		}

		setUser(response);
		setLoggedIn(true);
		setLoading(false);
	};

	useEffect(() => {
		fetchUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) {
		return <Spinner color="green-500" />;
	}

	return (
		<Context.Provider
			value={{
				user,
				isLoggedIn,
				isModalOpen,
				alertMessage,
				deleteModal,
				saveUser,
				saveDeleteModal,
				saveAlert,
				toggleLoggedIn,
				toggleModalIsOpen
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default GlobalContextProvider;
