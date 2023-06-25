import { expectTypeOf, test } from 'vitest';
import { Inspector } from '@observablehq/inspector';
import './../src/inspector.d.ts';

/**
 * @vitest-environment jsdom
 */

test('my types work properly', () => {
  expectTypeOf(Inspector).toBeConstructibleWith(new Document)
})
