export const types = [ 'Story', 'Task', 'Bug' ];
export const priorities = [ 'Medium', 'Highest', 'High', 'Low', 'Lowest' ];
export const statuses = [ 'To do', 'Development', 'Testing', 'Done' ];

export const initialStatuses = [
	{ title: 'ToDo', issues: [] },
	{ title: 'Development', issues: [] },
	{ title: 'Testing', issues: [] },
	{ title: 'Done', issues: [] }
];
