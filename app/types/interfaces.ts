import type {Priority} from "./enums";

export interface TaskUuid {
	title: string;
	date: string;
	priority: Priority;
	projectId: number;
	completed: boolean;
	uuid: string;
	description?: string | undefined;
}
