const phrases = [
  "seize the day",
  "just do it",
  "once again",
  "it is what it is",
  "never a dull moment",
  "and one",
];

const qwerty = document.getElementById("qwerty");
const phraseUl = document.querySelector("#phrase ul");
const startOverlay = document.getElementById("overlay");
const startBtn = document.querySelector("#overlay .btn__reset");
const scoreboard = document.getElementById("scoreboard");
const images = scoreboard.querySelectorAll("img");
const h3 = document.createElement("h3");

let missed = 0;

function getRandomPhraseAsArray(arr) {
  let randomIndex = Math.floor(Math.random() * phrases.length);
  let randomPhrase = phrases[randomIndex].split("");
  return randomPhrase;
}

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement("li");
    li.textContent = arr[i];
    if (arr[i] !== " ") {
      li.classList.add("letter");
      phraseUl.appendChild(li);
    } else {
      li.classList.add("space");
      phraseUl.appendChild(li);
    }
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

const checkLetter = (button) => {
  const letter = document.querySelectorAll(".letter");
  let match = null;
  for (let i = 0; i < letter.length; i++) {
    if (button === letter[i].textContent) {
      letter[i].classList.add("show");
      letter[i].classList.add("animate");
      match = button;
    }
  }
  return match;
};

function reset() {
  const over = document.querySelector(".over");
  const buttons = qwerty.querySelectorAll("button");

  if (over) {
    over.addEventListener("click", () => {
      startOverlay.classList.remove("win");
      startOverlay.classList.remove("lose");
      h3.textContent = "";
      missed = 0;
      while (phraseUl.firstChild) {
        phraseUl.removeChild(phraseUl.firstChild);
      }
      const phraseArray = getRandomPhraseAsArray(phrases);
      addPhraseToDisplay(phraseArray);
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("chosen");
        buttons[i].disabled = false;
      }
      for (let i = 0; i < images.length; i++) {
        images[i].src = "images/liveHeart.png";
      }
    });
  }
}

// win or lose overlay display function
const overlayEnd = (result) => {
  startOverlay.style.display = "flex";
  startBtn.textContent = "Try Again";
  startBtn.classList.add("over");
  if (result) {
    startOverlay.classList.add("win");
    h3.textContent = "You Won!";
  } else {
    startOverlay.classList.add("lose");
    h3.textContent = "You Lose!";
  }
  startOverlay.appendChild(h3);
};

const checkWin = () => {
  let letterCount = document.querySelectorAll(".letter").length;
  let showCount = document.querySelectorAll(".show").length;
  let outcome = null;

  if (letterCount === showCount) {
    outcome = true;
    overlayEnd(outcome);
    reset();
    return "win";
  } else if (missed > 4) {
    overlayEnd(outcome);
    reset();
    return "lose";
  }
};
const checkWinTimer = () => {
  setTimeout(checkWin, 4000);
};

const stop = () => {
  clearTimeout(time);
};

startBtn.addEventListener("click", () => {
  startOverlay.style.display = "none";
});

qwerty.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.classList.add("chosen");
    e.target.disabled = true;

    let letterFound = checkLetter(e.target.textContent);
    if (!letterFound) {
      missed++;
      images[missed - 1].src = "images/lostHeart.png";
    }
  }

  checkWinTimer();
});
