import { getHeaders, fetcher } from './common';
const API_URL = 'https://localhost:44391/api/identity/';

export const registerUser = async (data) => {
	return fetchUser(data, API_URL + 'register');
};

export const loginUser = async (data) => {
	return fetchUser(data, API_URL + 'login');
};

export const logoutUser = async (data) => {
	return fetchUser(data, API_URL + 'logout');
};

export const updateUser = async (data, token) => {
	try {
		await fetcher(API_URL + 'user', 'POST', getHeaders(token), data);
	} catch (error) {
		console.log(error);
	}
};

const fetchUser = async (data, url, token = null) => {
	try {
		const result = await fetch(url, {
			method: 'POST',
			headers: getHeaders(token),
			body: JSON.stringify(data)
		});

		try {
			const dataToReturn = await result.json();
			return dataToReturn;
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
		return error;
	}
};
