import {z} from "zod";
import {Priority} from "~/types/enums";

export const TaskSchema = z.object({
	title: z.string().min(3).max(100),
	description: z.string().max(1000).optional(),
	date: z.string().refine((date) => new Date(date) > new Date(), {
		message: "Date must be in the future",
	}),
	priority: z.nativeEnum(Priority),
	projectId: z.number(),
	completed: z.boolean(),
});

export type Task = z.infer<typeof TaskSchema>;
