"use strict";

const title = document.querySelector(".title");
const entry = document.querySelector(".entry");
const start = document.querySelector(".entry__submit");
const name = document.querySelector(".entry__name").value;
const greeting = document.querySelector(".welcome__h1");
const firstPage = document.querySelector(".section1");
const SecPage = document.querySelector(".section2");
const secretBox = document.querySelector(".right__secretbox");
const secretNumber = document.querySelector(".right__secretnum");
let guess = Number(document.querySelector(".left__guess").value);
const status = document.querySelector(".status-msg");
const check = document.querySelector(".left__btncheck");
const again = document.querySelector(".right__btnAgain");

const continu = document.querySelector(".left__btnContinue");

const play = document.querySelector(".right__btnplay");
const pause = document.querySelector(".right__btnpause");

const timer = document.querySelector(".timer");
const logger = document.querySelector(".logger");

//let timerr;

let count = 1;

let secretNum = Math.trunc(Math.random() * 20) + 1;
console.log(secretNum);

const enable = function () {
  document.querySelector(".left__btncheck").disabled = false;
  check.style.backgroundColor = "rgb(109, 210, 250)";
};

const disable = function () {
  document.querySelector(".left__btncheck").disabled = true;
  check.style.backgroundColor = "grey";
};

start.addEventListener("click", function () {
  const name = document.querySelector(".entry__name").value;
  //const namNum = Number(document.querySelector(".entry__name").value);

  if (name === "") {
    firstPage.style.display = "block";
    SecPage.style.display = "none";
    //start.style.opacity = 0;
  } else if (name != "") {
    firstPage.style.display = "none";
    SecPage.style.display = "block";
    greeting.textContent = `Hey, ${name.toUpperCase()}! You are in for a real fun!`;

    disable();
    document.querySelector(".left__guess").disabled = true;
  }
});

check.addEventListener("click", function () {
  guess = Number(document.querySelector(".left__guess").value);
  const status = document.querySelector(".status-msg");
  const add = guess + 1;
  const minus = guess - 1;
  console.log(add);
  status.style.opacity = "1";
  if (add === secretNum) {
    status.textContent = "A step closer! 😍";
  } else if (minus === secretNum) {
    status.textContent = "A step away! 😋";
  } else if (!guess) {
    status.textContent = "No number! ❌";
  } else if (guess > secretNum) {
    status.textContent = "Too high! 🏹";
  } else if (guess < secretNum) {
    status.textContent = "Too low! ↘";
  } else if (guess === secretNum) {
    status.textContent = "🎉 Correct!!!! ✔  CONTINUE!⌚...";
    logger.textContent = count++;
    disable();
    secretNumber.textContent = secretNum;
    secretBox.style.backgroundColor = "rgb(247, 230, 85)";
    secretNumber.style.color = "rgb(53, 1, 37)";
    secretBox.style.border = "4px solid rgb(53, 1, 37)";
    continu.style.opacity = "1";
  }
});

play.addEventListener("click", function () {
  enable();
  timer.style.backgroundColor = "rgb(178, 178, 252)";
  timer.style.color = "rgb(9, 4, 73)";
  countDown();
  document.querySelector(".left__btnContinue").disabled = false;
  continu.style.backgroundColor = "rgb(248, 224, 5)";
  check.style.display = "block";
  document.querySelector(".left__guess").disabled = false;

  // setTimeout(() => (again.style.opacity = 1), 10000);
});

again.addEventListener("click", function () {
  window.location.reload();
});

continu.addEventListener("click", function () {
  secretNum = Math.trunc(Math.random() * 20) + 1;
  enable();
  const status = document.querySelector(".status-msg");
  status.style.opacity = 0;
  document.querySelector(".left__guess").value = "";

  secretNumber.textContent = "???";
  secretBox.style.backgroundColor = "rgb(53, 1, 37)";
  secretNumber.style.color = " rgb(116, 115, 115)";
});


let time = 90;
let timerr = null;
const tick = function () {
  const timer = document.querySelector(".timer");


  const min = String(Math.trunc(time / 60)).padStart(2, 0);
  const sec = String(time % 60).padStart(2, 0);

  // In each call, print the remaining time to UI
  timer.textContent = `${min}:${sec}`;

  if (time === 0 && count < 6) {
    document.querySelector(".left__btnContinue").disabled = true;
    continu.style.backgroundColor = "grey";
    const status = document.querySelector(".status-msg");
    clearInterval(timerr);
    disable();
    play.disabled = true;
    play.style.backgroundColor = "grey";

    status.textContent = "💥 Sorry, You lost the game!";
  } else if (guess === secretNum && time > 0 && count === 6) {
    const status = document.querySelector(".status-msg");
    const name = document.querySelector(".entry__name").value;
    document.querySelector(".left__btnContinue").disabled = true;
    continu.style.backgroundColor = "grey";
    play.disabled = true;
    play.style.backgroundColor = "grey";
    clearInterval(timerr);
    disable();
    status.textContent = ` 🏆 
    Congratulations ${name.toUpperCase()}!
   You won at ${min}min and ${sec} sec!
   You did amazing! 🥇`;
  } else {
    const pause = document.querySelector(".right__btnpause");

    pause.addEventListener("click", function () {
      clearInterval(timerr);
      disable();
      document.querySelector(".left__btnContinue").disabled = true;
      continu.style.backgroundColor = "grey";
      document.querySelector(".left__guess").disabled = true;
      clearInterval(timerr);
    });
  }
  // Decrease 1s
  time--;
};

const countDown = function () {
  if (timerr !== null) {
    clearInterval(timer);
  }
  timerr = setInterval(tick, 1000);
};
