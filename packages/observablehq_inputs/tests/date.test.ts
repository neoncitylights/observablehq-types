import { date, datetime } from '@observablehq/inputs';
import { describe, expectTypeOf, test } from 'vitest';

describe('date()', () => {
	test('returns an HTML form', () => {
		const start = date({label: 'Start', value: '2021-09-21'});
		expectTypeOf<HTMLFormElement>(start);
	});
});

describe('datetime()', () => {
	test('returns an HTML form', () => {
		const start = datetime({label: 'Moment'});
		expectTypeOf<HTMLFormElement>(start);
	});
});
