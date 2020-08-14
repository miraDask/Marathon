import { fetcher, getHeaders } from './common';

const API_URL = 'http://localhost:2277/api/projects';

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
	if (response.status === 400) {
		const result = await response.json();
		return { error: result.errors[0] };
	}

	return true;
};

export const getAllTeams = async (projectId, token) => {
	const headers = getHeaders(token);

	try {
		const response = await fetcher(API_URL + `/${projectId}/teams`, 'GET', headers);
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

export const getTeamDetails = async (projectId, teamId, token) => {
	const headers = getHeaders(token);

	try {
		const response = await fetcher(API_URL + `/${projectId}/teams/${teamId}`, 'GET', headers);
		if (response.status === 400) {
			return { error: true };
		}

		const dataToReturn = await response.json();
		return dataToReturn;
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

export const removeFromTeam = async (projectId, token, teamId, data) => {
	const headers = getHeaders(token);

	try {
		await fetcher(API_URL + `/${projectId}/teams/${teamId}/remove`, 'DELETE', headers, data);
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
