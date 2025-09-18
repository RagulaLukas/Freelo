<script setup lang="ts">
import {useTaskStore} from "~/stores/tasks";

const taskStore = useTaskStore();
</script>

<template>
	<TransitionGroup name="task" tag="div" class="flex flex-row flex-wrap transition-all duration-300 justify-center">
		<TaskView
			v-for="task in taskStore.filteredTasks"
			:key="task.uuid"
			:task="task"
			:data-task="task.uuid"
			class="my-4 block"
			@edit="$emit('edit', $event)" />
	</TransitionGroup>
</template>
