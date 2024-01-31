let counter = 0;
let wordOfTheDay = "bananmåltid";
let answer = wordOfTheDay.split("");
let currentState = wordOfTheDay.split("");
let gamestate = true;

const svgPaths = document.querySelectorAll("path");
const letterBoxes = document.querySelector(".letter-boxes");

setup();

const boxes = document.querySelectorAll(".box");

document.addEventListener("keypress", (e) => {
  if (gamestate) {
    let occurences = checkInput(e.key);
    if (occurences.length === 0) {
      svgPaths[counter].style.opacity = 1;
      counter++;
      if (counter === svgPaths.length) {
        gamestate = false;
        gameOver();
      }
    } else {
      occurences.forEach((element) => {
        boxes[element].childNodes[0].innerHTML = answer[element].toUpperCase();
      });
    }
  }
});

function setup() {
  svgPaths.forEach((element) => {
    element.style.opacity = 0;
  });

  answer.forEach((letter) => {
    let html = `<div class="box"><h1></h1></div>`;
    letterBoxes.innerHTML += html;
  });
}

function checkInput(input) {
  let occurences = [];
  for (let index = 0; index < currentState.length; index++) {
    if (currentState[index] === input) {
      occurences.push(index);
      currentState[index] = ".";
    }
  }
  return occurences;
}

function gameOver() {
  let html = "<h1>GAME OVER</h1>";
  letterBoxes.innerHTML = html;
}
