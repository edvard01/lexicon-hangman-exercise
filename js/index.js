function initWords() {
  return [
    "whistle",
    "captain",
    "diamond",
    "victory",
    "laughter",
    "triumph",
    "giraffe",
    "paradise",
    "radiance",
    "fantasy",
    "whisper",
    "harbor",
    "genuine",
    "tranquil",
    "magnolia",
    "infinity",
    "marathon",
    "sunshine",
    "nectar",
    "zeppelin",
    "journey",
    "blossom",
    "adventure",
    "wisdom",
    "captivate",
    "lullaby",
    "illusion",
    "whimsical",
    "velvet",
    "landscape",
    "whispering",
    "luminous",
    "effervescent",
    "cascade",
    "breathtaking",
    "orchestra",
    "butterfly",
    "miracle",
    "reflection",
    "majestic",
    "melody",
    "fascinate",
    "enchantment",
    "mesmerize",
    "illuminate",
    "serendipity",
    "gratitude",
    "inspiration",
    "moonlight",
    "soaring",
    "enlighten",
    "harmonize",
    "stardust",
    "bewitching",
    "splendid",
    "brilliance",
    "glorious",
    "mysterious",
    "effulgent",
    "enthrall",
    "vibrant",
    "whirlwind",
    "charisma",
    "ethereal",
    "glisten",
    "labyrinth",
    "tranquility",
    "celestial",
    "catalyst",
    "luminary",
    "whimsy",
    "efflorescent",
    "mesmeric",
    "ephemeral",
    "serenity",
    "enigma",
    "quintessence",
    "whisperer",
    "aureate",
    "ecstasy",
    "mellifluous",
    "rhapsody",
    "cascade",
    "ephemeral",
    "solitude",
    "zenith",
    "exquisite",
    "bravery",
    "brevity",
    "clarity",
    "delight",
    "eloquence",
    "happiness",
    "innocence",
    "liberty",
    "magnificent",
    "nostalgia",
    "opulent",
    "patience",
    "radiant",
    "tranquil",
    "vivid",
    "wonder",
    "zenith",
    "adventure",
    "blossom",
    "celebrate",
    "whimsical",
    "captivating",
    "effervescent",
    "enchanting",
    "fascinate",
    "luminous",
    "mesmerize",
    "serenity",
    "splendid",
    "whisper",
    "enigma",
    "breathtaking",
    "labyrinth",
    "mysterious",
    "ethereal",
    "harmony",
    "orchestra",
    "rhapsody",
    "tranquility",
    "beauty",
    "delight",
    "elegance",
    "grace",
    "harmonize",
    "inspiration",
    "luminosity",
    "serendipity",
    "whimsy",
    "radiance",
    "zeppelin",
    "effulgent",
    "glisten",
    "solitude",
    "celestial",
    "enthrall",
    "giraffe",
    "paradise",
    "reflection",
    "moonlight",
    "efflorescent",
    "brilliance",
    "glorious",
    "butterfly",
    "miracle",
    "majestic",
    "melody",
    "fascinate",
    "enchantment",
    "illuminate",
    "whirlwind",
    "charisma",
    "luminary",
    "bewitching",
    "vibrant",
    "ethereal",
    "glisten",
    "labyrinth",
    "tranquility",
    "celestial",
    "catalyst",
    "luminary",
    "whimsy",
    "efflorescent",
    "mesmeric",
    "ephemeral",
    "serenity",
    "enigma",
    "quintessence",
    "whisperer",
    "aureate",
    "ecstasy",
    "enchanting",
    "mellifluous",
    "rhapsody",
    "ebb",
    "cascade",
    "ephemeral",
    "solitude",
    "zenith",
    "exquisite",
    "bravery",
    "brevity",
    "clarity",
    "delight",
    "eloquence",
    "happiness",
    "innocence",
    "liberty",
    "magnificent",
    "nostalgia",
    "opulent",
  ];
}

const words = initWords();

let counter = 0;
let randomNr = Math.floor(Math.random() * words.length);
let wordOfTheDay = words[randomNr];
console.log(wordOfTheDay);
let answer = wordOfTheDay.split("");
let currentState = wordOfTheDay.split("");
let gamestate = true;
const svgPaths = document.querySelectorAll("path");
const letterBoxes = document.querySelector(".letter-boxes");
const wrongGuesses = document.getElementById("guessed-letters");
let alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "å",
  "ä",
  "ö",
];

setup();

const boxes = document.querySelectorAll(".box");

document.addEventListener("keypress", (e) => {
  if (gamestate) {
    let occurences = checkInput(e.key);
    if (occurences.length === 0 && alphabet.indexOf(e.key) !== -1) {
      alphabet.splice(alphabet.indexOf(e.key), 1);
      svgPaths[counter].style.opacity = 1;
      counter++;
      wrongGuesses.innerHTML += `${e.key} `;

      if (counter === svgPaths.length) {
        gamestate = false;
        gameOver();
        playAgain();
      }
    } else {
      occurences.forEach((element) => {
        boxes[element].childNodes[0].innerHTML = answer[element].toUpperCase();
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
  for (let index = 0; index < answer.length; index++) {
    if (answer[index] === input) {
      occurences = getOccurences(input);
      removeOccurence(input);
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

// function wrongGuess(letter) {
//   let index = alphabet.indexOf(letter);
//   if (index !== -1) {
//     let returnValue = alphabet[index];
//     alphabet.splice(index, 1);
//     return returnValue;
//   }
//   return 0;
// }

function removeOccurence(letter) {
  while (currentState.indexOf(letter) !== -1) {
    currentState.splice(currentState.indexOf(letter), 1);
  }
  return letter;
}
