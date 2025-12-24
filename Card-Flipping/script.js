const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cardDeck = [...cardValues, ...cardValues];
let flippedCards = [];
let lockBoard = false;
let matchedPairs = 0;

const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');
const pairsCountSpan = document.getElementById('pairs-count');

/**
 * Shuffles an array.
 * @param {Array} array - The array to shuffle.
 */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * Creates the HTML structure for a single card.
 * @param {string} value - The content/value of the card's front face.
 * @returns {HTMLElement} The card DOM element.
 */
function createCardElement(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-face card-front">${value}</div>
            <div class="card-face card-back">?</div>
        </div>
    `;
    return card;
}

/**
 * Initializes and starts the game.
 */
function initializeGame() {
    gameBoard.innerHTML = '';
    flippedCards = [];
    lockBoard = false;
    matchedPairs = 0;
    pairsCountSpan.textContent = 0;

    const shuffledDeck = shuffle(cardDeck.slice());

    shuffledDeck.forEach(value => {
        const card = createCardElement(value);
        gameBoard.appendChild(card);
    });
}

/**
 * Handles the card click event to flip it.
 */
function flipCard() {
    if (lockBoard) return;
    if (this.classList.contains('is-flipped')) return;

    this.classList.add('is-flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        lockBoard = true;
        checkForMatch();
    }
}

/**
 * Checks if the two currently flipped cards form a match.
 */
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.value === card2.dataset.value;

    if (isMatch) {
        disableCards(card1, card2);
    } else {
        unflipCards();
    }
}

/**
 * Disables the matched cards and updates the score.
 * @param {HTMLElement} card1 - The first matched card.
 * @param {HTMLElement} card2 - The second matched card.
 */
function disableCards(card1, card2) {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);

    card1.classList.add('is-matched');
    card2.classList.add('is-matched');

    resetBoard();
    
    matchedPairs++;
    pairsCountSpan.textContent = matchedPairs;

    if (matchedPairs === cardValues.length) {
        setTimeout(() => alert('Congratulations! You won the Memory Game!'), 500);
    }
}

/**
 * Flips the two currently flipped cards back over after a short delay.
 */
function unflipCards() {
    setTimeout(() => {
        flippedCards.forEach(card => card.classList.remove('is-flipped'));
        resetBoard();
    }, 1000);
}

/**
 * Resets the state for the next turn.
 */
function resetBoard() {
    [flippedCards, lockBoard] = [[], false];
}

restartButton.addEventListener('click', initializeGame);

initializeGame();