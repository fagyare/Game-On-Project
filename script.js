// Set +Catergories value for category buttons 
let categories = {
    teams: ['Lakers', 'Knicks', 'Nuggets', 'Pistons', 'Celtics', 'Heat', 'Nets', 'Bucks', 'Pacers', 'Magic'],
    countries: ['Ghana', 'Nigeria', 'Mozambique', 'Zimbabwe', 'Morocco', 'Eswatini', 'Somalia', 'Mali', 'Seychelles', 'Eritrea'],
};
let hints = {
    teams: 'A team in the NBA',
    countries: 'A country in Africa'
};
// Set variables 
let winCount = 0;
let chosenWord = "";
let rightGuesses = [];
let wrongGuesses = [];
let userWon = false;
const LETTER_CLASS_NAME = '_letter';
const ALPHABET_CLASS_NAME = '_alphabet';
const MAX_GUESS = 7;
let totalGuessesAllowed = MAX_GUESS;
let resultsEl = null;
let contentLeftTop = null;
let contentLeftBottom = null;
let playerInputSection = null;
let livesContainer = null;
let hintContainer = null;
let manHanging = null;
let isNewGame = false;
let isCategorySelected = false;
/**
 * 
 * 
const newGameContainer = document.querySelector('#new-game-container');
const GameResultText = document.querySelector('#game-result-text');
const canvas = document.querySelector('#canvas');
 */

// Actions/ functions for the two Category buttons 
const displayCategories = () => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML += `<h3>Categories</h3>`;
    let buttonCon = document.createElement('div');
    buttonCon.classList.add('categories-btn-wrap');
    for (let value in categories) {
        buttonCon.innerHTML += `<button class='categories body-font' onclick="generateWord('${value}')">${value}</button>`;
    }
    categoryContainer.appendChild(buttonCon); 
    generateAndDisplayAlphabets(); 
};

// generate & display all alphabets using generateAndDisplayAplphabets arrow fucntion 
const generateAndDisplayAlphabets = () => {
    const letterContainer = document.getElementById('letter-container');
    const alphabets = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    for (let letter of alphabets) {
        const letterBtn = document.createElement('button');
        letterBtn.classList.add(ALPHABET_CLASS_NAME, 'body-font');
        letterBtn.textContent = letter;
        letterBtn.setAttribute('type', 'button');
        letterBtn.addEventListener('click', letterClicked);
        letterContainer.append(letterBtn);
    }
}

const generateWord = (selectCategory) => {
    isPlaying = false;
    const words = categories[selectCategory]; 
    const hint = hints[selectCategory];
    chosenWord = words[Math.floor(Math.random() * 9)].toLowerCase();
    playerInputSection = document.getElementById('player-input-section');
    hintContainer = document.getElementById('word-hint-container');

    resetGame();
    addSpaces();

    isCategorySelected = true;
    hintContainer.innerHTML = hint;
}
// Spaces for chosen words 
const addSpaces = () => {
    rightGuesses = Array(chosenWord.length).fill('_');
    playerInputSection.innerHTML = '';
    for (let ch of rightGuesses) {
        const letterEl = document.createElement('h4');
        letterEl.classList.add('_letter', 'main-font');
        letterEl.textContent = ch;
        playerInputSection.append(letterEl);
    }
}

/**
 * handles when a letter is clicked
 * @params e : click event
 */
const letterClicked = (e) => {
    if (!isCategorySelected) return;

    isPlaying = true;
    e.target.classList.add('clicked');
    e.target.setAttribute('disabled', true);
    const letter = e.target.textContent;
    const wordArr = chosenWord.split('');
    const exists = wordArr.find(l => l === letter);

    if (exists) {
        wordArr.forEach((e, i) => {
            if (e === letter) {
                const spaces = document.getElementsByClassName('_letter');
                spaces[i].innerHTML = letter;
                rightGuesses[i] = letter;
            }
        });
    } else {
        wrongGuesses.push(letter);
        totalGuessesAllowed--;

        updateLives();
        // START DRAWING HERE
        drawMan();
    }

    if (rightGuesses.join('') === chosenWord) {
        userWon = true;
        return displayGameResults();
    }

    if (totalGuessesAllowed === 0) {
        userWon = false;
        return displayGameResults();
    }

}

// Display game result function - "You WIN" or "You Lost"
const displayGameResults = () => {
    resultsEl = document.getElementById('game-result-text');
    resultsEl.style.color = 'orange'
    resultsEl.innerHTML = `<div> You ${userWon ? 'won' : 'lost'} !!!</div>`;
    contentLeftTop.classList.remove('show');
    contentLeftBottom.classList.add('show');
    document.getElementById('new-game-button').addEventListener('click', resetGame)
}

/**
 * resets game so user can play afresh
 */
const resetGame = () => {
    rightGuesses = [];
    wrongGuesses = [];
    isPlaying = false;
    isCategorySelected = false;
    totalGuessesAllowed = MAX_GUESS;
    contentLeftTop = document.querySelector('._is-content.top');
    contentLeftBottom = document.querySelector('._is-content.bottom');
    contentLeftTop.classList.add('show');
    contentLeftBottom.classList.remove('show');
    playerInputSection.innerHTML = '';
    for (let x of document.getElementsByClassName(ALPHABET_CLASS_NAME)) {
        x.removeAttribute('disabled');
        x.classList.remove('clicked');
    }
    livesContainer = document.getElementById('lives-wrap');
    livesContainer.innerHTML = '';
    hintContainer.innerHTML = '';

    if (manHanging) manHanging.setAttribute('src', `images/${totalGuessesAllowed}-hangman.png`);

    displayLivesRemaining();
    updateLives();

}
// add players/users lives to the dom 
const displayLivesRemaining = () => {
    for (let i = 1; i <= totalGuessesAllowed; i++) {
        const liveEl = document.createElement('span');
        liveEl.classList.add('live', 'loaded');
        livesContainer.append(liveEl);
    }
}
// update user lives : tracked by class "loaded" 
const updateLives = () => {
    if (isPlaying) {
        livesContainer.children[totalGuessesAllowed].classList.remove('loaded');


        // fill up the lives when category is reset. reload live
    } else {
        const livesUsed = livesContainer.children;
        for (let x of livesUsed) {
            if (!x.classList.contains('loaded')) x.classList.add('loaded');
        }
    }
}
// total guess allowed corresponds to the images
// this is called when user guesses wrong 
const drawMan = () => {
    if (totalGuessesAllowed === 0) return;
    manHanging = document.getElementsByClassName('man-hanging')[0];
    manHanging.setAttribute('src', `images/${totalGuessesAllowed}-hangman.png`);
}

//First function - this is called when the game is loaded/player presses New Game button
const initializer = () => displayCategories();

// New Game button Click Event Listener 
// newGameButton.addEventListener("click", initializer);
window.addEventListener('load', initializer);
//window.onload = initializer;

//document.addEventListener('DOMContentLoaded', initializer)

// Canvas Drawing 