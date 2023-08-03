declare module '@observablehq/stdlib' {
	import { csvParse, csvParseRows, tsvParse, tsvParseRows } from 'd3-dsv';
	import { require, requireFrom, resolver } from 'd3-require';
	import { KatexOptions } from 'katex';

	export const Library = {
		FileAttachment: () => NoFileAttachments,
		Mutable: () => Mutable,
		now: () => Generator<number, void, unknown>,
		width: () => number,

		// tagged template literals
		html: () => html(),
		svg: () => svg(),

		// recommended libraries
		mermaid: () => mermaid(),
		tex: () => tex(),

		DOM: DOM,
		Files: files,
		Generators: generators,
		Promises: promises,
	};

	namespace DOM {
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

	namespace files {
		export type FileReaderPromise = Promise<(
			resolve: (resolve: FileReader['result']) => void,
			reject: FileReader['onerror']
		) => void>;

		export function buffer(file: Blob): FileReaderPromise;
		export function text(file: Blob): FileReaderPromise;
		export function url(file: Blob): FileReaderPromise;
	}

	namespace generators {
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

	namespace promises {
		export function delay(durationInMilliseconds: number, value: number): Promise<number>;
		export function tick(durationInMilliseconds: number, value: number): Promise<number>;
		export function when(time: Date, value: number): Promise<number>;
	}

	// dependency.js
	type DependencyPathFn = (path?: string) => string;
	function dependency(name: string, version: string, main: string): (path?: string) => string;

	// fileAttachments.js
	namespace fileAttachment {
		export type DsvOptions = {
			array?: boolean,
			typed?: boolean,
		};
	
		export class AbstractFile {
			constructor(name: string, mimeType: string);
			async blob(): Promise<Blob>;
			async arrayBuffer(): Promise<ArrayBuffer>;
			async text(): Promise<string>;
			async json(): Promise<any>;
			async stream(): BodyInit | null | undefined;
			async csv(options?: DsvOptions): ReturnType<typeof csvParseRows> | ReturnType<typeof csvParse>;
			async tsv(options?: DsvOptions): ReturnType<typeof tsvParseRows> | ReturnType<typeof tsvParse>;
			async image(options?: { height?: number, width?: number}): Promise<HTMLImageElement>;
			async xml(mimeType?: DOMParserSupportedType): Promise<XMLDocument>;
			async html(): Promise<HTMLDocument>;
			async zip(): Promise<ZipArchive>;
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
	
		function NoFileAttachments(name: string): never;

		export class ZipArchive {
			filenames(): string[];
			file(path: string): FileAttachment;
		}
	}

	// require.js
	namespace require {
		export type RequirerValue = ReturnType<typeof requirer>;
		function requirer(resolver: resolver|null): require|requireFrom;
	
		type DataSource = 'chart'|'table'|'sql';
		export function loadDataSource(source: any, mode: DataSource, name: string);
	
		export function arrayIsPrimitive(value: any): boolean;
		export function isDatabaseClient(value: any): boolean;
	}

	// tagged template literals
	function html(): () => HTMLTemplateElement | HTMLSpanElement;
	function svg(): () => SVGGElement;

	// libraries
	function mermaid(): () => Promise<() => HTMLDivElement>;

	// tex.js
	type TexValue = HTMLDivElement & {
		options?: (options?: KatexOptions) => TexValue,
		block: TexValue,
	};
	function tex(require: RequirerValue): () => Promise<TexValue>;
}
