import { checkbox } from '@observablehq/inputs';
import { describe, expect, expectTypeOf, test } from 'vitest';

describe('checkbox()', () => {
	test('returns an HTML form with certain defaults', () => {
		const clickMe = checkbox(['red', 'green', 'blue']);
		expectTypeOf<HTMLFormElement>(clickMe);
	});

	test('the first child should be a div, with 3 checkboxes', () => {
		const form = checkbox(['red', 'green', 'blue']);
		expect(form.children.item(0)).not.toBeNull();

		const div = form.children.item(0) as Element;
		expect(div.children.length).toBe(3);
	});

	describe('with label', () => {
		test('as a string', () => {
			const checkboxes = checkbox(['red', 'green', 'blue'], {label: 'dollars&pounds'});
			const label = checkboxes.children.item(0);

			expect(label?.tagName).toBe('LABEL');
			expect(label?.childNodes[0]).toEqual(document.createTextNode('dollars&pounds'));
		});

		test('as HTML', () => {
			const customLabel = document.createElement('span');
			customLabel.textContent = 'foobar';

			const numInput = checkbox(
				['red', 'green', 'blue'],
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

	describe('with `sort` property set as', () => {
		test('`true` boolean literal', () => {
			const checkboxes = checkbox([...'CXQZALORBNHTMJDVFGWSKEUPYI'], {sort: true});
			expect(checkboxes.textContent?.trim()).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
		});

		test('`false` boolean literal', () => {
			const checkboxes = checkbox([...'CXQZALORBNHTMJDVFGWSKEUPYI'], {sort: false});
			expect(checkboxes.textContent?.trim()).toEqual('CXQZALORBNHTMJDVFGWSKEUPYI');
		});

		test('`ascending` string literal', () => {
			const checkboxes = checkbox([...'CXQZALORBNHTMJDVFGWSKEUPYI'], {sort: 'ascending'});
			expect(checkboxes.textContent?.trim()).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
		});

		test('`ascending` string literal', () => {
			const checkboxes = checkbox([...'CXQZALORBNHTMJDVFGWSKEUPYI'], {sort: 'descending'});
			expect(checkboxes.textContent?.trim()).toEqual('ZYXWVUTSRQPONMLKJIHGFEDCBA');
		});

		test('ascending sort function', () => {
			const checkboxes = checkbox([...'CXQZALORBNHTMJDVFGWSKEUPYI'], {sort: (a, b) => a < b ? -1 : a > b ? 1 : 0});
			expect(checkboxes.textContent?.trim()).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
		});
	});

	describe('can format', () => {
		describe('an array of strings', () => {
			const form = checkbox(['red', 'green', 'blue'], {
				format: s => s.toUpperCase(),
			});
			const div = form.children.item(0);
			const htmlCollectArray = Array.from(div?.children as HTMLCollection);
			test.each([
				[htmlCollectArray[0].textContent, 'RED'],
				[htmlCollectArray[1].textContent, 'GREEN'],
				[htmlCollectArray[2].textContent, 'BLUE'],
			])('shows formatted key-value pair: %s => %s', (actual, expected) => {
				expect(actual).toBe(expected);
			});
		});

		describe('a map of string keys and string values', () => {
			const form = checkbox(
				new Map([
					['red', '#f00'],
					['green', '#0f0'],
					['blue', '#00f'],
				]), {
					format: ([key, value]) => `${key} (${value})`,
				},
			);

			const div = form.children.item(0);
			const htmlCollectArray = Array.from(div?.children as HTMLCollection);
			test.each([
				[htmlCollectArray[0].textContent, 'red (#f00)'],
				[htmlCollectArray[1].textContent, 'green (#0f0)'],
				[htmlCollectArray[2].textContent, 'blue (#00f)'],
			])('shows formatted key-value pair: %s => %s', (actual, expected) => {
				expect(actual).toBe(expected);
			});
		});
	});
});
