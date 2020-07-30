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

	try {
		const response = await fetcher(API_URL + `/${projectId}/teams/${teamId}/invite`, 'POST', headers, data);
		await response.json();
	} catch (error) {
		console.log(error);
		return error;
	}
};
