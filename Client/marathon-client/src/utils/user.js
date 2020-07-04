const API_URL = 'https://localhost:44391/api/identity/';

export const registerUser = async (data) => {
	return fetchUser(data, API_URL + 'register');
};

export const loginUser = async (data) => {
	return fetchUser(data, API_URL + 'login');
};

export const logoutUser = async (data) => {
	return fetchUser(data, API_URL + 'logout');
};

const fetchUser = async (data, url) => {
	try {
		const result = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		try {
			const dataToReturn = await result.json();
			return dataToReturn;
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
		return error;
	}
};
