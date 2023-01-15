import { el } from 'redom';

export function createUlFromText(items) {
  return el(
    'ul',
    items.map((item) => el('li', item))
  );
}
