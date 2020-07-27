export const processBacklogIssuesCollections = (project) => {
	return [
		...project.sprints,
		{
			id: null,
			issues: project.issues
		}
	];
};

export const processBoardIssuesCollections = (sprint) => {
	return [ sprint.todoIssues, sprint.developmentIssues, sprint.testingIssues, sprint.doneIssues ];
};

export const getNewIssuesCollections = (oldList, dragItem, targetItem, assignee = null) => {
	let newList = JSON.parse(JSON.stringify(oldList));
	let movedIssue = newList[dragItem.current.parentIndex].issues.splice(dragItem.current.index, 1)[0];
	if (assignee) {
		movedIssue = { ...movedIssue, assignee: assignee };
	}
	newList[targetItem.parentIndex].issues.splice(targetItem.index, 0, movedIssue);
	return newList;
};
