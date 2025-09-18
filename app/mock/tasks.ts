import {v4 as uuidv4} from "uuid";

const testTasks = [
	{
		uuid: uuidv4(),
		title: "Setup project repository",
		description: "Initialize Git repository and create basic folder structure",
		date: "2025-10-20",
		priority: "high",
		projectId: 1,
		completed: false,
	},
	{
		uuid: uuidv4(),
		title: "Design homepage",
		description: "Create wireframes and initial UI for homepage",
		date: "2025-10-25",
		priority: "medium",
		projectId: 1,
		completed: false,
	},
	{
		uuid: uuidv4(),
		title: "Implement authentication",
		description: "Setup login/logout and registration flow",
		date: "2025-11-01",
		priority: "high",
		projectId: 2,
		completed: false,
	},
	{
		uuid: uuidv4(),
		title: "Write unit tests",
		description: "Add tests for components and stores",
		date: "2025-11-05",
		priority: "low",
		projectId: 2,
		completed: true,
	},
	{
		uuid: uuidv4(),
		title: "Setup CI/CD",
		description: "Configure GitHub Actions for automated builds",
		date: "2025-11-10",
		priority: "medium",
		projectId: 1,
		completed: false,
	},
	{
		uuid: uuidv4(),
		title: "Optimize images",
		description: "Compress images and implement lazy loading",
		date: "2025-11-15",
		priority: "low",
		projectId: 3,
		completed: false,
	},
];

export default testTasks;
