export const processBoardIssuesCollections = (project) => {
	return [
		...project.sprints,
		{
			id: null,
			issues: project.issues
		}
	];
};

export const getNewIssuesCollections = (oldList, dragItem, targetItem) => {
	let newList = JSON.parse(JSON.stringify(oldList));
	const movedIssue = newList[dragItem.current.parentIndex].issues.splice(dragItem.current.issueIndex, 1)[0];
	newList[targetItem.parentIndex].issues.splice(targetItem.issueIndex, 0, movedIssue);
	return newList;
};
