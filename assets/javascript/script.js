// define variables
let score;
let attempts;
let remaining = 13;
let targetWord;
let guess;
let usedGuesses = [];
const wordList = [
  "belay",
  "route",
  "pumped",
  "flash",
  "anchor",
  "quickdraw",
  "beta",
  "arete",
  "bomber",
  "dihedral",
  "chimney",
  "chock",
  "camalot",
  "gaston",
  "highball",
  "lockoff",
  "mantel",
  "offwidth",
  "runout",
  "redpoint",
  "sloper",
  "sidepull",
  "traverse",
  "toprope",
  "leader",
  "whipper"
];

// grab ids
target = document.querySelector("#target");
changeText = document.querySelector("#changeText");

// watch for events
window.addEventListener("keyup", getKey);

function word() {
  targetWord = wordList[Math.floor(Math.random() * wordList.length)]; //?
  console.log(targetWord);
  targetWord.split("").map(ltr => {
    let span = document.createElement("span");
    span.classList = "mx-2";
    span.id = `${targetWord.split("").indexOf(ltr)}span`;
    span.appendChild(document.createTextNode("_"));
    target.appendChild(span);
  });
}

function getKey(e) {
  if (targetWord) {
    guess = e.key;
    // validate input as lowercase letter
    if (guess.charCodeAt() > 96 && guess.charCodeAt() < 123) {
      game();
    } else {
      // message to user
      changeText.textContent = "Please enter a lowercase letter to continue.";
    }
  } else {
    word();
  }
}

function game() {
  if (remaining) {
    if (!usedGuesses.includes(guess)) {
      usedGuesses.push(guess);
      if (targetWord.split("").includes(guess)) {
        console.log(targetWord.split("").filter(match => match === guess));
      } else {
        remaining--;
        console.log(`sorry! ${remaining} guesses left.`);
      }
    } else {
      console.log(`${guess} already used. Try another letter.`);
    }
    // for (let j = 0; j < targetWord.length; j++) {
    //   if (targetWord[j] === event.key) {
    //     console.log(`${guess} was right!`);
    //     continue;
    //   } else {
    //     remaining--;
    //     console.log("wrong letter");
    //   }
  }
}

/*/ Pseudocode

On page load, display title, picture, description etc. + wait for keypress to continue.

On keypress, generate random word (and spans to represent each letter) and begin loop.

For loop - for each keypress, run loop to check if letter (must be lowercase letter) is in target word array and if so, replace ALL matching letter spans with correct letter.

add if no empty spans left (need to figure out how to check this), then run gameWin funciton

if not, add to letters used array (display this), and decrement guesses left (update on page)

at close of loop run gameOver function

/*/
