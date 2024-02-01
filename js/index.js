getJsonValues().then((wordsArray) => {
  let counter = 0;
  let randomNr = Math.floor(Math.random() * wordsArray.length);
  let wordOfTheDay = wordsArray[randomNr];
  console.log(wordOfTheDay);
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
          playAgain();
        }
      } else {
        occurences.forEach((element) => {
          boxes[element].childNodes[0].innerHTML =
            answer[element].toUpperCase();
        });

        if (currentState.length === 0) {
          gamestate = false;
          win();
          playAgain();
        }
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
        occurences = getOccurences(input);
        currentState.splice(index, 1);
        break;
      }
    }
    return occurences;
  }

  function gameOver() {
    let html = `<h1>GAME OVER <br> Word was: ${wordOfTheDay}</h1>`;
    letterBoxes.innerHTML = html;
  }

  function win() {
    let newEl = document.createElement("h1");
    let newText = document.createTextNode("YOU WIN!");
    newEl.appendChild(newText);
    letterBoxes.insertAdjacentElement("afterend", newEl);
  }

  function getOccurences(input) {
    let occurences = [];
    for (let index = 0; index < answer.length; index++) {
      if (answer[index] === input) {
        occurences.push(index);
      }
    }
    return occurences;
  }

  const btn = document.querySelector("#play-again-btn");
  btn.addEventListener("click", (e) => {
    location.reload();
  });

  function playAgain() {
    const btn = document.querySelector("#play-again-btn");
    btn.style.display = "block";
  }
});

function getJsonValues() {
  return fetch("js/words.json")
    .then((response) => response.json())
    .then((data) => {
      return data.words;
    });
}
