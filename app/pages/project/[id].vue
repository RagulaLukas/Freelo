<script setup lang="ts">
import {useRoute} from "vue-router";
import {useTaskStore} from "~/stores/tasks";

const route = useRoute();
const taskStore = useTaskStore();
const task = ref();

taskStore.setProjectFilter(Number(route.params.id));
const onEditTask = (uuid: string) => {
	task.value = taskStore.getTaskByUuid(uuid);
};
</script>

<template>
	<div>
		<NuxtLink to="/"
			><UButton icon="i-lucide-x" class="cursor-pointer" size="lg" color="warning" variant="outline">
				Go back
			</UButton></NuxtLink
		>
		<TasksPage :tasks="taskStore.filteredTasks" @edit="onEditTask">
			<template #title>Projekt {{ taskStore.projectFilter }} </template>
			<template #form>
				<TaskForm :task="task" @cancel="task = undefined" />
			</template>
		</TasksPage>
	</div>
</template>
