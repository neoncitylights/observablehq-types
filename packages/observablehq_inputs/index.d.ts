declare module '@observablehq/inputs' {
	/******* Utilities *******/
	// bind.js
	export function bind(
		target: HTMLInputElement,
		source: HTMLInputElement,
		invalidation = disposal(target)
	): void;

	// disposal.js
	export function disposal(element: Element): Promise<void>;

	// form.js
	export type OhqInputFormContent =
		| HTMLInputElement[]
		| { [key: string|number]: HTMLInputElement };
	export type OhqInputFormOptions<T extends HTMLElement> = {
		template: (inputs: OhqInputFormContent) => T
	};
	export function form(content: OhqInputFormContent): HTMLDivElement;
	export function form<T extends HTMLElement>(content: OhqInputFormContent, options: OhqInputFormOptions<T>): T;

	// format.js
	export function formatDate(value: Date): string;
	export function formatLocaleAuto(value: null): '';
	export function formatLocaleAuto<T>(locale?: string): (value: T) => string;
	export function formatLocaleNumber(locale?: string): (value: number) => string;
	export function formatTrim<T extends { toString(): string }>(value: T): string;

	// input.js
	export type OhqInputEventTarget = EventTarget & {
		value: T,
	};
	export function input<T>(value: T): OhqInputEventTarget;


	/******* HTML inputs *******/
	export type OhqInputFormatFn<T> = (value: T, index?: number, data?: T[]) => string;
	export type OhqInputLabel = 
		| string
		| HTMLElement;

	export type OhqInputSort =
		| boolean
		| 'ascending'
		| 'descending'
		| ((a: T, v: T) => number);

	export type OhqInputKeyOfFn = (value: HTMLInputElement) => string;
	export type OhqInputValueOfFn = (value: HTMLInputElement) => string;

	// button.js
	export type OhqInputButtonReduceFn<T> = (value: T) => T;
	export type OhqInputButtonContent<T> = 
		| string
		| [OhqInputLabel, OhqInputButtonReduceFn<T>][];

	export type OhqInputButtonOptions = {
		label?: OhqInputLabel,
		required?: boolean,
		value?: number,
		reduce?: (n: number) => void,
		width?: string,
		disabled?: boolean,
	};

	export function button<T>(content: OhqInputButtonContent<T>, options?: OhqInputButtonOptions): HTMLFormElement;

	// checkbox.js
	export type OhqInputCheckboxContent = 
		| string[]
		| Map<string, string>;
	export type OhqInputCheckboxOptions = {
		label?: OhqInputLabel,
		sort?: OhqInputSort,
		unique?: boolean,
		locale?: string,
		format?: OhqInputFormatFn<string>,
		keyof?: OhqInputKeyOfFn,
		valueof?: OhqInputValueOfFn,
		key?: string,
		value?: string[],
		disabled?: boolean|string[],
	};
	export function checkbox(content: OhqInputCheckboxContent, options?: OhqInputCheckboxOptions): HTMLFormElement;

	// toggle.js
	export type OhqInputToggleOptions<T, U> = {
		label?: OhqInputLabel,
		values?: [T, U],
		value?: any,
		disabled?: boolean,
	};
	export function toggle(options?: OhqInputToggleOptions): HTMLFormElement;

	// radio.js
	export type OhqInputRadioOptions = {
		label?: OhqInputLabel,
		sort?: OhqInputSort,
		unique?: boolean,
		locale?: string,
		format?: OhqInputFormatFn,
		keyof?: OhqInputKeyOfFn,
		valueof?: OhqInputValueOfFn,
		value?: any,
		disabled?: boolean|string[],
	};
	export function radio<T>(data: T, options?: OhqInputRadioOptions): HTMLFormElement;

	// range.js
	export type OhqInputRangeOptions = {
		label?: OhqInputLabel,
		step?: number,
		format?: OhqInputFormatFn,
		placeholder?: string,
		transform?: unknown,
		invert?: unknown,
		validate?: (n: number) => boolean,
		value?: number,
		width?: string,
		disabled?: boolean,
	};
	export function range(
		content?: [number, number] = [0, 1],
		options?: OhqInputRangeOptions
	): HTMLFormElement;

	// number.js
	export function number(
		content?: [number, number] = [-Infinity, Infinity],
		options?: OhqInputRangeOptions,
	): HTMLFormElement;

	// search.js
	export type OhqHtmlBoolean = boolean|'on'|'off';
	export type OhqInputSearchOptions = {
		label?: OhqInputLabel,
		query?: string|string[],
		placeholder?: string,
		columns: string[],
		locale?: string,
		format?: OhqInputFormatFn,
		spellcheck?: boolean,
		autocomplete?: OhqHtmlBoolean,
		autocapitalize?: OhqHtmlBoolean,
		filter?: unknown,
		width?: number|string,
		datalist?: Iterable<any>,
		disabled?: boolean,
		required?: boolean,
	};
	export function search<T>(content: T[], options?: OhqInputSearchOptions): HTMLFormElement;

	// select.js
	export type OhqInputSelectOptions = {
		label?: OhqInputLabel,
		multiple?: boolean,
		size?: number,
		sort?: OhqInputSort,
		unique?: boolean,
		locale?: string,
		format?: OhqInputFormatFn,
		keyof?: OhqInputKeyOfFn,
		valueof?: OhqInputValueOfFn,
		value?: string[],
		width?: number,
		disabled?: boolean,
	};
	export function select<T>(data: T[], options?: OhqInputSelectOptions): HTMLFormElement;

	// table.js
	export type OhqTableLayout = 'auto' | 'fixed' | 'initial' | 'revert' | 'revert-layer' | 'unset';
	export type OhqTableAlignment = 'left' | 'right' | 'center';
	export type OhqTableOptions = {
		columns?: string[],
		value?: unknown,
		rows?: number,
		sort?: string|null,
		reverse?: boolean,
		format: { [key: string]: OhqInputFormatFn },
		align?: { [key: string]: OhqTableAlignment },
		header?: { [key: string]: string } | string | HTMLElement,
		width?: number | { [key: string]: number },
		maxWidth?: number,
		height?: number,
		maxHeight?: number,
		layout?: OhqTableLayout,
		required?: boolean,
		multiple?: boolean,
	};
	export function table<T>(data: T[], options?: OhqTableOptions): HTMLTableElement;

	/** HTML text inputs */
	export type OhqInputType = 
		| 'button'
		| 'checkbox'
		| 'color'
		| 'date'
		| 'datetime'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'reset'
		| 'search'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week';

	export type InputAttrAutocapitalize =
		| OhqHtmlBoolean
		| 'none'
		| 'sentences'
		| 'words'
		| 'characters';
	
	export type OhqInputTextOptions = {
		label?: OhqInputLabel,
		type?: OhqInputType,
		value?: string|number|null,
		placeholder?: string|number|null,
		spellcheck?: boolean,
		autocomplete?: OhqHtmlBoolean | string & {}, // eslint-disable-line @typescript-eslint/ban-types
		autocapitalize?: InputAttrAutocapitalize,
		pattern?: string,
		minlength?: number,
		maxlength?: number,
		min?: number|string,
		max?: number|string,
		required?: number,
		validate?: (input: string) => boolean,
		submit?: boolean,
		datalist?: unknown,
		readonly?: boolean,
		disabled?: boolean,
	};
	export type OhqInputTextOptionsWithoutType = Exclude<OhqInputTextOptions, 'type'>;

	export function text(options?: OhqInputTextOptions): HTMLFormElement;
	export function email(options?: OhqInputTextOptionsWithoutType): HTMLFormElement;
	export function tel(options?: OhqInputTextOptionsWithoutType): HTMLFormElement;
	export function url(options?: OhqInputTextOptionsWithoutType): HTMLFormElement;
	export function password(options?: OhqInputTextOptionsWithoutType): HTMLFormElement;

	// color.js
	type OhqInputColorExcludedOptions = 
		| 'placeholder'
		| 'pattern'
		| 'spellcheck'
		| 'autocomplete'
		| 'autocapitalize'
		| 'min'
		| 'max'
		| 'minlength'
		| 'maxlength';
	export type OhqInputColorOptions = Exclude<OhqInputTextOptionsWithoutType, OhqInputColorExcludedOptions>;
	export function color(options?: OhqInputColorOptions): HTMLFormElement;
}

// declare module '@observablehq/inputs/array' {
// 	export function arrayify<T>(array: Iterable<unknown>|ArrayLike<unknown>): T[];
// 	export function iterable(array: any): boolean;
// }
//
// declare module '@observablehq/inputs/event' {
// 	export function preventDefault(event: Event): void;
// 	export function dispatchEvent(target: EventTarget): void;

// 	export type HTMLElementWithCheckableValidity =
// 		| HTMLButtonElement
// 		| HTMLSelectElement
// 		| HTMLInputElement
// 		| HTMLTextAreaElement
// 		| HTMLFormElement
// 		| HTMLFieldSetElement
// 		| HTMLObjectElement;
// 	export function checkValidity(input: HTMLElementWithCheckableValidity): boolean;
// 	export function checkValidity(input: HTMLElement & { checkValidity(): boolean }): boolean;
// }

// declare module '@observablehq/inputs/format' {
// 	export function stringify<T>(x: T|null): string;
// }

// declare module '@observablehq/inputs/id' {
// 	export function newId(): `__ns__-${number}`;
// }

// declare module '@observablehq/inputs/intern' {
// 	export function intern<T>(value: T): T|object;
// }
