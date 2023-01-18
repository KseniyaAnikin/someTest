import { cardValidation, cvvValidation, makeCard } from './src/index';

describe('Проверка номера карты должна пропускать корректные значения', () => {
  const testCases = [
    {
      from: 4279550011787744,
      to: true,
    },
    {
      from: 'gAA.k',
      to: false,
    },
    {
      from: 123,
      to: false,
    },
    {
      from: 1234512345098765432123456n,
      to: false,
    },
  ];

  testCases.forEach((test) => {
    it(`проверка ${test.from} = ${test.to}`, () => {
      expect(cardValidation(test.from)).toBe(test.to);
    });
  });
});

describe('Проверка номера CVV должна пропускать корректные значения', () => {
  const testCases = [
    {
      from: 345,
      to: true,
    },
    {
      from: 'gAA.k',
      to: false,
    },
    {
      from: 12,
      to: false,
    },
    {
      from: 1234512345098765432123456n,
      to: false,
    },
  ];

  testCases.forEach((test) => {
    it(`проверка ${test.from} = ${test.to}`, () => {
      expect(cvvValidation(test.from)).toBe(test.to);
    });
  });
});

test('Function create inputs', () => {
  const expectedText =
    '<div class=" card-bounding"><aside>Card Number:</aside><input class=" card-number" placeholder="0000 0000 0000 0000" inputmode="text"><div class=" card-details"><aside>Expiration Date</aside><input class=" card-data" placeholder="mm/yy" inputmode="text"><aside>CVV</aside><input class=" cvv-number" placeholder="XXX" inputmode="text"><aside>Email</aside><input class=" email-in" placeholder="Email"></div></div>';
  const el = makeCard();
  expect(el.outerHTML).toBe(expectedText);
});
