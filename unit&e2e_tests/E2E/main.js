/* eslint-disable no-use-before-define */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-undef */
const openCards = [];
const cardsArr = [];
const field = document.getElementById('field');
const forma = createInterface();

function createInterface() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  document.getElementById('game').append(wrapper);
  const input = document.createElement('input');
  input.classList.add('input');
  wrapper.append(input);
  input.placeholder = 'Сколько карточек';
  const btn = document.createElement('button');
  btn.classList.add('btn');
  wrapper.append(btn);
  btn.textContent = 'Начнём игру!';
  const numArr = [];

  return {
    input,
    btn,
    wrapper,
    numArr,
  };
}

function createCards(number) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = number;

  card.addEventListener('click', () => {
    // eslint-disable-next-line no-unused-expressions
    card.classList.contains('open') ? card.classList.remove('open')
      : card.classList.add('open');
  });

  return card;
}

function cleaningField() {
  field.querySelectorAll('.card').forEach((item) => {
    item.remove();
  });
  forma.numArr.length = 0;
}

function createGame() {
  cleaningField();
  forma.btn.addEventListener('click', () => {
    let card;
    forma.btn.setAttribute('disabled', true);
    if (forma.input.value % 2 === 0 && forma.input.value >= 2 <= 10) {
      for (let i = 1; i <= forma.input.value / 2; i++) {
        forma.numArr.push(i);
        forma.numArr.push(i);
      }

      forma.numArr.sort(() => Math.random() - 0.5);

      for (const cards of forma.numArr) {
        card = createCards(cards);
        field.append(card);
      }
      forma.input.value = '';
      timer();
    } else {
      forma.input.value = '';
      alert('В поле можно ввести только чётное число от 2 до 10.');
    }
  });
}

function game() {
  createGame();
  field.addEventListener('click', (e) => {
    if (e.target.className.includes('card')) {
      cardsArr.push(e.target);
      openCards.push(e.target.textContent);

      if (openCards.length === 3) {
        if (openCards[0] !== openCards[1]) {
          cardsArr[0].classList.remove('open');
          cardsArr[1].classList.remove('open');
          cardsArr.splice(0, 2);
          openCards.splice(0, 2);
        } else {
          cardsArr[0].classList.add('success');
          cardsArr[1].classList.add('success');
          cardsArr.splice(0, 2);
          openCards.splice(0, 2);
        }
      }
    }

    gameOver();
  });
}

function gameOver() {
  if (field.querySelectorAll('.open').length === forma.numArr.length) {
    alert('Game over');
    window.location.reload();
  }
}

function timer() {
  const timerShow = document.getElementById('timer');
  let timeMinut = 60;
  // eslint-disable-next-line no-shadow
  const timer = setInterval(() => {
    seconds = timeMinut % 60;
    min = timeMinut / 60 % 60;
    hour = timeMinut / 60 / 60 % 60;

    if (timeMinut <= 0) {
      clearInterval(timer);
      alert('Время закончилось');
      window.location.reload();
    } else {
      const strTimer = `${Math.trunc(hour)}:${Math.trunc(min)}:${seconds}`;
      timerShow.innerHTML = strTimer;
    }
    --timeMinut;
  }, 1000);
}

game();
