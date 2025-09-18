// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: {enabled: true},
	modules: ["@nuxt/eslint", "@nuxt/test-utils", "@nuxt/ui", "@pinia/nuxt", "@nuxt/test-utils/module"],
	css: ["~/assets/css/main.css"],
	pinia: {
		storesDirs: ["~/stores/**"],
	},
	ssr: false,
	app: {
		pageTransition: {name: "page", mode: "out-in"},
	},
});
