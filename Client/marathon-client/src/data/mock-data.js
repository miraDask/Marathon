export const mockStatuses = [
	{
		title: 'TO DO',
		issues: [
			{
				title: 'Test to do',
				assignee: 'me',
				type: 0,
				priority: 0,
				id: 1,
				storyPoints: 0
			}
		]
	},
	{
		title: 'DEVELOPMENT',
		issues: [
			{
				title: 'Test in progress',
				assignee: 'me',
				type: 2,
				priority: 2,
				id: 2,
				storyPoints: 2
			}
		]
	},
	{
		title: 'TESTING',
		issues: []
	},

	{
		title: 'DONE',
		issues: [
			{
				title: 'Test  DONE',
				assignee: 'me',
				type: 1,
				priority: 2,
				id: 4,
				storyPoints: 2
			}
		]
	}
];
