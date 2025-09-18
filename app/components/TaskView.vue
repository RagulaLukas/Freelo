<script setup lang="ts">
import type {TaskUuid} from "~/types/interfaces";
import {useTaskStore} from "~/stores/tasks";

const taskStore = useTaskStore();
const {task} = defineProps<{task: TaskUuid}>();
const emit = defineEmits<{
	(e: "edit", uuid: string): void;
}>();
</script>

<template>
	<div class="block max-w-md min-w-md mx-auto bg-white rounded-xl">
		<!-- Header -->
		<div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer">
			<h2 class="text-xl font-bold text-gray-800">
				{{ task.title }}
			</h2>
			<div class="flex items-center gap-2">
				<span
					class="px-3 py-1 rounded-full text-sm font-semibold"
					:class="{
						'bg-green-100 text-green-800': task.completed,
						'bg-yellow-100 text-yellow-800': !task.completed,
					}">
					{{ task.completed ? "Completed" : "Pending" }}
				</span>
			</div>
		</div>

		<!-- Accordion content -->
		<div class="px-6 py-4 space-y-2">
			<p v-if="task.description" class="text-gray-700">{{ task.description }}</p>
			<NuxtLink :to="`/project/${task.projectId}`" class="text-gray-700 cursor-pointer font-bold hover:underline">
				Project: <span class="font-medium">{{ task.projectId }}</span>
			</NuxtLink>
			<div class="flex justify-between pt-2">
				<p class="text-gray-500 text-sm">
					Due: <span class="font-medium">{{ task.date }}</span>
				</p>
				<p class="text-gray-500 text-sm">
					Priority: <span class="font-medium capitalize">{{ task.priority }}</span>
				</p>
			</div>
		</div>
		<div class="px-6">
			<UIcon name="i-lucide-edit-2" class="size-5 text-blue-500 mx-2 cursor-pointer" @click="emit('edit', task.uuid)" />

			<UIcon
				v-if="!task.completed"
				name="i-lucide-check"
				class="size-5 text-green-500 mx-2 cursor-pointer"
				@click="taskStore.toggleComplete(task.uuid)" />
			<UIcon
				name="i-lucide-trash-2"
				class="size-5 text-red-500 mx-2 cursor-pointer"
				@click="taskStore.removeTask(task.uuid)" />
		</div>
	</div>
</template>
