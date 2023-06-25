import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			include: [
				'**/tests/**/*.test.ts',
			],
			reporter: [ 'text', 'json', 'html' ],
		},
		environment: 'jsdom'
	},
});
