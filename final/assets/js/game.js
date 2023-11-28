// Selecting DOM elements
const cards = document.querySelectorAll(".card");
const timeTag = document.querySelector(".time b");
const flipsTag = document.querySelector(".flips b");
const box = document.querySelector('.box');

// Game variables
let maxTime = 60;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let timer;
let cardOne, cardTwo;
let disableDeck = false;

// Initializes the game
function startGame() {
    resetGameVariables();
    shuffleCard();
    cards.forEach(card => card.addEventListener("click", flipCardEvent));
    timer = setInterval(initTimer, 1000);
}

// Resets game variables
function resetGameVariables() {
    timeLeft = maxTime;
    flips = 0;
    matchedCard = 0;
    cardOne = cardTwo = null;
    disableDeck = false;

    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    if(timer) clearInterval(timer);
}

// Ends the game and displays a message
function endGame(didWin) {
    clearInterval(timer);
    cards.forEach(card => card.style.display = 'none');
    box.classList.add('game-over');

    const message = didWin ? document.getElementById('congrats') : document.getElementById('try-again');
    message.style.display = 'block';
}

// Timer function for the game
function initTimer() {
    timeLeft--;
    timeTag.innerText = timeLeft;
    if (timeLeft <= 0) endGame(false);
}

// Flips the card and checks for match
function flipCardEvent(event) {
    let card = event.currentTarget;
    if (disableDeck || card === cardOne || card.classList.contains("flip") || card.classList.contains("matched")) return;
    
    flips++;
    flipsTag.innerText = flips;
    card.classList.add("flip");
    cardOne = cardOne || card;
    cardTwo = card === cardOne ? null : card;

    if (cardOne && cardTwo) {
        disableDeck = true;
        setTimeout(checkForMatch, 1000);
    }
}

// Checks if two flipped cards match
function checkForMatch() {
    let imgOne = cardOne.querySelector(".back-view img").src;
    let imgTwo = cardTwo.querySelector(".back-view img").src;
    if (imgOne === imgTwo) handleMatch();
    else handleNoMatch();
}

// Handles a successful match
function handleMatch() {
    matchedCard++;
    cardOne.classList.add("matched");
    cardTwo.classList.add("matched");
    if (matchedCard === cards.length / 2) endGame(true);
    resetTurn();
}

// Handles a failed match
function handleNoMatch() {
    cardOne.classList.remove("flip");
    cardTwo.classList.remove("flip");
    resetTurn();
}

// Resets the turn
function resetTurn() {
    [cardOne, cardTwo] = [null, null];
    disableDeck = false;
}

// Shuffles the cards
function shuffleCard() {
    let arr = Array.from({length: 20}, (_, i) => i % 10 + 1);
    arr.sort(() => Math.random() - 0.5);

    cards.forEach((card, index) => {
        let imgTag = card.querySelector(".back-view img");
        card.classList.remove("flip", "matched");
        imgTag.src = `assets/img/Star ${arr[index]}.png`;
    });
}

// Resets the game when the box is clicked
box.addEventListener('click', function(event) {
    if (!event.target.classList.contains('card') && document.querySelector('.message')) {
        resetGame();
    }
});

// Starts the game once the DOM is loaded
document.addEventListener('DOMContentLoaded', startGame);