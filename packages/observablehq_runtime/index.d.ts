declare module '@observablehq/runtime' {
	import '@wandering-app/types-observablehq_inspector';
	import '@wandering-app/types-observablehq_stdlib';
	import '@observablehq/inspector';
	import { FileAttachments } from '@observablehq/stdlib';

	export { Inspector } from '@observablehq/inspector';

	export class Module {
		constructor(runtime: Runtime, builtins: [string, symbol][]);
	}

	export class Runtime {
		dispose(): void;
		module<T, U>(v1: T, v2: U): Module;
		fileAttachments: typeof FileAttachments;
	}

	export interface Observer {
		pending(): void;
		fulfilled<T>(value: T): void;
		rejected(error: Error): void;
	}

	export namespace array {
		export const map: typeof Array.prototype.map;
		export const forEach: typeof Array.prototype.forEach;
	}

	export namespace constant {
		export function constant<T>(value: T): () => T;
	}

	export namespace errors {
		export class RuntimeError<T> extends Error {
			constructor(message: string, input?: T);
		}
	}

	export namespace generatorish {
		/* eslint-disable @typescript-eslint/ban-types */
		export interface GeneratorLike {
			next: Function,
			return: Function,
		}
		/* eslint-enable @typescript-eslint/ban-types */

		export function generatorish(value: any): value is GeneratorLike;
	}

	export namespace identity {
		export function identity<T>(value: T): T;
	}

	export namespace noop {
		export function noop(): void;
	}

	export namespace rethrow {
		export function rethrow(error: Error): () => never;
	}
}
