<script setup lang="ts"></script>

<template>
	<div class="h-full w-full flex flex-col items-center gap-6">
		<h1 class="text-4xl font-bold mt-8 text-white">
			<slot name="title" />
		</h1>

		<slot name="form" />

		<div class="w-full px-4">
			<TasksFilter>
				<TasksList @edit="$emit('edit', $event)" />
			</TasksFilter>
		</div>
	</div>
</template>
