const API_URL = 'https://localhost:44391/api/projects';

export const createProject = async (data, token) => {
	try {
		const result = await fetch(API_URL, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		try {
			if (result.status === '401') {
				console.log('unauthorized');
			}
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
