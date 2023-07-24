import { date, datetime } from '@observablehq/inputs';
import { describe, expect, test } from 'vitest';

describe('date()', () => {
	test('returns an HTML form', () => {
		const start = date();

		expect(start.tagName).toEqual('FORM');
	});

	describe('with a label', () => {
		test('as a string', () => {
			const start = date({label: 'Start'});

			expect(start.tagName).toEqual('FORM');
			expect(start.children.item(0)).not.toBeNull();
			expect(start.children.item(0)?.textContent).toEqual('Start');
		});
	});

	test('with a value', () => {
		const start = date({value: '2021-09-21'});

		expect(start.tagName).toEqual('FORM');

		const div = start.children.item(0);
		expect(div?.tagName).toBe('DIV');
	
		const input = div?.children.item(0);
		expect(input?.tagName).toBe('INPUT');
		expect((input as HTMLInputElement).value).toBe('2021-09-21');
	});
});

describe('datetime()', () => {
	test('returns an HTML form', () => {
		const start = datetime();

		expect(start.tagName).toEqual('FORM');
	});

	describe('with a label', () => {
		test('as a string', () => {
			const start = datetime({label: 'dollars & pounds'});

			expect(start.tagName).toEqual('FORM');
			expect(start.children.item(0)).not.toBeNull();
			expect(start.children.item(0)?.textContent).toEqual('dollars & pounds');
		});
	});

	test('with a value', () => {
		const start = datetime({value: '2018-06-12T19:30'});

		expect(start.tagName).toEqual('FORM');

		const div = start.children.item(0);
		expect(div?.tagName).toBe('DIV');
	
		const input = div?.children.item(0);
		expect(input?.tagName).toBe('INPUT');
		expect((input as HTMLInputElement).value).toBe('2018-06-12T19:30');
	});
});
