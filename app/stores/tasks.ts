import {defineStore} from "pinia";
import testTasks from "../mock/tasks";
import type {Priority} from "../types/enums";
import type {TaskUuid} from "../types/interfaces";

export const useTaskStore = defineStore("tasks", {
	state: () => ({
		tasks: testTasks.map((t) => ({...t})) as TaskUuid[],
		statusFilter: "all" as "all" | "pending" | "complete",
		priorityFilter: "all" as "all" | Priority,
		projectFilter: null as number | null,
		sortType: "none" as "title" | "date" | "none",
		sortOrder: "none" as "asc" | "desc" | "none",
	}),
	getters: {
		filteredTasks: (state) => {
			const filtered = state.tasks.filter((task) => {
				const statusMatch =
					state.statusFilter === "all" ||
					(state.statusFilter === "pending" && !task.completed) ||
					(state.statusFilter === "complete" && task.completed);

				const priorityMatch = state.priorityFilter === "all" || task.priority === state.priorityFilter;

				const projectMatch = state.projectFilter === null || task.projectId === state.projectFilter;

				return statusMatch && priorityMatch && projectMatch;
			});

			return useTaskStore().sortTasks(filtered, state.sortType, state.sortOrder);
		},
	},
	actions: {
		addTask(task: TaskUuid) {
			this.tasks.push(task);
		},
		editTask(updatedTask: TaskUuid) {
			const index = this.tasks.findIndex((t) => t.uuid === updatedTask.uuid);
			if (index !== -1) {
				this.tasks[index] = {...this.tasks[index], ...updatedTask};
			}
		},
		removeTask(uuid: string) {
			this.tasks = this.tasks.filter((t) => t.uuid !== uuid);
		},
		toggleComplete(uuid: string) {
			const task = this.tasks.find((t) => t.uuid === uuid);
			if (task) task.completed = !task.completed;
		},
		getTaskByUuid(uuid: string): TaskUuid | undefined {
			return this.tasks.find((t) => t.uuid === uuid);
		},
		setProjectFilter(projectId: number | null) {
			this.projectFilter = projectId;
		},
		sortTasks(tasks: TaskUuid[], type: "title" | "date" | "none", order: "asc" | "desc" | "none") {
			if (type === "none" || order === "none") {
				return tasks;
			}

			return [...tasks].sort((a, b) => {
				let result = 0;

				if (type === "title") {
					result = a.title.localeCompare(b.title);
				} else if (type === "date") {
					const dateA = new Date(a.date).getTime();
					const dateB = new Date(b.date).getTime();
					result = dateA - dateB;
				}

				return order === "asc" ? result : -result;
			});
		},
		isFilterSet() {
			return (
				this.statusFilter !== "all" ||
				this.priorityFilter !== "all" ||
				this.projectFilter !== null ||
				this.sortType !== "none" ||
				this.sortOrder !== "none"
			);
		},
		clearFilter() {
			this.statusFilter = "all";
			this.priorityFilter = "all";
			this.projectFilter = null;
			this.sortType = "none";
			this.sortOrder = "none";
		},
	},
});
