import {
  // makeNumberInput,
  // makeDataInput,
  // makeCvvInput,
  makeEmailInput,
} from './src/index';

test('Проверка email должна пропускать корректные значения', () => {
  expect(makeEmailInput('email@email.com')).toBe(true);
});
