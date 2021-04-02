const phrases = [
  "seize the day",
  "just do it",
  "once upon a time",
  "it is what it is",
  "never a dull moment",
];

const qwerty = document.getElementById("qwerty");
const phraseUl = document.querySelector("#phrase ul");
const startOverlay = document.getElementById("overlay");
const startBtn = document.querySelector("#overlay .btn__reset");
const scoreboard = document.getElementById("scoreboard");
const images = scoreboard.querySelectorAll("img");

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
      match = button;
    }
  }
  return match;
};

function refreshPage() {
  window.location.reload();
}

function reset() {
  const over = document.querySelector(".over");
  if (over) {
    over.addEventListener("click", () => {
      refreshPage();
    });
  }
}

const checkWin = () => {
  let letterCount = document.querySelectorAll(".letter").length;
  let showCount = document.querySelectorAll(".show").length;
  const h3 = document.createElement("h3");

  if (letterCount === showCount) {
    startOverlay.style.display = "flex";
    startOverlay.classList.add("win");
    startBtn.textContent = "Try Again";
    startBtn.classList.add("over");
    h3.textContent = "You Won!";
    startOverlay.appendChild(h3);
    reset();
  } else if (missed > 4) {
    startOverlay.style.display = "flex";
    startOverlay.classList.add("lose");
    startBtn.textContent = "Try Again";
    startBtn.classList.add("over");
    h3.textContent = "You Lose!";
    startOverlay.appendChild(h3);
    reset();
  }
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
  checkWin();
});
