import { fetcher, getHeaders } from './common';

const API_URL = 'https://localhost:44391/api/projects';

export const createSprint = async (projectId, token) => {
	const headers = getHeaders(token);

	try {
		const response = await fetcher(API_URL + `/${projectId}/sprints`, 'POST', headers);

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

export const completeSprint = async () => true;

export const getSprintDetails = async (projectId, token, sprintId) => {
	const headers = getHeaders(token);
	try {
		const response = await fetcher(API_URL + `/${projectId}/sprints/${sprintId}`, 'GET', headers);

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

export const updateSprint = async (projectId, token, sprintId, data) => {
	const headers = getHeaders(token);

	try {
		await fetcher(API_URL + `/${projectId}/sprints/${sprintId}`, 'PUT', headers, data);
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const deleteSprint = async (projectId, token, sprintId) => {
	const headers = getHeaders(token);

	try {
		await fetcher(API_URL + `/${projectId}/sprints/${sprintId}`, 'DELETE', headers);
	} catch (error) {
		console.log(error);
		return error;
	}
};
