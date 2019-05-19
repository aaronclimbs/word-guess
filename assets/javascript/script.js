// define variables
let wins = 0;
let losses = 0;
let usedGuesses = [];
let remaining = 8;
let targetWord;
let wordArr;
let guess;
let spanArray = [];
let wordHint;
const wordList = [
  { word: "anchor", hint: "better make these bombproof" },
  { word: "arete", hint: "climbing up the corner" },
  { word: "belayer", hint: "alex honnold doesn't always need one of these" },
  { word: "beta", hint: "don't spray" },
  { word: "bomber", hint: "totems" },
  { word: "camalot", hint: "C4" },
  { word: "chimney", hint: "first few pitches of epinephrine" },
  { word: "chock", hint: "nuts" },
  { word: "dihedral", hint: "triple-s" },
  { word: "flash", hint: "first time, but not an onsight" },
  { word: "gaston", hint: "love these moves" },
  { word: "heelhook", hint: "always gotta use those heels" },
  { word: "highball", hint: "sketchier than trad" },
  { word: "leader", hint: "the sharp end" },
  { word: "lockoff", hint: "master this and you'll be set" },
  { word: "mantel", hint: "fitz caldwell has this down" },
  { word: "offwidth", hint: "chicken wings and body jams" },
  { word: "pumped", hint: "basically any climb at the RRG" },
  { word: "quickdraw", hint: "need this for sport climbing" },
  { word: "redpoint", hint: "gotta send" },
  { word: "route", hint: "bouldering is stupid" },
  { word: "runout", hint: "get that trad head" },
  { word: "sidepull", hint: "hope it's a jug" },
  { word: "sloper", hint: "definitely not a jug" },
  { word: "toprope", hint: "the most badass" },
  { word: "traverse", hint: "pitch 15, dawn wall" },
  { word: "whipper", hint: "always take the whip" }
];
// grab ids
let target = document.querySelector("#target");
let changeText = document.querySelector("#changeText");
let guessText = document.querySelector("#lettersUsed");
let winText = document.querySelector("#wins");
let lossText = document.querySelector("#losses");
let guessesLeftText = document.querySelector("#guessesRemaining");
let hintText = document.querySelector("#hint");

// watch for events
window.addEventListener("keyup", getKey);

// select random word and add underscores for each letter
function word() {
  random = Math.floor(Math.random() * wordList.length);
  targetWord = wordList[random].word;
  wordHint = wordList[random].hint;
  hintText.textContent = wordHint;
  // console.log(targetWord);
  targetWord.split("").map(ltr => {
    let span = document.createElement("span");
    span.classList = "mx-2 word";
    // this may be unnecessary
    // span.id = `${targetWord.split("").indexOf(ltr)}span`;
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
      changeText.textContent = "Please enter a letter to continue.";
    }
  } else {
    word();
  }
}
// for debugging
// guess = "e";
// usedGuesses = ["f", "b", "y"];
// targetWord = "sidepull";
// spanArray = [];

function game() {
  changeText.textContent = "Guess the word!";
  spanArray = Array.from(document.querySelectorAll(".word"));
  wordArr = targetWord.split("");
  if (remaining > 0) {
    // check if letter has been used
    if (!usedGuesses.includes(guess)) {
      // if not, push to array
      usedGuesses.push(guess);
      guessText.textContent = usedGuesses.join(", ");
      if (wordArr.includes(guess)) {
        let indexArr = [];
        // iterate through targetWord array
        // if match guess, push index to new array
        for (let i = 0; i < wordArr.length; i++) {
          if (wordArr[i] === guess) {
            indexArr.push(i);
          }
        }
        // for each index in new array change text content to match guess
        indexArr.map(index => {
          spanArray[index].innerHTML = guess;
        });

        //run checkWin function
        checkWin();
      } else {
        // decrement remaining + log to document
        remaining--;
        guessesLeftText.textContent = remaining;
      }
    } else {
      changeText.textContent = `${guess} was already used. Try another letter.`;
    }
  } else {
    losses++;
    lossText.textContent = losses;
    changeText.textContent = `You lost! Press a key to play again.`;
    resetGame();
  }
}

/*/ Pseudocode

On page load, display title, picture, description etc. + wait for keypress to continue.

On keypress, generate random word (and spans to represent each letter) and begin loop.

For loop - for each keypress, run loop to check if letter (must be lowercase letter) is in target word array and if so, replace ALL matching letter spans with correct letter.

add if no empty spans left (need to figure out how to check this), then run gameWin function

if not, add to letters used array (display this), and decrement guesses left (update on page)

at close of loop run gameOver function

/*/

function checkWin() {
  // check if span arrays still contain any underscores by filtering array
  if (spanArray.filter(item => item.textContent === "_").length === 0) {
    changeText.textContent = `You won!! The word was ${targetWord}`;
    wins++;
    winText.textContent = wins;
    resetGame();
  }
}

function resetGame() {
  // reset all scores and delete span nodes
  usedGuesses = [];
  guessText.textContent = "";
  remaining = 8;
  guessesLeftText.textContent = remaining;

  // found this polyfill - sets first element child, removes it and sets a new first child until it returns false
  let first = target.firstElementChild;
  while (first) {
    first.remove();
    first = target.firstElementChild;
  }
  setTimeout(function() {
    changeText.textContent = "Press a key to play again!";
  }, 3000);
  hintText.textContent = "";

  // it was important to set the targetWord to a falsy value so that word() would recognize it should generate a new one
  targetWord = "";
}
