const fruits = [
    { name: "apple", symbol: "🍎" },
    { name: "banana", symbol: "🍌" },
    { name: "cherry", symbol: "🍒" },
    { name: "coconut", symbol: "🥥" },
    { name: "grapes", symbol: "🍇" },
    { name: "mango", symbol: "🥭" },
    { name: "pineapple", symbol: "🍍" },
    { name: "watermelon", symbol: "🍉" }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const deck = shuffle([...fruits, ...fruits]);
const board = document.querySelector("#board");
const movesDisplay = document.querySelector("#moves");
const status = document.querySelector("#status");
const flippedCards = [];
let moves = 0;
let waiting = false;

function buildBoard() {
    for (let i = 0; i < deck.length; i++) {
        const card = document.createElement("button");
        card.type = "button";
        card.classList.add("card");
        card.dataset.index = i;
        card.setAttribute("aria-label", "Card " + (i + 1) + ", face down");
        board.appendChild(card);
    }
}

buildBoard();

function turnBack() {
    for (let i = 0; i < flippedCards.length; i++) {
        const card = flippedCards[i];
        card.textContent = "";
        card.classList.remove("flipped");
        card.setAttribute("aria-label", "Card " + (Number(card.dataset.index) + 1) + ", face down");
    }

    flippedCards.length = 0;
    waiting = false;
}

board.addEventListener("click", function (event) {
    const card = event.target;

    if (waiting) {
        return;
    }

    if (!card.classList.contains("card")) {
        return;
    }

    if (card.classList.contains("flipped")) {
        return;
    }

    const fruit = deck[card.dataset.index];
    card.textContent = fruit.symbol;
    card.classList.add("flipped");
    card.setAttribute("aria-label", "Card " + (Number(card.dataset.index) + 1) + ", " + fruit.name);
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;

        const firstFruit = deck[flippedCards[0].dataset.index];
        const secondFruit = deck[flippedCards[1].dataset.index];

        if (firstFruit.name === secondFruit.name) {
            flippedCards[0].classList.add("matched");
            flippedCards[1].classList.add("matched");
            flippedCards[0].disabled = true;
            flippedCards[1].disabled = true;
            status.textContent = "That's a pair!";
            flippedCards.length = 0;
        } else {
            status.textContent = "Not a pair. Try again.";
            waiting = true;
            setTimeout(turnBack, 1000);
        }
    }
});
