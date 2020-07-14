const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json'
};

export const fetcher = async (url, method, headers, data = null) => {
	return fetch(url, {
		method,
		headers,
		body: data ? JSON.stringify(data) : null
	});
};

export const getHeaders = (token) => {
	return {
		...headers,
		authorization: `Bearer ${token}`
	};
};
