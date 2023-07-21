declare module '@observablehq/stdlib' {
	import { require, resolver } from 'd3-require';
	import { KatexOptions } from 'katex';
	export { FileAttachment, AbstractFile } from 'fileAttachments';

	export namespace DOM {
		export function canvas(width: number, height: number): HTMLCanvasElement;
		export function context2d(width: number, height: number, dpi?: number): HTMLCanvasElement;
		export function download(value: () => File | Blob | MediaSource, name: string, label: string): HTMLAnchorElement;
		export function element<K extends keyof HTMLElementTagNameMap>(name: K, attributes: { [name: string]: string }): HTMLElementTagNameMap[K];
		export function element<K extends keyof SVGElementTagNameMap>(name: K, attributes: { [name: string]: string }): SVGElementTagNameMap[K];
		export function element<K extends keyof MathMLElementTagNameMap>(name: K, attributes: { [name: string]: string }): MathMLElementTagNameMap[K];
		export function element(name: string, attributes: { [name: string]: string }): HTMLElement;
		export function input(type: HTMLInputElement['type'] | null): HTMLInputElement;
		export function range(min: number): HTMLInputElement;
		export function range(min: number, max: number, step: number): HTMLInputElement;
		export function select<T>(values: T[]): HTMLSelectElement;
		export function svg(width: number, height: number): SVGSVGElement;
		export function text(value: string): Text;
		export function uid(name: string): Id;
		export interface Id {
			id: string;
			href: URL;
		}
	}

	export namespace files {
		export type FileReaderPromise = Promise<(
			resolve: (resolve: FileReader['result']) => void,
			reject: FileReader['onerror']
		) => void>;

		export function buffer(file: Blob): FileReaderPromise;
		export function text(file: Blob): FileReaderPromise;
		export function url(file: Blob): FileReaderPromise;
	}

	export namespace generators {
		export type ObserveInitializeFn = (change: (T) => () => void) => void;
		
		export function disposable<T>(value: T, dispose: (T) => void): Generator<T, void, unknown>;
		export function filter<T>(iterator: Iterator<T>, test: (value: T, index?: number) => any): Generator<T, void, unknown>;
		export function map<T>(iterator: Iterator<T>, transformFn: (value: T, index?: number) => T): Generator<T, void, unknown>;
		export function observe<T>(initialize: ObserveInitializeFn): Generator<T, any, unknown>;
		export function queue<T>(initialize: ObserveInitializeFn): Generator<T, any, unknown>;
		export function range(start: number, stop: number, step: number): Generator<number, void, unknown>;
		export function valueAt<T>(iterator: Iterator<T>, index: number): T|undefined;
		export function worker(source: BlobPart): Generator<Worker, void, unknown>;
	}

	export namespace promises {
		export function delay(durationInMilliseconds: number, value: number): Promise<number>;
		export function tick(durationInMilliseconds: number, value: number): Promise<number>;
		export function when(time: Date, value: number): Promise<number>;
	}

	// dependency.js
	export function dependency(name: string, version: string, main: string): (path?: string) => string;

	// dependencies.js
	export const d3: ReturnType<typeof dependency>;
	export const inputs: ReturnType<typeof dependency>;
	export const plot: ReturnType<typeof dependency>;
	export const graphviz: ReturnType<typeof dependency>;
	export const highlight: ReturnType<typeof dependency>;
	export const katex: ReturnType<typeof dependency>;
	export const lodash: ReturnType<typeof dependency>;
	export const htl: ReturnType<typeof dependency>;
	export const jszip: ReturnType<typeof dependency>;
	export const marked: ReturnType<typeof dependency>;
	export const sql: ReturnType<typeof dependency>;
	export const vega: ReturnType<typeof dependency>;
	export const vegalite: ReturnType<typeof dependency>;
	export const vegaliteApi: ReturnType<typeof dependency>;
	export const arrow4: ReturnType<typeof dependency>;
	export const arrow9: ReturnType<typeof dependency>;
	export const arrow11: ReturnType<typeof dependency>;
	export const arquero: ReturnType<typeof dependency>;
	export const topojson: ReturnType<typeof dependency>;
	export const exceljs: ReturnType<typeof dependency>;
	export const mermaid: ReturnType<typeof dependency>;
	export const leaflet: ReturnType<typeof dependency>;
	export const duckdb: ReturnType<typeof dependency>;

	// fileAttachments.js
	function dsv(file: Blob, delimiter: string, options: { array: boolean, typed: boolean} = {array = false, typed = false}): 
	Promise<
		| ReturnType<typeof tsvParseRows>
		| ReturnType<typeof tsvParse>
		| ReturnType<typeof csvParseRows>
		| ReturnType<typeof csvParse>
	>;
	function dsv(file: Blob, delimiter = '\t', { array = true }): Promise<ReturnType<typeof tsvParseRows>>;
	function dsv(file: Blob, delimiter = '\t', { array = false }): Promise<ReturnType<typeof tsvParse>>;
	function dsv(file: Blob, delimiter: string, { array = true }): Promise<ReturnType<typeof csvParseRows>>;
	function dsv(file: Blob, delimiter: string, { array = false }): Promise<ReturnType<typeof csvParse>>;

	export class AbstractFile {
		constructor(name: string, mimeType: string);
		blob(): Promise<Blob>;
		arrayBuffer(): Promise<ArrayBuffer>;
		text(): Promise<string>;
		json(): Promise<any>;
		stream(): BodyInit | null | undefined;
		csv(options: { array: boolean, typed: boolean}): ReturnType<typeof csvParseRows> | ReturnType<typeof csvParse>;
		tsv(options: { array: boolean, typed: boolean}): ReturnType<typeof tsvParseRows> | ReturnType<typeof tsvParse>;
		xml(mimeType?: Parameters<DOMParser['parseFromString']>[1] = 'application/xml'): Promise<Document>;
		html(): Promise<Document>;
	}

	export class FileAttachment extends AbstractFile {
		constructor(url: URL|string, name: string, mimeType: string);
		url(): Promise<string>;
	}

	export function FileAttachments<T>(
		resolve: (
			name: string
		) => {
			url: URL | Promise<T>;
			mimeType: string | undefined;
		} | null
	): FileAttachment;

	export function NoFileAttachments(name: string): never;

	// html.js
	export function html(): () => HTMLTemplateElement | HTMLSpanElement;

	// library.js
	export class Library {
		constructor(resolve: () => Promise<string>);
		FileAttachment: FileAttachment;
	}

	// mermaid.js
	export function mermaid(): () => Promise<() => HTMLDivElement>;

	// now.js
	export function* now(): Generator<number, void, unknown>;

	// require.js
	export function requirer(resolver: resolver): require;

	// runtime.js
	export function svg(): () => SVGGElement;

	// table.js
	export function coerceToType<T, U>(value: T, type: string): U;

	/* eslint-disable @typescript-eslint/no-unused-vars */
	export function coerceToType<T, string>(value: T, type = 'string'): string;
	export function coerceToType<T, boolean>(value: T, type = 'boolean'): boolean;
	export function coerceToType<T, bigint>(value: T, type = 'bigint'): bigint;
	export function coerceToType<T, number>(value: T, type = 'integer'|'number'): number;
	export function coerceToType<T, Date>(value: T, type = 'date'): Date;
	export function coerceToType<T, Array>(value: T, type = 'array'): Array;
	export function coerceToType<T, T>(value: T, type = 'object'|'value'): T;
	export function coerceToType<T, ArrayBuffer>(value: T, type = 'buffer'): ArrayBuffer;
	export function getTypeValidator<T>(colType: string): (value: any) => T;
	export function getTypeValidator(colType = 'string'): (value: any) => value is string;
	export function getTypeValidator(colType = 'boolean'): (value: any) => value is boolean;
	export function getTypeValidator(colType = 'bigint'): (value: any) => value is bigint;
	export function getTypeValidator(colType = 'number'): (value: any) => value is number;
	export function getTypeValidator(colType = 'integer'): (value: any) => boolean;
	export function getTypeValidator(colType = 'date'): (value: any) => value is Date;
	export function getTypeValidator(colType = 'buffer'): (value: any) => value is ArrayBuffer;
	export function getTypeValidator(colType = 'array'): (value: any) => value is Array;
	/* eslint-enable @typescript-eslint/no-unused-vars */

	export function getTypeValidator(colType = 'object'): (value: any) => value is Object; // eslint-disable-line @typescript-eslint/ban-types

	export type DataSource = 'chart'|'table'|'sql';
	export function loadDataSource(source: any, mode: DataSource, name: string);

	export function arrayIsPrimitive(value: any): boolean;
	export function isDatabaseClient(value: any): boolean;

	// tex.js
	export type TexValue = Promise<
		HTMLDivElement & {
			options?: (options?: KatexOptions) => TexValue,
			block: TexValue,
		}
	>;
	export function tex(): () => TexValue;

	// that.js
	export function that<T>(): T;

	// template.js
	export function template<T extends Node>(
		render: (value: string) => T,
		wrapper: () => T
	): () => T;

	// width.js
	export function width(): () => number;
}
