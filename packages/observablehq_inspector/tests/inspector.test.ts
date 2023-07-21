import { Inspector } from '@observablehq/inspector';
import { describe, expect, expectTypeOf, test } from 'vitest';
import '../.';

test('inspector constructor', () => {
	expectTypeOf(Inspector).toBeConstructibleWith(document.createElement('div'));
});

test('inspector.pending()', () => {
	const div = document.createElement('div');
	const inspector = new Inspector(div);

	expectTypeOf(inspector.pending()).toBeVoid();
});

test('inspector.fulfilled()', () => {
	const div = document.createElement('div');
	const inspector = new Inspector(div);

	expectTypeOf(inspector.fulfilled(2, 'test')).toBeVoid();
});

test('inspector.rejected()', () => {
	const p = document.createElement('p');
	const inspector = new Inspector(p);

	expectTypeOf(inspector.rejected('an error occurred')).toBeVoid();
});

describe('inspector.into()', () => {
	test('to throw an error', () => {
		expect(() => Inspector.into('test'))
			.toThrowError('container not found');
	});

	test('to not throw an error', () => {
		const uniqueId = 'thingymabob';
	
		const p = document.createElement('p');
		p.setAttribute('id', uniqueId);
		document.body.appendChild(p);

		expect(() => Inspector.into('#' + uniqueId)).not.toThrowError();
	});
});
