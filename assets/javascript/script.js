// define variables
let wins = 0;
let losses = 0;
let usedGuesses = [];
let remaining = 5;
let targetWord;
let wordArr;
let guess;
let spanArray = [];
let wordHint;
let winPicSrc;
const wordList = [
  {
    word: "anchor",
    hint: "better make these bombproof",
    img: "./images/anchor.jpg"
  },
  { word: "arete", hint: "climbing up the corner", img: "./images/arete.jpg" },
  {
    word: "belayer",
    hint: "alex honnold doesn't always need one of these",
    img: "./images/"
  },
  { word: "beta", hint: "don't spray", img: "./images/beta.jpg" },
  { word: "bomber", hint: "totems", img: "./images/bomber.jpg" },
  {
    word: "bouldering",
    hint: "this is dumb...compared to routes",
    img: "./images/bouldering.jpg"
  },
  { word: "camalot", hint: "C4", img: "./images/camalot.jpg" },
  {
    word: "chimney",
    hint: "first few pitches of epinephrine",
    img: "./images/chimney.jpg"
  },
  { word: "chock", hint: "nuts", img: "./images/chock.gif" },
  { word: "dihedral", hint: "triple-s", img: "./images/dihedral.jpg" },
  {
    word: "flash",
    hint: "first time, but not an onsight",
    img: "./images/flash.jpg"
  },
  { word: "gaston", hint: "love these moves", img: "./images/gaston.jpg" },
  {
    word: "heelhook",
    hint: "always gotta use those heels",
    img: "./images/heelhook.jpg"
  },
  {
    word: "highball",
    hint: "sketchier than trad",
    img: "./images/highball.jpg"
  },
  { word: "leader", hint: "the sharp end", img: "./images/leader.jpg" },
  {
    word: "lockoff",
    hint: "master this and you'll be set",
    img: "./images/lockoff.jpg"
  },
  {
    word: "mantel",
    hint: "fitz caldwell has this down",
    img: "./images/mantel.png"
  },
  {
    word: "offwidth",
    hint: "chicken wings and body jams",
    img: "./images/offwidth.jpg"
  },
  {
    word: "pumped",
    hint: "basically any climb at the RRG",
    img: "./images/pumped.jpg"
  },
  {
    word: "quickdraw",
    hint: "need this for sport climbing",
    img: "./images/quickdraw.jpg"
  },
  { word: "redpoint", hint: "gotta send", img: "./images/redpoint.jpg" },
  { word: "runout", hint: "get that trad head", img: "./images/runout.jpg" },
  { word: "sidepull", hint: "hope it's a jug", img: "./images/sidepull.JPG" },
  { word: "sloper", hint: "definitely not a jug", img: "./images/sloper.jpg" },
  { word: "toprope", hint: "the most badass", img: "./images/toprope.jpg" },
  {
    word: "traverse",
    hint: "pitch 15, dawn wall",
    img: "./images/traverse.jpg"
  },
  {
    word: "whipper",
    hint: "always take the whip",
    img: "./images/whipper.jpg"
  }
];
// grab ids
let target = document.querySelector("#target");
let changeText = document.querySelector("#changeText");
let guessText = document.querySelector("#lettersUsed");
let winText = document.querySelector("#wins");
let lossText = document.querySelector("#losses");
let guessesLeftText = document.querySelector("#guessesRemaining");
let hintText = document.querySelector("#hint");
let winPicDiv = document.querySelector("#winPicDiv");

// watch for events
window.addEventListener("keyup", getKey);

/*/ Pseudocode

On page load, display title, picture, description etc. + wait for keypress to continue.

On keypress, generate random word (and spans to represent each letter) and begin loop.

For loop - for each keypress, run loop to check if letter (must be lowercase letter) is in target word array and if so, replace ALL matching letter spans with correct letter.

add if no empty spans left (need to figure out how to check this), then run gameWin function

if not, add to letters used array (display this), and decrement guesses left (update on page)

at close of loop run gameOver function

/*/

// select random word and add underscores for each letter
function word() {
  random = Math.floor(Math.random() * wordList.length);
  targetWord = wordList[random].word;
  wordHint = wordList[random].hint;
  hintText.textContent = wordHint;
  winPicSrc = wordList[random].img;
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

function checkWin() {
  // check if span arrays still contain any underscores by filtering array
  if (spanArray.filter(item => item.textContent === "_").length === 0) {
    changeText.textContent = `You won!! The word was ${targetWord}`;
    wins++;
    winText.textContent = wins;
    winPic = document.createElement("img");
    winPic.src = wordList[random].img;
    winPic.alt = wordList[random].word;
    winPic.classList.add("img-responsive");
    winPicDiv.appendChild(winPic);
    // resetGame();
  }
}

function resetGame() {
  // reset all scores and delete span nodes
  usedGuesses = [];
  guessText.textContent = "";
  remaining = 5;
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

  // remove the photo
  winPicDiv.removeChild();
}
