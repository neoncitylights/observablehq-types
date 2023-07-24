// utilities
declare module '@observablehq/inputs' {
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
		| OhqInputFormArray
		| OhqInputFormObject;
	export type OhqInputFormArray = HTMLFormElement[];
	export type OhqInputFormObject = {
		[key: string|number]: HTMLFormElement,
	};

	export type OhqInputFormOptions<T extends HTMLElement = HTMLElement, U> = {
		template: (inputs: U) => T
	};

	export function form(content: OhqInputFormContent): HTMLDivElement;
	export function form<T extends HTMLElement>(content: OhqInputFormArray, options: OhqInputFormOptions<T, OhqInputFormArray>): T;
	export function form<T extends HTMLElement>(content: OhqInputFormObject, options: OhqInputFormOptions<T, OhqInputFormObject>): T;

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
}

// HTML inputs
declare module '@observablehq/inputs' {
	export type OhqInputFormatFn<T> = (value: T, index?: number, data?: T[]) => string;
	export type OhqInputValidateFn<T> = (value: T) => boolean;
	export type OhqInputValidateTextFn = OhqInputValidateTextFn<string>;
	export type OhqInputLabel =
		| string
		| HTMLElement;

	export type OhqInputSort<T> =
		| boolean
		| 'ascending'
		| 'descending'
		| OhqInputSortFn<T>;
	export type OhqInputSortFn<T> = (a: T, v: T) => number;

	export type OhqInputKeyOfFn = (value: HTMLInputElement) => string;
	export type OhqInputValueOfFn = (value: HTMLInputElement) => string;


	// button.js
	export type OhqInputButtonReduceFn<T> = (value: T) => T;
	export type OhqInputButtonContent<T> = 
		| string
		| HTMLElement
		| [OhqInputLabel, OhqInputButtonReduceFn<T>][];

	export type OhqInputButtonOptions = {
		label?: OhqInputLabel,
		required?: boolean,
		value?: number,
		reduce?: (n: number) => void,
		width?: string,
		disabled?: boolean,
	};

	export function button<T>(content?: OhqInputButtonContent<T>, options?: OhqInputButtonOptions): HTMLFormElement;


	// checkbox.js
	export type OhqInputCheckboxOptions<T> = {
		label?: OhqInputLabel,
		sort?: OhqInputSort<T>,
		unique?: boolean,
		locale?: string,
		format?: OhqInputFormatFn<T>,
		keyof?: OhqInputKeyOfFn,
		valueof?: OhqInputValueOfFn,
		key?: string,
		value?: string[],
		disabled?: boolean|string[],
	};
	export function checkbox<T>(content: T[], options?: OhqInputCheckboxOptions<T>): HTMLFormElement;
	export function checkbox<K, V>(content: Map<K, V>, options?: OhqInputCheckboxOptions<[K, V]>): HTMLFormElement;


	// toggle.js
	export type OhqInputToggleOptions<T> = {
		label?: OhqInputLabel,
		values?: [T, T],
		value?: boolean,
		disabled?: boolean,
	};
	export function toggle<T>(options?: OhqInputToggleOptions<T>): HTMLFormElement;


	// radio.js
	export type OhqInputRadioOptions<T> = {
		label?: OhqInputLabel,
		sort?: OhqInputSort<T>,
		unique?: boolean,
		locale?: string,
		format?: OhqInputFormatFn<T>,
		keyof?: OhqInputKeyOfFn,
		valueof?: OhqInputValueOfFn,
		value?: T|null,
		disabled?: boolean|string[],
	};
	export function radio<T>(data: T[], options?: OhqInputRadioOptions<T>): HTMLFormElement;
	export function radio<K, V>(data: Map<K, V>, options?: OhqInputRadioOptions<[K, V]>): HTMLFormElement;


