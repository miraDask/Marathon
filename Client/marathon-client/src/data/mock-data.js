export const mockStatuses = [
	{
		title: 'TO DO',
		issues: [
			{
				title: 'Test to do',
				assignee: 'me',
				type: 'story',
				priority: 'medium',
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
				type: 'bug',
				priority: 'highest',
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
				type: 'story',
				priority: 'high',
				id: 4,
				storyPoints: 2
			}
		]
	}
];
