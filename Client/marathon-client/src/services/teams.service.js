import { fetcher, getHeaders } from './common';

const API_URL = 'https://localhost:44391/api/projects';

export const createTeam = async (projectId, token, data) => {
	const headers = getHeaders(token);

	try {
		const response = await fetcher(API_URL + `/${projectId}/teams`, 'POST', headers, data);

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

export const inviteToTeam = async (projectId, teamId, token, data) => {
	const headers = getHeaders(token);
	const response = await fetcher(API_URL + `/${projectId}/teams/${teamId}/invite`, 'POST', headers, data);

	if (response.status >= 400) {
		return { error: 'There is no user with this email' };
	}

	return true;
};

export const getAllTeams = async (projectId, token) => {
	const headers = getHeaders(token);

	try {
		const response = await fetcher(API_URL + `/${projectId}/teams`, 'GET', headers);
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

export const getTeamDetails = async (projectId, teamId, token) => {
	const headers = getHeaders(token);

	try {
		const response = await fetcher(API_URL + `/${projectId}/teams/${teamId}`, 'GET', headers);
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

export const updateTeam = async (projectId, token, teamId, data) => {
	const headers = getHeaders(token);

	try {
		await fetcher(API_URL + `/${projectId}/teams/${teamId}`, 'PUT', headers, data);
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const deleteTeam = async (projectId, token, teamId) => {
	const headers = getHeaders(token);

	try {
		await fetcher(API_URL + `/${projectId}/teams/${teamId}`, 'DELETE', headers);
	} catch (error) {
		console.log(error);
		return error;
	}
};
