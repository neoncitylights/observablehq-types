import { button } from '@observablehq/inputs';
import { describe, expect, expectTypeOf, test } from 'vitest';

describe('button()', () => {
	test('returns an HTML form', () => {
		const clickMe = button('OK', { label: 'Click me' });
		expectTypeOf<HTMLFormElement>(clickMe);
	});

	test('works given an array of tuples with inferred reducer functions', () => {
		const clickMe = button<number>([
			['Increment', value => value + 1],
			['Decrement', value => value - 1],
			['Reset', () => 0],
		], {label: 'Counter', value: 0});

		expectTypeOf<HTMLFormElement>(clickMe);

		// 3 button elements, 1 label element
		expect(clickMe.children.length).toEqual(4);
	});
});
