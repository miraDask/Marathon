import { fetcher, getHeaders } from './common';

const API_URL = 'https://localhost:44391/api/projects/invitations';

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

export const acceptInvitation = async (token, data) => {
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

export const getAllInvitations = async (token) => {
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
		return error;
	}
};

// export const deleteInvitation = async (token) => {
// 	const headers = getHeaders(token);

// 	try {
// 		await fetcher(API_URL, 'DELETE', headers);
// 	} catch (error) {
// 		console.log(error);
// 		return error;
// 	}
// };

// export const declineInvitation = async (token) => {
// 	const headers = getHeaders(token);

// 	try {
// 		await fetcher(API_URL, 'PATCH', headers);
// 	} catch (error) {
// 		console.log(error);
// 		return error;
// 	}
// };