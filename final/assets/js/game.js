// Selecting DOM elements
const cards = document.querySelectorAll(".card");
const timeTag = document.querySelector(".time b");
const flipsTag = document.querySelector(".flips b");

// Game variables
let maxTime = 60; // Updated timer to 60 seconds
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let timer;
let cardOne, cardTwo;
let disableDeck = false;

// Functions
function startGame() {
    if(timer) clearInterval(timer);
    timeLeft = maxTime; // Reset time to max time at the start
    timeTag.innerText = timeLeft; // Update time display
    flips = 0; // Reset flips
    matchedCard = 0; // Reset matched card count
    cardOne = null;
    cardTwo = null;
    disableDeck = false; // Enable card flipping
    flipsTag.innerText = flips; // Update flips display
    shuffleCard(); // Shuffle cards at the start
    cards.forEach(card => card.classList.remove("flip", "matched")); // Reset all cards
    timer = setInterval(initTimer, 1000); // Start the timer
}

function initTimer() {
    timeLeft--;
    timeTag.innerText = timeLeft;
    if(timeLeft <= 0) {
        clearInterval(timer);
        disableDeck = true; // Disable all card flips after time is over
        cards.forEach(card => card.removeEventListener("click", flipCard));
    }
}

function flipCard(event) {
    let card = event.currentTarget;
    if(disableDeck || card === cardOne || card.classList.contains("flip") || card.classList.contains("matched")) {
        return;
    }
    flips++;
    flipsTag.innerText = flips;
    card.classList.add("flip");

    if(!cardOne) {
        cardOne = card;
    } else {
        cardTwo = card;
        disableDeck = true;
        setTimeout(checkForMatch, 1000); // Check for a match after 1 second
    }
}

function checkForMatch() {
    let imgOne = cardOne.querySelector(".back-view img").src;
    let imgTwo = cardTwo.querySelector(".back-view img").src;
    if(imgOne === imgTwo) {
        matchedCard++;
        cardOne.classList.add("matched");
        cardTwo.classList.add("matched");
        if(matchedCard === cards.length / 2) {
            clearInterval(timer); // Stop the timer if all pairs are matched
        }
        resetTurn();
    } else {
        cardOne.classList.remove("flip");
        cardTwo.classList.remove("flip");
        resetTurn();
    }
}

function resetTurn() {
    cardOne = null;
    cardTwo = null;
    disableDeck = false;
}

function shuffleCard() {
    let arr = Array.from({length: 20}, (_, i) => i % 10 + 1); // Pairs from 1 to 10
    arr.sort(() => Math.random() - 0.5); // Shuffle array

    cards.forEach((card, index) => {
        let imgTag = card.querySelector(".back-view img");
        card.classList.remove("flip", "matched"); // Remove classes for reset
        imgTag.src = `assets/img/Star ${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}

// Event listeners
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

// Init game
document.addEventListener('DOMContentLoaded', startGame);
