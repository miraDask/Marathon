export const mockStatuses = [
	{
		id: 1,
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
		id: 2,
		title: 'IN PROGRESS',
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
		id: 3,
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
