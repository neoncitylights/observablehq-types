import { button } from '@observablehq/inputs';
import { describe, expect, expectTypeOf, test } from 'vitest';

describe('button()', () => {
	test('returns an HTML form', () => {
		const clickMe = button();

		expect(clickMe.tagName).toEqual('FORM');
		expectTypeOf<HTMLFormElement>(clickMe);
	});

	test('with a string', () => {
		const clickMe = button('Click me');

		expect(clickMe.textContent).toEqual('Click me');
	});

	test('with an HTML element', () => {
		const boldText = document.createElement('b');
		boldText.textContent = 'WOW';

		const clickMe = button(boldText);
		expect(clickMe.querySelector('b')).not.toBeNull();
	});

	describe('with an array of tuples', () => {
		test('with inferred reducer functions', () => {
			const clickMe = button<number>([
				['Increment', value => value + 1],
				['Decrement', value => value - 1],
				['Reset', () => 0],
			], {label: 'Counter', value: 0});
	
			expectTypeOf<HTMLFormElement>(clickMe);
	
			// 3 button elements, 1 label element
			expect(clickMe.children.length).toEqual(4);
		});
	});

	describe('with a label', () => {
		test('as a string', () => {
			const someButton = button('OK', {
				label: 'dollars&pounds',
			});

			expect(someButton.firstElementChild?.tagName).toBe('LABEL');
			expect(someButton.firstElementChild?.textContent).toBe('dollars&pounds');
		});

		test('as HTML', () => {
			const boldText = document.createElement('b');
			boldText.textContent = 'intensity';

			const someButton = button('OK', {
				label: boldText,
			});

			expect(someButton.firstElementChild?.tagName).toBe('LABEL');
			expect(someButton.firstElementChild?.textContent).toBe('intensity');
			expect(someButton.firstElementChild?.firstElementChild?.tagName).toBe('B');
		});
	});

	test('can be disabled', () => {
		const someButton = button('OK', {disabled: true});

		expect(someButton.children.item(0)?.hasAttribute('disabled')).toBe(true);
	});

	test('with a width', () => {
		const someButton = button('OK', {width: '20em'});
		const buttonElement = someButton.children.item(0) as HTMLElement;
		const buttonStyle = buttonElement.style;

		expect(buttonStyle.getPropertyValue('width')).toBe('20em');
	});
});
