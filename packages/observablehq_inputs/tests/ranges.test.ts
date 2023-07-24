import { range } from '@observablehq/inputs';
import { describe, expect, test } from 'vitest';

describe('range()', () => {
	test('returns an HTML form', () => {
		const form = range();
		expect(form.tagName).toBe('FORM');
	});

	test('with a range, stepping value, and default value', () => {
		const form = range([0, 100], {step: 1, value: 20});

		const div = form.children.item(0);
		expect(div?.tagName).toBe('DIV');
	
		const input = div?.children.item(0);
		expect(input?.tagName).toBe('INPUT');
		expect(input?.getAttribute('min')).toBe('0');
		expect(input?.getAttribute('max')).toBe('100');
		expect((input as HTMLInputElement).value).toBe('20');
	});

	test('with a fixed range', () => {
		const form = range([0, 1], {value: 0.12345, format: x => x.toFixed(3)});

		const div = form.children.item(0);
		expect(div?.tagName).toBe('DIV');

		const input = div?.children.item(0);
		expect(input?.tagName).toBe('INPUT');
		expect(input?.getAttribute('min')).toBe('0');
		expect(input?.getAttribute('max')).toBe('1');
		expect((input as HTMLInputElement).value).toBe('0.123');
	});

	describe('with a label', () => {
		test('as a string', () => {
			const numInput = range(
				[0, 100],
				{ label: 'dollars&pounds' },
			);
			expect(numInput.tagName).toEqual('FORM');
		
			const label = numInput.children.item(0);
			expect(label?.tagName).toBe('LABEL');
			expect(label?.childNodes[0]).toEqual(document.createTextNode('dollars&pounds'));
		});

		test('as HTML', () => {
			const customLabel = document.createElement('span');
			customLabel.textContent = 'foobar';

			const numInput = range(
				[0, 50],
				{ label: customLabel },
			);
			expect(numInput.tagName).toEqual('FORM');

			const label = numInput.children.item(0);
			expect(label?.tagName).toBe('LABEL');

			const span = label?.children.item(0);
			expect(span?.tagName).toBe('SPAN');
			expect(span?.textContent).toEqual('foobar');
		});
	});

	test('with a placeholder', () => {
		const myRange = range([0, 50], {placeholder: 'foobar'});
		const input = myRange.querySelector('input');

		expect(input).toBeTruthy();
		expect((input as HTMLInputElement).placeholder).toBe('foobar');
	});

	test('with a width', () => {
		const myRange = range([0, 100], {width: '20em'});
		const styles = myRange.style;

		expect(styles.getPropertyValue('--input-width')).toBe('20em');
	});
});
