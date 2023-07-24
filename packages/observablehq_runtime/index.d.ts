declare module '@observablehq/runtime' {
	export { Inspector } from '@observablehq/inspector';
	export { Library } from '@observablehq/stdlib';
	import { Library } from '@observablehq/runtime';

	export class Module {
		constructor(runtime: Runtime, builtins: [string, symbol][]);
	}

	export function Runtime(builtins?: Library, global: ThisType<Window>): {
		_dirty: Set<unknown>,
		_updates: Set<unknown>,
		_precomputes: unknown[],
		_computing: unknown,
		_init: unknown,
		_modules: Map<unknown, unknown>,
		_variables: Set<unknown>,
		_disposed: boolean,
		_builtin: Library,
		_global: ThisType<Window>,

		_precompute: () => void;
		_compute(): () => Promise<void>;
		_computeSoon(): () => Proise<void>;
		_computeNow(): () => void;
		dispose(): void;
		module<T, U>(v1: T, v2: U): Module;
		fileAttachments: FileAttachments;
	};

	export interface Variable {}

	export interface Observer {
		pending(): void;
		fulfilled<T>(value: T): void;
		rejected<T extends Error>(error: T): void;
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