	// range.js
	export type OhqInputRangeTransformFn = (n: number) => number;
	export type OhqInputRangeOptions = {
		label?: OhqInputLabel,
		step?: number,
		format?: OhqInputFormatFn<number>,
		placeholder?: string,
		transform?: OhqInputRangeTransformFn,
		invert?: OhqInputRangeTransformFn,
		validate?: OhqInputValidateFn<number>,
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
	export type OhqInputSearchOptions<T> = {
		label?: OhqInputLabel,
		query?: string,
		placeholder?: string,
		columns: string[],
		locale?: string,
		format?: OhqInputFormatFn<T>,
		spellcheck?: boolean,
		autocomplete?: InputAttrAutocomplete,
		autocapitalize?: InputAttrAutocapitalize,
		filter?: <T>(query: string) => (val: T) => boolean,
		width?: number|string,
		datalist?: string[],
		disabled?: boolean,
		required?: boolean,
	};
	export function search<T>(content: T[], options?: OhqInputSearchOptions<T>): HTMLFormElement;
	export function searchFilter<T>(query: string): (val: T) => boolean;


	// select.js
	export type OhqInputSelectMultipleOptions = {
		multiple?: false,
		value?: string,
	} |
	{
		multiple?: true|number,
		value?: string[],
		size?: number
	};
	export type OhqInputSelectOptions<T> = OhqInputSelectMultipleOptions & {
		label?: OhqInputLabel,
		sort?: OhqInputSort<T>,
		unique?: boolean,
		locale?: string,
		format?: OhqInputFormatFn<T>,
		keyof?: OhqInputKeyOfFn,
		valueof?: OhqInputValueOfFn,
		width?: number,
		disabled?: boolean,
	};
	export function select<T>(data: T[], options?: OhqInputSelectOptions<T>): HTMLFormElement;
	export function select<K, V>(data: Map<K, V>, options?: OhqInputSelectOptions<[K, V]>): HTMLFormElement;


	// table.js
	export type OhqTableLayout = 'auto' | 'fixed' | 'initial' | 'revert' | 'revert-layer' | 'unset';
	export type OhqTableAlignment = 'left' | 'right' | 'center';
	export type OhqTableOptions<T> = {
		columns?: string[],
		value?: string[],
		rows?: number,
		sort?: string|null,
		reverse?: boolean,
		format: { [key: string]: OhqInputFormatFn<T> },
		align?: { [key: string]: OhqTableAlignment },
		header?: { [key: string]: string | HTMLElement },
		width?: number | { [key: string]: number },
		maxWidth?: number,
		height?: number,
		maxHeight?: number,
		layout?: OhqTableLayout,
		required?: boolean,
		multiple?: boolean,
	};
	export function table<T>(data: T[], options?: OhqTableOptions<T>): HTMLTableElement;


	/** HTML text inputs */
	export type InputAttrType = 
		| 'button'
		| 'checkbox'
		| 'color'
		| 'date'
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

	export type InputAttrAutocomplete =
		| OhqHtmlBoolean
		| string & {}; // eslint-disable-line @typescript-eslint/ban-types

	export type InputAttrAutocapitalize =
		| OhqHtmlBoolean
		| 'none'
		| 'sentences'
		| 'words'
		| 'characters';

	export type OhqInputTextOptions = {
		label?: OhqInputLabel,
		type?: InputAttrType,
		value?: string|number|null,
		placeholder?: string|number|null,
		spellcheck?: boolean,
		autocomplete?: InputAttrAutocomplete,
		autocapitalize?: InputAttrAutocapitalize,
		pattern?: string,
		minlength?: number|string,
		maxlength?: number|string,
		min?: number|string,
		max?: number|string,
		required?: number,
		validate?: OhqInputValidateTextFn,
		submit?: boolean,
		datalist?: string[],
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


	// textarea.js
	export type OhqInputTextareaOptions = {
		label?: OhqInputLabel,
		value?: string,
		placeholder?: string,
		spellcheck?: boolean,
		autocomplete?: InputAttrAutocomplete,
		autocapitalize?: InputAttrAutocapitalize,
		minlength?: number,
		maxlength?: number,
		required?: boolean,
		validate?: OhqInputValidateTextFn,
		width?: number,
		rows: number,
		resize?: boolean,
		submit?: boolean,
		readonly?: boolean,
		disabled?: boolean,
		monospace?: boolean,
	};
	export function textarea(options?: OhqTextareaOptions): HTMLFormElement;


	// date.js
	export type OhqInputDateOptions = {
		label?: OhqInputLabel,
		value?: Date|string|null,
		min?: string,
		max?: string,
		required?: boolean,
		validate?: OhqInputValidateTextFn,
		submit?: boolean,
		readonly?: boolean,
		disabled?: boolean,
	};
	export function date(options?: OhqInputDateOptions): HTMLFormElement;
	export function datetime(options?: OhqInputDateOptions): HTMLFormElement;
}

// export type HTMLElementWithCheckableValidity =
// 	| HTMLButtonElement
// 	| HTMLSelectElement
// 	| HTMLInputElement
// 	| HTMLTextAreaElement
// 	| HTMLFormElement
// 	| HTMLFieldSetElement
// 	| HTMLObjectElement;
// export function checkValidity(input: HTMLElementWithCheckableValidity): boolean;
// export function checkValidity(input: HTMLElement & { checkValidity(): boolean }): boolean;
