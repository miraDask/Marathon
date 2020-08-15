import { fetcher, getHeaders } from './common';
const API_URL = 'http://localhost:2277/api/projects';

export const getProjects = async (token) => {
	const headers = getHeaders(token);

	try {
		const response = await fetcher(API_URL, 'GET', headers);
		try {
			const dataToReturn = await response.json();
			return dataToReturn;
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createProject = async (data, token) => {
	const headers = getHeaders(token);

	try {
		const response = await fetcher(API_URL, 'POST', headers, data);

		try {
			const dataToReturn = await response.json();
			return dataToReturn;
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const updateProject = async (id, data, token) => {
	const headers = getHeaders(token);

	try {
		const response = await fetcher(API_URL + `/${id}`, 'PUT', headers, data);
		if (response.status >= 400) {
			throw new Error('Bad request');
		}
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const getProjectDetails = async (id, token) => {
	const headers = getHeaders(token);

	try {
		const response = await fetcher(API_URL + `/${id}`, 'GET', headers);

		const dataToReturn = await response.json();
		if (response.status === 400) {
			return { error: dataToReturn };
		}
		return dataToReturn;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const deleteProject = async (token, id) => {
	const headers = getHeaders(token);

	try {
		const response = await fetcher(API_URL + `/${id}`, 'DELETE', headers);
		if (response.status === 400) {
			throw new Error('Bad request');
		}
		const updatedToken = await response.json();
		return updatedToken;
	} catch (error) {
		console.log(error);
		return error;
	}
};
