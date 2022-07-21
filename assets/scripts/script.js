
/* VARIABLES */

let pokemon = [
  { name: "bulbassaur", img: "assets/images/bulbassaur.png" },
  { name: "bulbassaur", img: "assets/images/bulbassaur.png" },
  { name: "caterpi", img: "assets/images/caterpi.png" },
  { name: "caterpi", img: "assets/images/caterpi.png" },
  { name: "charmander", img: "assets/images/charmander.png" },
  { name: "charmander", img: "assets/images/charmander.png" },
  { name: "eevee", img: "assets/images/eevee.png" },
  { name: "eevee", img: "assets/images/eevee.png" },
  { name: "jigglypuff", img: "assets/images/jigglypuff.png" },
  { name: "jigglypuff", img: "assets/images/jigglypuff.png" },
  { name: "lapras", img: "assets/images/lapras.png" },
  { name: "lapras", img: "assets/images/lapras.png" },
  { name: "metapod", img: "assets/images/metapod.png" },
  { name: "metapod", img: "assets/images/metapod.png" },
  { name: "pikachu", img: "assets/images/pikachu.png" },
  { name: "pikachu", img: "assets/images/pikachu.png" },
  { name: "squirtle", img: "assets/images/squirtle.png" },
  { name: "squirtle", img: "assets/images/squirtle.png" },
  { name: "zubat", img: "assets/images/zubat.png" },
  { name: "zubat", img: "assets/images/zubat.png" },
];

const boardDisplay = document.querySelector("#memory-board");
let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockBoard = false;
let cardsFlipped = [];

/* SHUFFLES POKEMON ARRAY */

pokemon.sort(() => Math.random() - 0.5);


/* CREATES CARDS AND BOARD */

function startGame() {
  for (item of pokemon) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.addEventListener("click", flipCard);

    const imageFront = document.createElement("img");
    imageFront.setAttribute("src", item.img);
    imageFront.setAttribute("data-name", item.name);
    imageFront.setAttribute("data-id", pokemon.indexOf(item));
    imageFront.classList.add("card-front");

    const imageBack = document.createElement("img");
    imageBack.setAttribute("src", "assets/images/pokeball.png");
    imageBack.classList.add("card-back");

    boardDisplay.appendChild(card);
    card.appendChild(imageFront);
    card.appendChild(imageBack);
  }
}

/* FLIPS CARDS CLICKED */

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  checkMatch();
  if (checkGameOver()) {
    let gameOverlay = document.querySelector(".game-over");
    setTimeout(() => {
      gameOverlay.style.display = "flex";
    }, 600);
  }
}

/* CHECKS IF CARDS FLIPPED MATCH */

function checkMatch() {
  if (
    firstCard.children[0].getAttribute("data-name") ===
    secondCard.children[0].getAttribute("data-name")
  ) {
    disableCards();
    return;
  }

  unflipCards();
}

/* DISABLES MATCHED CARDS */

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  cardsFlipped.push(firstCard);
  secondCard.removeEventListener("click", flipCard);
  cardsFlipped.push(secondCard);

  resetBoard();
}

/* UNFLIPS UNMATCHED CARDS */

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

/* RESET VARIABLES */

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

/* CHECKS IF GAME IS OVER */
function checkGameOver() {
  if (cardsFlipped.length == pokemon.length) {
    return true;
  }
}

/* RESTART THE GAME */

function restart() {
  document.querySelectorAll(".card").forEach((e) => e.remove());
  startGame();
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  cardsFlipped = [];
  document.querySelector(".game-over").style.display = "none";
}

/* START GAME */
startGame();
