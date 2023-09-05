'use strict';

// players
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const currentScoreP1 = document.querySelector('#current--0');
const currentScoreP2 = document.querySelector('#current--1');
const totalScoreP1 = document.querySelector('#total--0');
const totalScoreP2 = document.querySelector('#total--1');
const diceDisplay = document.querySelector('.dice');

// Buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initialise
let dicePoint, currentScore, totalScore, playingActive, playing, targetScore;

// init func
const init = () => {
  currentScore = 0; // current score
  totalScore = [0, 0]; // 0: player1, 1: player2
  playingActive = 0; // controll active player
  playing = true; // controll avtive playing
  targetScore = 20; // change the target score to win if desirable

  currentScoreP1.textContent = 0;
  currentScoreP2.textContent = 0;
  totalScoreP1.textContent = 0;
  totalScoreP2.textContent = 0;

  diceDisplay.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player2.classList.remove('player--active');
  player1.classList.add('player--active');
};

// invoke init()
init();

// switch player func
const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${playingActive}`).textContent = 0;
  playingActive = playingActive === 1 ? 0 : 1;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

// rolling
btnRoll.addEventListener('click', () => {
  if (playing) {
    // generate random dice
    dicePoint = Math.floor(Math.random() * 6) + 1;

    // remove hidden and display equivalent dice
    diceDisplay.classList.remove('hidden');
    diceDisplay.src = `dice imgs/dice-${dicePoint}.png`;

    if (dicePoint !== 1) {
      currentScore += dicePoint;
      document.querySelector(`#current--${playingActive}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// holding
btnHold.addEventListener('click', () => {
  if (playing) {
    totalScore[playingActive] += currentScore;

    document.querySelector(`#total--${playingActive}`).textContent =
      totalScore[playingActive];

    // player wins
    if (totalScore[playingActive] >= targetScore) {
      playing = false;

      document.querySelector(`#current--${playingActive}`).textContent = 0;
      document
        .querySelector(`.player--${playingActive}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${playingActive}`)
        .classList.add('player--winner');
    } else {
      diceDisplay.classList.add('hidden');
      switchPlayer();
    }
  }
});

// reseting
btnNew.addEventListener('click', init);
