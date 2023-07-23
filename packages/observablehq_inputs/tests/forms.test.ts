import { form, range } from '@observablehq/inputs';
import { describe, expect, test } from 'vitest';

describe('form()', () => {
	test('returns a div element', () => {
		const htmlForm = form([
			range([0, 255], {step: 1, label: 'r'}),
			range([0, 255], {step: 1, label: 'g'}),
			range([0, 255], {step: 1, label: 'b'}),
		]);
		
		expect(htmlForm.tagName).toEqual('DIV');
	});

	describe('with an array', () => {
		test('and template function using a for..in loop', () => {
			const htmlForm = form<HTMLSpanElement>([
				range([0, 255], {step: 1, label: 'r'}),
				range([0, 255], {step: 1, label: 'g'}),
				range([0, 255], {step: 1, label: 'b'}),
			], {
				template: (inputs) => {
					const span = document.createElement('span');
					for(const input of inputs) {
						span.appendChild(input);
					}
					return span;
				},
			});
	
			expect(htmlForm.tagName).toEqual('SPAN');
			expect(htmlForm.childElementCount).toBe(3);
		});
	});

	describe('with an object', () => {
		test('and template function calling a for...in loop', () => {
			const htmlForm = form({
				r: range([0, 255], {step: 1, label: 'r'}),
				g: range([0, 255], {step: 1, label: 'g'}),
				b: range([0, 255], {step: 1, label: 'b'}),
			}, {
				template: (inputs) => {
					const span = document.createElement('span');
					for(const property in inputs) {
						span.append(inputs[property]);
					}
					return span;
				},
			});
	
			expect(htmlForm.tagName).toEqual('SPAN');
			expect(htmlForm.childElementCount).toBe(3);
		});

		test('and template function calling Object.entries()', () => {
			const htmlForm = form({
				r: range([0, 255], {step: 1, label: 'r'}),
				g: range([0, 255], {step: 1, label: 'g'}),
				b: range([0, 255], {step: 1, label: 'b'}),
			}, {
				template: (inputs) => {
					const span = document.createElement('span');
					for(const [, value] of Object.entries(inputs)) {
						span.append(value);
					}
					return span;
				},
			});
	
			expect(htmlForm.tagName).toEqual('SPAN');
			expect(htmlForm.childElementCount).toBe(3);
		});
	});
});
