import { radio } from '@observablehq/inputs';
import { describe, expect, test } from 'vitest';

describe('radio()', () => {
	test('returns an HTML form with certain defaults', () => {
		const numInput = radio(['red', 'green', 'blue']);
		expect(numInput.tagName).toEqual('FORM');
	
		const div = numInput.children.item(0);
		expect(div?.tagName).toBe('DIV');
		expect(div?.children.length).toBe(3);
	});

	describe('with label', () => {
		test('can be a string', () => {
			const numInput = radio(
				['red', 'green', 'blue'],
				{ label: 'dollars&pounds'},
			);
			expect(numInput.tagName).toEqual('FORM');
		
			const label = numInput.children.item(0);
			expect(label?.tagName).toBe('LABEL');
			expect(label?.childNodes[0]).toEqual(document.createTextNode('dollars&pounds'));
		});

		test('can be an HTML element', () => {
			const customLabel = document.createElement('span');
			customLabel.textContent = 'foobar';

			const numInput = radio(
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
			const radios = radio([...'CXQZALORBNHTMJDVFGWSKEUPYI'], {sort: true});
			expect(radios.textContent?.trim()).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
		});

		test('`false` boolean literal', () => {
			const radios = radio([...'CXQZALORBNHTMJDVFGWSKEUPYI'], {sort: false});
			expect(radios.textContent?.trim()).toEqual('CXQZALORBNHTMJDVFGWSKEUPYI');
		});

		test('`ascending` string literal', () => {
			const radios = radio([...'CXQZALORBNHTMJDVFGWSKEUPYI'], {sort: 'ascending'});
			expect(radios.textContent?.trim()).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
		});

		test('`ascending` string literal', () => {
			const radios = radio([...'CXQZALORBNHTMJDVFGWSKEUPYI'], {sort: 'descending'});
			expect(radios.textContent?.trim()).toEqual('ZYXWVUTSRQPONMLKJIHGFEDCBA');
		});

		test('ascending sort function', () => {
			const radios = radio([...'CXQZALORBNHTMJDVFGWSKEUPYI'], {sort: (a, b) => a < b ? -1 : a > b ? 1 : 0});
			expect(radios.textContent?.trim()).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
		});
	});

	describe('can format an array of strings', () => {
		const numInput = radio(
			['red', 'green', 'blue'],
			{format: x => x.toUpperCase()},
		);
	
		test('returns an HTML form', () => {
			expect(numInput.tagName).toEqual('FORM');
		});

		const div = numInput.children.item(0);
		test('first child is a div element', () => {
			expect(div?.tagName).toBe('DIV');
		});
		test('first child has 3 children', () => {
			expect(div?.children.length).toBe(3);
		});
	
		const htmlCollectArray = Array.from(div?.children as HTMLCollection);
		test.each([
			[htmlCollectArray[0].textContent, 'RED'],
			[htmlCollectArray[1].textContent, 'GREEN'],
			[htmlCollectArray[2].textContent, 'BLUE'],
		])('values are all uppercase: %s => %s', (actual, expected) => {
			expect(actual).toBe(expected);
		});
	});

	describe('can format an array of objects', () => {
		const sportsTeamsRadio = radio(
			[
				{name: 'Lakers', location: 'Los Angeles, California'},
				{name: 'Warriors', location: 'San Francisco, California'},
				{name: 'Celtics', location: 'Boston, Massachusetts'},
				{name: 'Nets', location: 'New York City, New York'},
				{name: 'Raptors', location: 'Toronto, Ontario'},
			],
			{
				label: 'Favorite team',
				format: x => x.name,
			},
		);
		test('returns an HTML form', () => {
			expect(sportsTeamsRadio.tagName).toEqual('FORM');
		});
	
		const div = sportsTeamsRadio.children.item(1);
		test('second child is a div element', () => {
			expect(div?.tagName).toBe('DIV');
		});
		test('second child has 5 children', () => {
			expect(div?.children.length).toBe(5);
		});
	
		const htmlCollectArray = Array.from(div?.children as HTMLCollection);
		test.each([
			[htmlCollectArray[0].textContent, 'Lakers'],
			[htmlCollectArray[1].textContent, 'Warriors'],
			[htmlCollectArray[2].textContent, 'Celtics'],
			[htmlCollectArray[3].textContent, 'Nets'],
			[htmlCollectArray[4].textContent, 'Raptors'],
		])('shows team name: %s => %s', (actual, expected) => {
			expect(actual).toBe(expected);
		});
	});

	describe('can format a Map instance', () => {
		const formMap = radio(
			new Map([
				['red', '#f00'],
				['green', '#0f0'],
				['blue', '#00f'],
			]),
			{
				format: ([key, value]) => `${key} (${value})`,
			},
		);
		test('returns an HTML form', () => {
			expect(formMap.tagName).toEqual('FORM');
		});

		const div = formMap.children.item(0);
		test('second child is a div element', () => {
			expect(div?.tagName).toBe('DIV');
		});
		test('second child has 5 children', () => {
			expect(div?.children.length).toBe(3);
		});

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
