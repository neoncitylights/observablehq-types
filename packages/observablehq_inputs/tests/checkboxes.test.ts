import { checkbox } from '@observablehq/inputs';
import { describe, expect, expectTypeOf, test } from 'vitest';

describe('checkbox()', () => {
	test('returns an HTML form', () => {
		const clickMe = checkbox(['red', 'green', 'blue']);
		expectTypeOf<HTMLFormElement>(clickMe);
	});

	test('the first child should be a div, with 3 checkboxes', () => {
		const form = checkbox(['red', 'green', 'blue']);
		expect(form.children.item(0)).not.toBeNull();

		const div = form.children.item(0) as Element;
		expect(div.children.length).toBe(3);
	});

	test('can format an array of strings', () => {
		const form = checkbox(['red', 'green', 'blue'], {
			format: s => s.toLowerCase(),
		});
		expectTypeOf<HTMLFormElement>(form);
	});

	test('can format a map of string keys and string values', () => {
		const form = checkbox(
			new Map([
				['red', '#f00'],
				['green', '#0f0'],
				['blue', '#00f'],
			]), {
				format: ([key, value]) => `${key} (${value})`,
			},
		);
		expectTypeOf<HTMLFormElement>(form);
	});
});
