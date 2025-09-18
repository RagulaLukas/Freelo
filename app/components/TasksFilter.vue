<script setup lang="ts">
import {Priority} from "~/types/enums";
import {useTaskStore} from "~/stores/tasks";

const taskStore = useTaskStore();
</script>

<template>
	<div class="p-4 rounded-md shadow-md">
		<h2 class="text-lg font-semibold mb-4">Tasks Filter</h2>
		<div class="space-y-4">
			<div class="flex flex-row gap-4 flex-wrap">
				<UFormField label="Status" name="status" class="w-48">
					<USelect
						v-model="taskStore.statusFilter"
						:items="[
							{label: 'All', value: 'all'},
							{label: 'Pending', value: 'pending'},
							{label: 'Complete', value: 'complete'},
						]"
						class="w-full" />
				</UFormField>
				<UFormField label="Priority" name="priority" class="w-48">
					<USelect
						v-model="taskStore.priorityFilter"
						:items="[{label: 'All', value: 'all'}, ...Object.values(Priority).map((p) => ({label: p, value: p}))]"
						class="w-full" />
				</UFormField>
				<UFormField label="Order by" name="order" class="w-48">
					<USelect v-model="taskStore.sortType" :items="['date', 'title']" class="w-full" />
				</UFormField>
				<UFormField label="Sort" name="sort" class="w-48">
					<USelect v-model="taskStore.sortOrder" :items="['asc', 'desc']" class="w-full" />
				</UFormField>

				<UIcon
					v-if="taskStore.isFilterSet()"
					name="i-lucide-trash-2"
					class="size-5 text-red-500 mx-2 cursor-pointer mt-7"
					@click="taskStore.clearFilter()" />
			</div>
		</div>
	</div>
	<slot />
</template>

<!-- - Filter tasks by: - Completion status (all, active, completed) - Priority level - Sort tasks by due date or title -->
