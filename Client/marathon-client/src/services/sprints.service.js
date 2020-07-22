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
