// wordlist
const wordList = [
  {
    word: "anchor",
    hint: "better make these bombproof",
    img: "./assets/images/anchor.jpg",
    msg: "You belay from these, so it better be solid!"
  },
  {
    word: "arete",
    hint: "climbing up the corner",
    img: "./assets/images/arete.jpg",
    msg: "These climbs are the most fun. Lots of heelhooks for stability."
  },
  {
    word: "belayer",
    hint: "alex honnold doesn't always need one of these",
    img: "./assets/images/",
    msg: "Always have to trust your belayer."
  },
  {
    word: "beta",
    hint: "don't spray",
    img: "./assets/images/beta.jpg",
    msg: "This means the specific move info about the climb."
  },
  {
    word: "bomber",
    hint: "totems",
    img: "./assets/images/bomber.jpg",
    msg: "Means the placement is bombproof. Not going anywhere. Like this cam."
  },
  {
    word: "bouldering",
    hint: "this is dumb...compared to routes",
    img: "./assets/images/bouldering.jpg",
    msg: "Climbing on shorter walls. Can be fun for strength training."
  },
  {
    word: "camalot",
    hint: "C4",
    img: "./assets/images/camalot.jpg",
    msg:
      "A very popular type of spring-loaded-camming-device from Black Diamond"
  },
  {
    word: "chimney",
    hint: "first few pitches of epinephrine",
    img: "./assets/images/chimney.jpg",
    msg: "A climb where you use your whole body for progress."
  },
  {
    word: "chock",
    hint: "nuts",
    img: "./assets/images/chock.gif",
    msg: "A passive piece of gear that sits tight in a constriction of rock."
  },
  {
    word: "dihedral",
    hint: "triple-s",
    img: "./assets/images/dihedral.jpg",
    msg:
      "You ascend this type of climb by stemming (using friction on your shoes) against both walls. Minimal hand/foot holds."
  },
  {
    word: "flash",
    hint: "first time, but not an onsight",
    img: "./assets/images/flash.jpg",
    msg: "If you have a little beta, but it's your first try, and you send."
  },
  {
    word: "gaston",
    hint: "love these moves",
    img: "./assets/images/gaston.jpg",
    msg: "The picture shoes this type of hold best."
  },
  {
    word: "heelhook",
    hint: "always gotta use those heels",
    img: "./assets/images/heelhook.jpg",
    msg: "Used for keeping you on the wall when you might otherwise pull off."
  },
  {
    word: "highball",
    hint: "sketchier than trad",
    img: "./assets/images/highball.jpg",
    msg: "A very high boulder. Falls are likely serious injury."
  },
  {
    word: "leader",
    hint: "the sharp end",
    img: "./assets/images/leader.jpg",
    msg:
      "In route climbing, the leader goes up first and sets up an anchor to belay the second."
  },
  {
    word: "lockoff",
    hint: "master this and you'll be set",
    img: "./assets/images/lockoff.jpg",
    msg: "You 'lock-off' on one harm to be able to move up the other."
  },
  {
    word: "mantel",
    hint: "fitz caldwell has this down",
    img: "./assets/images/mantel.png",
    msg: "A move to move over a ledge or past slopers."
  },
  {
    word: "offwidth",
    hint: "chicken wings and body jams",
    img: "./assets/images/offwidth.jpg",
    msg: "A crack that is thin to chimney, but too wide to jam."
  },
  {
    word: "pumped",
    hint: "basically any climb at the RRG",
    img: "./assets/images/pumped.jpg",
    msg:
      "Hard not to get pumped when you're climbing hard and sustained routes. Keep resting and massaging your forearms."
  },
  {
    word: "quickdraw",
    hint: "need this for sport climbing",
    img: "./assets/images/quickdraw.jpg",
    msg: "One end for the wall, one end for your rope. Used in sport climbing."
  },
  {
    word: "redpoint",
    hint: "gotta send",
    img: "./assets/images/redpoint.jpg",
    msg: "When you get the send after working the route more than once."
  },
  {
    word: "runout",
    hint: "get that trad head",
    img: "./assets/images/runout.jpg",
    msg:
      "Sometimes placements are hard to find and you have a long distance between them."
  },
  {
    word: "sidepull",
    hint: "hope it's a jug",
    img: "./assets/images/sidepull.JPG",
    msg: "A hold that is pulled at horizontally."
  },
  {
    word: "sloper",
    hint: "definitely not a jug",
    img: "./assets/images/sloper.jpg",
    msg:
      "Friction and the direction of pull are the only things you can count on for these holds."
  },
  {
    word: "toprope",
    hint: "the most badass",
    img: "./assets/images/toprope.jpg",
    msg:
      "Not the most badass, but probably most new climbers' first type of climbing."
  },
  {
    word: "traverse",
    hint: "pitch 15, dawn wall",
    img: "./assets/images/traverse.jpg",
    msg: "Moving horizontally across a section of wall."
  },
  {
    word: "whipper",
    hint: "always take the whip",
    img: "./assets/images/whipper.jpg",
    msg: "A fall on lead."
  }
];

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
let winMsgText;

// grab ids
let target = document.querySelector("#target");
let changeText = document.querySelector("#changeText");
let guessText = document.querySelector("#lettersUsed");
let winText = document.querySelector("#wins");
let lossText = document.querySelector("#losses");
let guessesLeftText = document.querySelector("#guessesRemaining");
let hintText = document.querySelector("#hint");
let winPicDiv = document.querySelector("#winPicDiv");
let winTextDiv = document.querySelector("#winTextDiv");
let answerBorder = document.querySelector("#answerBorder");

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
  winMsgText = wordList[random].msg;
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
    changeText.textContent = `You won!! The word was ${targetWord}.`;
    wins++;
    winText.textContent = wins;
    // add win image
    winPic = document.createElement("img");
    winPic.src = wordList[random].img;
    winPic.alt = wordList[random].word;
    winPic.width = 250;
    winPic.classList.add("img-responsive", "border", "m-3");
    winPicDiv.appendChild(winPic);
    // add win text
    winMsg = document.createElement("p");
    winMsg.classList.add("lead", "text-center");
    winMsg.textContent = winMsgText;
    winTextDiv.appendChild(winMsg);
    // add temporary css
    answerBorder.classList.add("jumbotron");
    // reset game
    resetGame();
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

  // have guessText set a timeout to change the text from winning to new game
  setTimeout(function() {
    changeText.textContent = "Press a key to play again!";
    winPicDiv.removeChild(winPic);
    winTextDiv.removeChild(winMsg);
    answerBorder.classList.remove("jumbotron");
  }, 4000);
  hintText.textContent = "";

  // it was important to set the targetWord to a falsy value so that word() would recognize it should generate a new one
  targetWord = "";
}
