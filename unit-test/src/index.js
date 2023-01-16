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

import visa from './assets/img/visa.png';
import mc from './assets/img/mc.png';

const card = el('div', { class: 'card-bounding' });
const field1 = el('aside', 'Card Number:');
let cardNumber;
const details = el('div', { class: 'card-details' });
const field2 = el('aside', 'Expiration Date');
let data;
const field3 = el('aside', 'CVV');
let cvv;
const field4 = el('aside', 'Email');
let email;
const btn = el('button', 'Оплатить');

btn.disabled = true;

export function makeNumberInput() {
  cardNumber = el('input', {
    class: 'card-number',
    placeholder: '0000 0000 0000 0000',
  });
  Inputmask({ regex: '\\d{4} \\d{4} \\d{4} \\d{4,6}' }).mask(cardNumber);
  cardNumber.addEventListener('blur', () => {
    isValid(cardNumber.value)
      ? cardNumber.classList.add('border-green-600')
      : cardNumber.classList.remove('border-green-600');
    cardNumber.classList.add('border-red-600');
    if (getCreditCardNameByNumber(cardNumber.value) === 'Visa') {
      cardNumber.style.backgroundImage = `url(${visa})`;
    }
    if (getCreditCardNameByNumber(cardNumber.value) === 'Mastercard') {
      cardNumber.style.backgroundImage = `url(${mc})`;
    }
  });
  return cardNumber;
}

export function makeDataInput() {
  data = el('input', { class: 'card-data', placeholder: 'mm/yy' });
  Inputmask({ regex: '\\d{2}/\\d{2}', placeholder: 'mm/yy' }).mask(data);
  data.addEventListener('blur', () => {
    const month = data.value.slice(0, 2);
    const year = data.value.slice(3);
    isExpirationDateValid(month, year)
      ? data.classList.add('border-green-600')
      : data.classList.remove('border-green-600');
    data.classList.add('border-red-600');
  });
  return data;
}

export function makeCvvInput() {
  cvv = el('input', { class: 'cvv-number', placeholder: 'XXX' });
  Inputmask({ regex: '\\d{3}', placeholder: 'XXX' }).mask(cvv);
  cvv.addEventListener('blur', () => {
    isSecurityCodeValid(cardNumber.value, cvv.value)
      ? cvv.classList.add('border-green-600')
      : cvv.classList.remove('border-green-600');
    cvv.classList.add('border-red-600');
  });
  return cvv;
}

export function makeEmailInput() {
  email = el('input', { class: 'email-in', placeholder: 'Email' });
  email.addEventListener('blur', () => {
    EmailValidator.validate(email.value)
      ? email.classList.add('border-green-600')
      : email.classList.remove('border-green-600');
    email.classList.add('border-red-600');
  });
  return email;
}

(function makeCard() {
  setChildren(details, [
    field2,
    makeDataInput(),
    field3,
    makeCvvInput(),
    field4,
    makeEmailInput(),
  ]);
  setChildren(card, [field1, makeNumberInput(), details]);
  setChildren(window.document.body, [card, btn]);
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
})();

// makeCard()
