import Inputmask from 'inputmask';
import {
  isValid,
  isExpirationDateValid,
  isSecurityCodeValid,
  getCreditCardNameByNumber,
} from 'creditcard.js';

const cardNumber = document.querySelector('.card-number');
const cvv = document.querySelector('.cvv-number');
const data = document.querySelector('.card-data');

Inputmask({ regex: '\\d{4} \\d{4} \\d{4} \\d{4,6}' }).mask(cardNumber);
Inputmask({ regex: '\\d{3}', placeholder: 'XXX' }).mask(cvv);
Inputmask({ regex: '\\d{2}/\\d{2}', placeholder: 'mm/yy' }).mask(data);

cardNumber.addEventListener('blur', () => {
  if (isValid(cardNumber.value)) {
    document.querySelector('.card-container').classList.add('border-lime-400');
    console.log('карта введена ок', getCreditCardNameByNumber(cardNumber.value));
  } else {
    console.log('некорретная карта');
    document.querySelector('.card-container').classList.add('border-red-600');
  }
});

cardNumber.addEventListener('focus', () => {
  document.querySelector('.card-container').classList.remove('border-red-600');
});

