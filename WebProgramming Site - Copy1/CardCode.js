const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

let img1 = new Image()
img1 = {
    "image": "chili.png",
    "name": "chili"
}
var img2 = new Image()
img2 = {
    "image": "grapes.png",
    "name": "grapes"
}
var img3 = new Image()
img3 = {
    "image": "lemon.png",
    "name": "lemon"
}
var img4 = new Image()
img4 = {
    "image": "orange.png",
    "name": "orange"
}
var img5 = new Image()
img5 = {
    "image": "pineapple.png",
    "name": "pineapple"
}
var img6 = new Image()
img6 = {
    "image": "strawberry.png",
    "name": "strawberry"
}
var img7 = new Image()
img7 = {
    "image": "tomato.png",
    "name": "tomato"
}
var img8 = new Image()
img8 = {
    "image": "watermelon.png",
    "name": "watermelon"
}
var img9 = new Image()
img9 = {
    "image": "cherries.png",
    "name": "cherries"
}
cards[0] = img1;
cards[1] = img2;
cards[2] = img3;
cards[3] = img4;
cards[4] = img5;
cards[5] = img6;
cards[6] = img7;
cards[7] = img8;
cards[8] = img9;
cards[9] = img1;
cards[10] = img2;
cards[11] = img3;
cards[12] = img4;
cards[13] = img5;
cards[14] = img6;
cards[15] = img7;
cards[16] = img8;
cards[17] = img9;
//console.log(cards[0].image + "")
shuffleCards()
generateCards()

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
 
    for (let card of cards) {
        const cardElement = document.createElement("div");
        //console.log(card);
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
          <div class="front">
            <img class="front-image" src=${card.image} />
          </div>
          <div class="back"></div>
        `;
        gridContainer.appendChild(cardElement); //there is an error here "cannot read properties of null" 
        //console.log("deggegee");
        cardElement.addEventListener("click", flipCard);
      }
  
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;

    
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards(); //if isMatch then disable cards, else unflip cards
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    score++
    document.querySelector(".score").textContent = score;
    //I need to check here if all matches have been made

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}
