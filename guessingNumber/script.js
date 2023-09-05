'use strict';

// DOM queryselectors
const checkBtn = document.querySelector('.btn--check');
const againBtn = document.querySelector('.btn--new');
const guessEl = document.querySelector('.input--guess');
const screenNumEl = document.querySelector('.number');
const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.highScore');

// Initialise
let score, highScore, playing, secretNumber;

// display message func
const displayMessage = message => {
  messageEl.textContent = message;
};

// init function
function init() {
  secretNumber = Math.floor(Math.random() * 20) + 1; // 1 - 20

  displayMessage('Start guessing...');
  document.querySelector('body').classList.remove('winner');
  guessEl.classList.remove('winner');

  screenNumEl.textContent = '?';

  guessEl.value = '';
  scoreEl.textContent = 20;

  score = 20;
  playing = true;
}

// invoke init()
init();

// Check guessing Number
checkBtn.addEventListener('click', () => {
  let guessingNumber = +guessEl.value;

  if (playing) {
    // no input number
    if (!guessingNumber) {
      displayMessage('❌ No Input Number!!!');
    }
    // correct guessing
    else if (guessingNumber == secretNumber) {
      displayMessage('💡 Correct!!!');

      // store highscore
      highScore = score;
      highScoreEl.textContent = highScore;

      screenNumEl.textContent = secretNumber;
      document.querySelector('body').classList.add('winner');
      guessEl.classList.add('winner');

      playing = false;
    }
    // wrong guessing
    else if (score > 1 && guessingNumber !== secretNumber) {
      displayMessage(
        guessingNumber > secretNumber ? '📈 Too High!!!!' : '📉 Too Low!!!'
      );
      score--;
      scoreEl.textContent = score;
    }
    // lose
    else {
      scoreEl.textContent = 0;
      displayMessage('👎 👎 👎 You Lose!!!!');
    }
  }
});

// reset
againBtn.addEventListener('click', init);
