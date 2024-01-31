let counter = 0;
let wordOfTheDay = "bananmåltid";
let answer = wordOfTheDay.split("");
let currentState = wordOfTheDay.split("");

const svgPaths = document.querySelectorAll("path");
console.log(svgPaths);
const letterBoxes = document.querySelector(".letter-boxes");

setup();

const boxes = document.querySelectorAll(".box");
console.log(boxes.length);

document.addEventListener("keypress", (e) => {
  let occurences = checkInput(e.key);
  if (occurences.length === 0) {
    svgPaths[counter].style.opacity = 1;
    counter++;
  } else {
    occurences.forEach((element) => {
      console.log(answer);
      boxes[element].childNodes[0].innerHTML = answer[element];
    });
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
  console.log(occurences);
  return occurences;
}
