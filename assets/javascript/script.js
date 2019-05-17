// define variables
let score;
let attempts;
let remaining = 13;
let targetWord;
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

// watch for events
window.addEventListener("keyup", gameStart);

function gameStart(e) {
  console.log(e);
  game();
}

function initialWord() {
  targetWord = wordList[Math.floor(Math.random() * wordList.length)]; //?
  console.log(targetWord);
  targetWord.split("").map(ltr => {
    let span = document.createElement("span");
    span.classList = "mx-2";
    span.id = `${ltr}span`;
    span.appendChild(document.createTextNode("_"));
    target.appendChild(span);
  });
}

/*/ Pseudocode

On page load, display title, picture, description etc. + wait for keypress to continue.

On keypress, generate random word (and spans to represent each letter) and begin loop.

For loop - for each keypress, run loop to check if letter (must be lowercase letter) is in target word array and if so, replace ALL matching letter spans with correct letter.

add if no empty spans left (need to figure out how to check this), then run gameWin funciton

if not, add to letters used array (display this), and decrement guesses left (update on page)

at close of loop run gameOver function

/*/
