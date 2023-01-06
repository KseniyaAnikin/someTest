import Inputmask from 'inputmask';

const cardNumber = document.querySelector('.card-number');
const cvv = document.querySelector('.cvv-number');

Inputmask({ regex: '\\d{4} \\d{4} \\d{4} \\d{4,6}' }).mask(cardNumber);
Inputmask({ regex: '\\d{3}' }).mask(cvv);
