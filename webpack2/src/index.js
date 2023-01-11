/* eslint-disable no-unused-expressions */
import 'babel-polyfill';
import './style.css';
import Inputmask from 'inputmask';
import {
  isValid,
  isExpirationDateValid,
  isSecurityCodeValid,
  getCreditCardNameByNumber,
} from 'creditcard.js';

import * as EmailValidator from 'email-validator';

import { el, setChildren } from 'redom';

// import def from './assets/img/defaultcard.png';
import visa from './assets/img/visa.png';
import mc from './assets/img/mc.png';

const card = el('div', { class: 'card-bounding' });
// setChildren(window.document.body, card);
const field1 = el('aside', 'Card Number:');
const cardNumber = el('input', { class: 'card-number', placeholder: '0000 0000 0000 0000' });
const details = el('div', { class: 'card-details' });
const field2 = el('aside', 'Expiration Date');
const data = el('input', { class: 'card-data', placeholder: 'mm/yy' });
const field3 = el('aside', 'CVV');
const cvv = el('input', { class: 'cvv-number', placeholder: 'XXX' });
const field4 = el('aside', 'Email');
const email = el('input', { class: 'email-in', placeholder: 'Email' });
setChildren(details, [field2, data, field3, cvv, field4, email]);
setChildren(card, [field1, cardNumber, details]);
const btn = el('button', 'Оплатить');
setChildren(window.document.body, [card, btn]);

// const allInputs = document.querySelectorAll('input');

btn.disabled = true;

Inputmask({ regex: '\\d{4} \\d{4} \\d{4} \\d{4,6}' }).mask(cardNumber);
Inputmask({ regex: '\\d{3}', placeholder: 'XXX' }).mask(cvv);
Inputmask({ regex: '\\d{2}/\\d{2}', placeholder: 'mm/yy' }).mask(data);

cardNumber.addEventListener('blur', () => {
  // console.log(cardNumber.value);
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

const allInputs = document.querySelectorAll('input');

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
