const API_URL = 'https://localhost:44391/api/projects';
const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json'
};

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

const fetcher = async (url, method, headers, data = null) => {
	return fetch(url, {
		method,
		headers,
		body: data ? JSON.stringify(data) : null
	});
};

const getHeaders = (token) => {
	return {
		...headers,
		authorization: `Bearer ${token}`
	};
};
