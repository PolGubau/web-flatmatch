import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			exclude: [
				"node_modules/",
				"**/index.ts",
				"**/theme.ts",
				"**/types.ts",
				"**/empty.ts",
				"src/testing/setupTests.tsx",
				"src/**/*.test.tsx",
				"src/**/*.d.ts",
				"src/**/*.cy.tsx",
				"src/index.tsx",
				"src/reportWebVitals.ts",
				"src/assets/**/*",
				"src/data/**/*",
			],
			include: ["src/**/*.{ts,tsx}"],
			provider: "v8",
			reporter: ["json-summary", "text"],
			thresholds: {
				branches: 0,
				functions: 0,
				lines: 0,
				statements: 0,
			},
		},
		environment: "jsdom",
		globals: true,
		setupFiles: "./vitest.setup.ts",
	},
});
