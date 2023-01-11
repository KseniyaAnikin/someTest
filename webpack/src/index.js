/* eslint-disable no-unused-expressions */
import Inputmask from 'inputmask';
import {
  isValid,
  isExpirationDateValid,
  isSecurityCodeValid,
  getCreditCardNameByNumber,
} from 'creditcard.js';

import * as EmailValidator from 'email-validator';

import visa from './img/visa.png';
import mc from './img/mc.png';

const cardNumber = document.querySelector('.card-number');
const cvv = document.querySelector('.cvv-number');
const data = document.querySelector('.card-data');
const email = document.querySelector('.email-in');
const allInputs = document.querySelectorAll('input');
const btn = document.querySelector('button');

btn.disabled = true;

Inputmask({ regex: '\\d{4} \\d{4} \\d{4} \\d{4,6}' }).mask(cardNumber);
Inputmask({ regex: '\\d{3}', placeholder: 'XXX' }).mask(cvv);
Inputmask({ regex: '\\d{2}/\\d{2}', placeholder: 'mm/yy' }).mask(data);

cardNumber.addEventListener('blur', () => {
  isValid(cardNumber.value) ? cardNumber.classList.add('border-green-600') : cardNumber.classList.remove('border-green-600');
  cardNumber.classList.add('border-red-600');
  if (getCreditCardNameByNumber(cardNumber.value) === 'Visa') {
    cardNumber.style.backgroundImage = `url(${visa})`;
  }
  if (getCreditCardNameByNumber(cardNumber.value) === 'Mastercard') {
    cardNumber.style.backgroundImage = `url(${mc})`;
  }
});

data.addEventListener('blur', () => {
  const month = data.value.slice(0, 2);
  const year = data.value.slice(3);
  isExpirationDateValid(month, year) ? data.classList.add('border-green-600') : data.classList.remove('border-green-600');
  data.classList.add('border-red-600');
});

cvv.addEventListener('blur', () => {
  isSecurityCodeValid(cardNumber.value, cvv.value) ? cvv.classList.add('border-green-600') : cvv.classList.remove('border-green-600');
  cvv.classList.add('border-red-600');
});

email.addEventListener('blur', () => {
  EmailValidator.validate(email.value) ? email.classList.add('border-green-600') : email.classList.remove('border-green-600');
  email.classList.add('border-red-600');
});

allInputs.forEach((e) => {
  e.addEventListener('focus', () => {
    e.classList.remove('border-red-600');
  });

  e.addEventListener('blur', () => {
    const arr = [];
    for (let i = 0; i <= allInputs.length; i++) {
      if (allInputs.item(i).classList.contains('border-green-600')) {
        arr.push(i);
      }
      if (arr.length === allInputs.length) {
        btn.disabled = false;
      }
    }
  });
});
