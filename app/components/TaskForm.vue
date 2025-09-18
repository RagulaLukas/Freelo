<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {TaskSchema, type Task} from "~/schemas/task";
import {useTaskStore} from "~/stores/tasks";
import {v4 as uuidv4} from "uuid";
import {Priority} from "~/types/enums";
import type {TaskUuid} from "~/types/interfaces";

const taskStore = useTaskStore();

const props = defineProps<{task?: TaskUuid}>();
const emit = defineEmits<{(e: "cancel"): void}>();

const createDefaultTask = (): Task => ({
	title: "",
	description: "",
	date: "",
	priority: Priority.Low,
	projectId: 1,
	completed: false,
});

const formState = ref<Task>(createDefaultTask());

watchEffect(() => {
	formState.value = props.task ? {...props.task} : createDefaultTask();
});

function submitForm() {
	if (props.task) {
		// edit task
		taskStore.editTask({...formState.value, uuid: props.task.uuid});
	} else {
		// add task
		taskStore.addTask({...formState.value, uuid: uuidv4()});
	}
	resetForm();
}

function resetForm() {
	formState.value = createDefaultTask();
	// Emit event na zrusenie editu
	if (props.task) {
		emit("cancel");
	}
}
</script>

<template>
	<UForm
		:schema="TaskSchema"
		:state="formState"
		class="space-y-4 p-4 bg-slate-800 rounded-md min-w-md"
		@submit="submitForm">
		<UFormField label="Title" name="title">
			<UInput v-model="formState.title" class="w-full" />
		</UFormField>

		<UFormField label="Description" name="description">
			<UTextarea v-model="formState.description" class="w-full" />
		</UFormField>

		<UFormField label="Date" name="date">
			<UInput v-model="formState.date" type="date" class="w-full" placeholder="Select a date" />
		</UFormField>

		<!-- create projects later, create next form and store for projects -->
		<UFormField label="Project Id" name="projectId">
			<UInput v-model="formState.projectId" type="number" class="w-full" />
		</UFormField>

		<UFormField label="Priority" name="priority">
			<USelect v-model="formState.priority" :items="Object.values(Priority)" class="w-full" />
		</UFormField>

		<div class="flex gap-2">
			<UButton
				type="submit"
				:icon="props.task ? 'i-lucide-pencil' : 'i-lucide-rocket'"
				size="md"
				:color="props.task ? 'warning' : 'primary'"
				variant="outline">
				{{ props.task ? "Edit Task" : "Create Task" }}
			</UButton>

			<UButton v-if="props.task" icon="i-lucide-x" size="md" color="error" variant="outline" @click="resetForm">
				Stop Editing
			</UButton>
		</div>
	</UForm>
</template>
