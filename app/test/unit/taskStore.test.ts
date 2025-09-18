import {setActivePinia, createPinia} from "pinia";
import {describe, it, expect, beforeEach} from "vitest";
import {useTaskStore} from "../../stores/tasks";
import {Priority} from "../../types/enums";
import type {TaskUuid} from "../../types/interfaces";

describe("TaskStore", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it("adds a new task", () => {
		const store = useTaskStore();
		const task = {
			uuid: "1",
			title: "Test task",
			date: new Date().toISOString(),
			projectId: 1,
			completed: false,
			priority: "high",
		};

		store.addTask(task as TaskUuid);
		expect(store.tasks).toContainEqual(task);
	});

	it("filters tasks by project", () => {
		const store = useTaskStore();
		store.tasks = [
			{uuid: "1", title: "A", date: "2024-01-01", projectId: 1, completed: false, priority: Priority.Low},
			{uuid: "2", title: "B", date: "2024-01-02", projectId: 2, completed: true, priority: Priority.High},
		];

		store.setProjectFilter(1);
		expect(store.filteredTasks).toHaveLength(1);
		expect(store.filteredTasks[0]?.projectId).toBe(1);
	});

	it("sorts tasks by title", () => {
		const store = useTaskStore();
		store.tasks = [
			{uuid: "1", title: "Z task", date: "2024-01-01", projectId: 1, completed: false, priority: Priority.Low},
			{uuid: "2", title: "A task", date: "2024-01-02", projectId: 1, completed: false, priority: Priority.High},
		];

		store.sortType = "title";
		store.sortOrder = "asc";
		const sorted = store.filteredTasks;

		expect(sorted[0]?.title).toBe("A task");
		expect(sorted[1]?.title).toBe("Z task");
	});

	it("remove task by uuid", () => {
		const store = useTaskStore();
		store.tasks = [
			{uuid: "1", title: "A", date: "2024-01-01", projectId: 1, completed: false, priority: Priority.Low},
			{uuid: "2", title: "B", date: "2024-01-02", projectId: 2, completed: true, priority: Priority.High},
		];

		store.removeTask("1");
		expect(store.filteredTasks).toHaveLength(1);
	});

		it("sets task to complete", () => {
			const store = useTaskStore();
			store.tasks = [
				{uuid: "1", title: "A", date: "2024-01-01", projectId: 1, completed: false, priority: Priority.Low},
				{uuid: "2", title: "B", date: "2024-01-02", projectId: 2, completed: true, priority: Priority.High},
			];

			store.toggleComplete("1");
			expect(store.filteredTasks[0]?.completed).toBe(true);
		});
});
