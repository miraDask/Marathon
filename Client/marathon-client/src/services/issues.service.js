import { fetcher, getHeaders } from './common';

const API_URL = 'http://localhost:2277/api/projects';

export const createIssue = async (data, token, projectId) => {
	const headers = getHeaders(token);
	const url = getUrl(projectId);

	const issue = {
		title: data.title,
		description: data.description,
		type: parseInt(data.type),
		priority: parseInt(data.priority),
		status: parseInt(data.status),
		storyPoints: parseInt(data.storyPoints),
		sprintId: data.sprintId ? parseInt(data.sprintId) : null
	};

	try {
		const response = await fetcher(url, 'POST', headers, issue);

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

export const updateIssue = async (data, token, projectId) => {
	const headers = getHeaders(token);
	const url = getUrl(projectId);
	const { id, ...issueProps } = data;

	try {
		await fetcher(url + `/${id}`, 'PUT', headers, issueProps);
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const changeIssueStatus = async (data, token, projectId, id) => {
	const headers = getHeaders(token);
	const url = getUrl(projectId);

	try {
		const response = await fetcher(url + `/${id}`, 'PATCH', headers, data);
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

export const deleteIssue = async (id, token, projectId) => {
	const headers = getHeaders(token);
	const url = getUrl(projectId);

	try {
		await fetcher(url + `/${id}`, 'DELETE', headers);
	} catch (error) {
		console.log(error);
		return error;
	}
};

const getUrl = (projectId) => {
	return API_URL + `/${projectId}/issues`;
};
