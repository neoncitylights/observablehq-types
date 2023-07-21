import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			include: [
				'packages/tests/**/*.test.ts',
			],
			reporter: [ 'text', 'json', 'html' ],
		},
		environment: 'jsdom',
	},
});
