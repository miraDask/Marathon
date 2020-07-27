import React from 'react';

const DeleteButton = ({ handleDelete }) => {
	return (
		<button
			type="submit"
			onClick={handleDelete}
			className="inline-block mx-auto text-white bg-red-400 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
		>
			Delete
		</button>
	);
};

export default DeleteButton;
