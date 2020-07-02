const API_URL = 'https://localhost:44391/api/Identity/register';

export const fetchRegisterUser = async (data) => {
	const result = await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	return result.json();
};
