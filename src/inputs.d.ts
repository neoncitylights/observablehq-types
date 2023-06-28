declare module '@observablehq/inputs' {
}

declare module '@observablehq/inputs/array' {
    export function arrayify<T>(array: Iterable<unknown>|ArrayLike<unknown>): T[];
	export function iterable(array: any): boolean;
}

declare module '@observablehq/inputs/bind' {
    import { disposal } from '@observablehq/inputs/disposal';

    export function bind(
        target: HTMLInputElement,
        source: HTMLInputElement,
        invalidation = disposal(target)
    ): void;    
}

declare module '@observablehq/inputs/disposal' {
    export function disposal(element: Element): Promise<void>;
}
declare module '@observablehq/inputs/event' {
    export function preventDefault(event: Event): void;
    export function dispatchEvent(target: EventTarget): void;

    export type HTMLElementWithCheckableValidity = 
        | HTMLButtonElement
        | HTMLSelectElement
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLFormElement
        | HTMLFieldSetElement
        | HTMLObjectElement;
    export function checkValidity(input: HTMLElementWithCheckableValidity): boolean;
    export function checkValidity(input: HTMLElement & { checkValidity(): boolean }): boolean;
}

declare module '@observablehq/inputs/format' {
    export function stringify<T>(x: T|null): string;
    export function formatTrim<T extends object>(value: T): string;
    export function formatDate(value: Date): string;
}

declare module '@observablehq/inputs/id' {
    export function newId(): `__ns__-${number}`;
}

declare module '@observablehq/runtime/identity' {
	export function identity<T>(value: T): T;
}

declare module '@observablehq/inputs/input' {
    export function input<T>(value: T): EventTarget & { value: T };
}

declare module '@observablehq/inputs/intern' {
    export function intern<T>(value: T): T|object;
}
