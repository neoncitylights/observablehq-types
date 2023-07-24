import { number } from '@observablehq/inputs';
import { describe, expect, test } from 'vitest';

describe('number()', () => {
	test('returns an HTML form with defaults', () => {
		const numInput = number();

		expect(numInput.tagName).toEqual('FORM');
		
		const div = numInput.children.item(0);
		expect(div?.tagName).toBe('DIV');
	
		const input = div?.children.item(0);
		expect(input?.tagName).toBe('INPUT');
		expect(input?.getAttribute('step')).toBe('any');
		expect(input?.getAttribute('name')).toBe('number');
	});

	test('with a range, stepping value, and default value', () => {
		const numInput = number([0, 100], { step: 1, value: 20});

		const div = numInput.children.item(0);
		expect(div?.tagName).toBe('DIV');
	
		const input = div?.children.item(0);
		expect(input?.tagName).toBe('INPUT');
		expect(input?.getAttribute('min')).toBe('0');
		expect(input?.getAttribute('max')).toBe('100');
		expect((input as HTMLInputElement).value).toBe('20');
	});
});
