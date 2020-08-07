export const getCompleteSprintFormOptions = (collection, activeSprintId) => {
	const filteredCollection = collection.filter((x) => x.id !== activeSprintId);
	console.log('filteredCollection', filteredCollection);
	return filteredCollection.map((x, i) => {
		return {
			id: i === filteredCollection.length - 1 ? '' : x.id,
			title: i === filteredCollection.length - 1 ? 'Backlog' : x.title
		};
	});
};
