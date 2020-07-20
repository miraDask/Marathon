export const processBoardIssuesCollections = (project) => {
	return [
		...project.sprints,
		{
			issues: project.issues
		}
	];
};

export const getNewIssuesCollections = (oldList, dragItem, targetItem) => {
	let newList = JSON.parse(JSON.stringify(oldList));
	newList[targetItem.parentIndex].issues.splice(
		targetItem.issueIndex,
		0,
		newList[dragItem.current.parentIndex].issues.splice(dragItem.current.issueIndex, 1)[0]
	);
	return newList;
};
