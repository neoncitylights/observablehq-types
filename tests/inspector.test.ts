import { describe, expect, expectTypeOf, test } from 'vitest';
import { Inspector } from '@observablehq/inspector';
import './../src/inspector.d.ts';

test('inspector constructor', () => {
	expectTypeOf(Inspector).toBeConstructibleWith(document.createElement('div'))
})

test('inspector.pending()', () => {
	let div = document.createElement('div');
	let inspector = new Inspector(div);

	expectTypeOf(inspector.pending()).toBeVoid();
})

test('inspector.fulfilled()', () => {
	let div = document.createElement('div');
	let inspector = new Inspector(div);

	expectTypeOf(inspector.fulfilled(2, 'test')).toBeVoid();
})

test('inspector.rejected()', () => {
	let p = document.createElement('p');
	let inspector = new Inspector(p);

	expectTypeOf(inspector.rejected('an error occurred')).toBeVoid()
})

describe('inspector.into()', () => {
	test('to throw an error', () => {
		expect(() => Inspector.into('test'))
			.toThrowError('container not found')
	})

	test('to not throw an error', () => {
		let uniqueId = 'thingymabob';
	
		let p = document.createElement('p');
		p.setAttribute('id', uniqueId);
		document.body.appendChild(p);

		expect(() => Inspector.into('#' + uniqueId)).not.toThrowError()
	})
})
