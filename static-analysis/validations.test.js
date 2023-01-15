import { isValidEmail } from './validations';

test('Проверка email должна пропускать корректные значения', () => {
  expect(isValidEmail('email@email.com')).toBe(true);
});
