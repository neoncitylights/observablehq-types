import { formatDate, formatLocaleNumber, formatTrim } from '@observablehq/inputs';
import { describe, expect, expectTypeOf, test } from 'vitest';

describe('formatDate()', () => {
	test('formats a date', () => {
		const date = new Date('2023-07-22T03:15:48+0000');
		expect(formatDate(date)).toEqual('2023-07-22T03:15:48Z');
	});
	test('returns error message on invalid date', () => {
		const date = new Date('2023-0722T03:15:48+0000');
		expect(formatDate(date)).toEqual('Invalid Date');
	});
});

describe('formatLocaleNumber()', () => {
	test('returns a localized number', () => {
		const formatNumber = formatLocaleNumber('en');
		const formatted = formatNumber(2_000_000);
	
		expect(formatted).toEqual('2,000,000');
		expectTypeOf<string>(formatted);
	});
});

describe('formatTrim()', () => {
	test('works with a string literal', () => {
		const valueToTrim = '2.00100';
		const trim = formatTrim(valueToTrim);

		expectTypeOf<string>(trim);
	});
});
