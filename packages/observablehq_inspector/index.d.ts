declare module '@observablehq/inspector' {
	export class Inspector {
		constructor(node: Element);
		pending(): void;
		fulfilled<T>(value: T, name: string): void;
		rejected(error: string): void;
		static into<T>(container: T): () => Inspector;
	}
}
