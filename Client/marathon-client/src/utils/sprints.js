export const getCompleteSprintFormOptions = (collection, activeSprintId) => {
	return collection.filter((x) => x.id !== activeSprintId).map((x, i) => {
		return {
			id: i < collection[collection.length - 1] ? x.id : '',
			title: i < collection[collection.length - 1] ? x.title : 'Backlog'
		};
	});
};
