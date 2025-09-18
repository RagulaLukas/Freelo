<script setup lang="ts">
import {useTaskStore} from "~/stores/tasks";
import type {TaskUuid} from "~/types/interfaces";

const taskStore = useTaskStore();
const task = ref<TaskUuid | undefined>(undefined);
taskStore.setProjectFilter(null);
const onEditTask = (uuid: string) => {
	task.value = taskStore.getTaskByUuid(uuid);
};
</script>

<template>
	<TasksPage :tasks="taskStore.filteredTasks" @edit="onEditTask">
		<template #title>Freelo</template>
		<template #form>
			<TaskForm :task="task" @cancel="task = undefined" />
		</template>
	</TasksPage>
</template>
