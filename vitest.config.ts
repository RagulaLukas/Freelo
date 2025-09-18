import {defineConfig} from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "app"), // teraz ~ = app/
		},
	},
	test: {
		globals: true, // aby si mohol používať describe/it/expect bez importu
		environment: "jsdom", // potrebné pre .vue komponenty
		include: ["app/test/{unit,e2e}/**/*.{test,spec}.ts"],
		setupFiles: [], // tu môžeš pridať súbor na globálne setup (napr. Pinia)
	},
});
