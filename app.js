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
