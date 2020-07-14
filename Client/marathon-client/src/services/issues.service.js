import { fetcher, getHeaders } from './common';

const API_URL = 'https://localhost:44391/api/projects';

export const createIssue = async (data, token, projectId) => {
	const headers = getHeaders(token);
	const url = getUrl(projectId);
	try {
		const response = await fetcher(url, 'POST', headers, data);

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

const getUrl = (projectId) => {
	return API_URL + `/${projectId}/issues`;
};
