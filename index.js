"use strict";

let newGame = document.querySelector(".btn--new");
let hold = document.querySelector(".btn--hold");
let roll = document.querySelector(".btn--roll");
let curr0Player = document.querySelector("#current--0");
let curr1Player = document.querySelector("#current--1");
let score0 = document.querySelector("#score--0");
let score1 = document.querySelector("#score--1");
let diceEle = document.querySelector(".dice");
let player_0 = document.querySelector(".player--0");
let player_1 = document.querySelector(".player--1");

diceEle.classList.add("hidden");
let score = [0, 0];
let active_player = 0;
let currentScore = 0;
let playing_game = true;

let rollDice = () => {
  roll.addEventListener("click", () => {
    if (playing_game) {
      let randomRoll = Math.floor(Math.random() * 6) + 1;
      console.log(randomRoll);
      diceEle.classList.remove("hidden");
      diceEle.src = `dice-${randomRoll}.png`;

      if (randomRoll != 1) {
        currentScore = currentScore + randomRoll;
        document.querySelector(`#current--${active_player}`).innerHTML =
          currentScore;
      } else {
        document.querySelector(`#current--${active_player}`).innerHTML = 0;
        currentScore = 0;
        active_player = active_player == 1 ? 0 : 1;
        player_0.classList.toggle("player--active");
        player_1.classList.toggle("player--active");
      }
    }
  });
};

let holdGame = () => {
  hold.addEventListener("click", () => {
    if (playing_game) {
      score[active_player] += currentScore;
      document.querySelector(`#score--${active_player}`).textContent =
        score[active_player];

      if (score[active_player] >= 10) {
        playing_game = false;
        diceEle.classList.add("hidden");
        document
          .querySelector(`.player--${active_player}`)
          .classList.add(`player--winner`);
        document
          .querySelector(`.player--${active_player}`)
          .classList.remove("player--active");
      } else {
        active_player = active_player == 1 ? 0 : 1;
        player_0.classList.toggle("player--active");
        player_1.classList.toggle("player--active");
      }
    }
  });
};

let reset = () => {
  newGame.addEventListener("click", () => {
    playing_game = true;
    score0.innerHTML = 0;
    score1.innerHTML = 0;
    player_0.classList.remove(`player--winner`);
    player_1.classList.remove(`player--winner`);
    player_0.classList.add("player--active");
    player_1.classList.remove("player--active");
    curr0Player.innerHTML = 0;
    curr0Player.innerHTML = 0;
    score = [0, 0];
    active_player = 0;
    currentScore = 0;
    playing_game = true;
  });
};

rollDice();
holdGame();
reset();
