import { textarea } from '@observablehq/inputs';
import { describe, expectTypeOf, test } from 'vitest';

describe('textarea()', () => {
	test('returns an HTML form', () => {
		const text = textarea();
		expectTypeOf<HTMLFormElement>(text);
	});
});
