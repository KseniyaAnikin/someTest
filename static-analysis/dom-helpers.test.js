import { createUlFromText } from './dom-helpers.js';

test('Function createUlFromText creates ul-list', () => {
  const expectedText = '<ul><li>El1</li><li>El2</li><li>El3</li></ul>';
  const el = createUlFromText(['El1', 'El2', 'El3']);
  expect(el).toBeInstanceOf(HTMLUListElement);
  expect(el.outerHTML).toBe(expectedText);
});
