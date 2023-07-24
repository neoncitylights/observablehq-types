declare module '@observablehq/runtime' {
	export { Inspector } from '@observablehq/inspector';

	export class Module {
		constructor(runtime: Runtime, builtins: [string, symbol][]);
	}

	export class Runtime {
		dispose(): void;
		module<T, U>(v1: T, v2: U): Module;
		fileAttachments: FileAttachments;
	}

	export interface Observer {
		pending(): void;
		fulfilled<T>(value: T): void;
		rejected(error: Error): void;
	}

	export class RuntimeError<T> extends Error {
		constructor(message: string, input?: T);
	}

	// internal utilities
	function constant<T>(value: T): () => T;
	function identity<T>(value: T): T;
	function noop(): void;
	function rethrow(error: Error): () => never;
}
