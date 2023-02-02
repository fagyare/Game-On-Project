// Tap/Selecting the Id for initial reference 
// Catergories value for category buttons 
let categories = {
    teams: ['Lakers', 'Knicks', 'Nuggets', 'Pistons', 'Celtics', 'Heat', 'Nets', 'Bucks', 'Pacers', 'Magic'],
    countries: ['Ghana', 'Nigeria', 'Mozambique', 'Zimbabwe', 'Morocco', 'Eswatini', 'Somalia', 'Mali', 'Seychelles', 'Eritrea'],
   };
let hints = {
    teams: 'A team in the NBA',
    countries: 'A country in Africa'
};
// Set variable counts 
let winCount = 0;
let chosenWord = "";
let rightGuesses = [];
let wrongGuesses = [];
let userWon = false;
const LETTER_CLASS_NAME = '_letter';
const ALPHABET_CLASS_NAME = '_alphabet';
const MAX_GUESS = 5;
let totalGuessesAllowed = MAX_GUESS;
let resultsEl = null;
let contentLeftTop = null;
let contentLeftBottom = null;
let playerInputSection = null;
/**
 * 
 * 
const newGameContainer = document.querySelector('#new-game-container');
const GameResultText = document.querySelector('#game-result-text');
const canvas = document.querySelector('#canvas');
 */

// Actions/ functions for the two Category buttons 
const displayOptions = () => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML += `<h3>Categories</h3>`;
    let buttonCon = document.createElement('div');
    buttonCon.classList.add('categories-btn-wrap');
    for (let value in categories){
        buttonCon.innerHTML += `<button class='categories body-font' onclick="generateWord('${value}')">${value}</button>`;
    }
    categoryContainer.appendChild(buttonCon);
    generateAndDisplayAlphabets();
};

// generate all alphabets
const generateAndDisplayAlphabets = () => {
    const letterContainer = document.getElementById('letter-container');
    const alphabets = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
    ];
   
    for (let letter of alphabets) {
        const letterBtn = document.createElement('button');
        letterBtn.classList.add(ALPHABET_CLASS_NAME);
        letterBtn.textContent = letter;
        letterBtn.setAttribute('type', 'button');
        letterBtn.addEventListener('click', letterClicked);
        letterContainer.append(letterBtn);
    }
}

const generateWord = (selectCategory) => {
    rightGuesses = [];
    wrongGuesses = [];
    const words = categories[selectCategory];
    const hint = hints[selectCategory];
    console.log(hint)
    chosenWord = words[Math.floor(Math.random() * 9)].toLowerCase();
    rightGuesses = Array(chosenWord.length).fill('_');
    console.log(rightGuesses);
    playerInputSection = document.getElementById('player-input-section');
    playerInputSection.innerHTML = '';
    console.log(chosenWord);
    console.log(rightGuesses, wrongGuesses);
    document.getElementById('word-hint-container').innerHTML = hint;
    for(let ch of rightGuesses) {
        const letterEl = document.createElement('h4');
        letterEl.classList.add('_letter');
        letterEl.textContent = ch;
        playerInputSection.append(letterEl);
    }

}


/**
 * handles when a letter is clicked
 * @params e : click event
 */
const letterClicked = (e) => {
    e.target.classList.add('clicked');
    e.target.setAttribute('disabled', true);

    if (totalGuessesAllowed === 0) {
        return displayGameResults();
    }

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

        // START DRAWING HERE


    }

    if (rightGuesses.join('') === chosenWord) {
        userWon = true;
        return displayGameResults();
    }

}


const displayGameResults = () => {
    resultsEl = document.getElementById('game-result-text');
    resultsEl.innerHTML = `<div> You ${userWon ? 'won' : 'lost'} !!!</div>`;
    contentLeftTop = document.querySelector('._is-content.top');
    contentLeftBottom = document.querySelector('._is-content.bottom');
    contentLeftTop.classList.remove('show');
    contentLeftBottom.classList.add('show');
    document.getElementById('new-game-button').addEventListener('click', resetGame)
}

const resetGame = () => {
    totalGuessesAllowed = MAX_GUESS;
    contentLeftTop.classList.add('show');
    contentLeftBottom.classList.remove('show');
    playerInputSection.innerHTML = '';
    for (let x of document.getElementsByClassName(ALPHABET_CLASS_NAME)) {
            x.removeAttribute('disabled')
    }
}

//First function - this is called when the game is loaded/player presses New Game button
const initializer = () => displayOptions();

// New Game button Click Event Listener 
// newGameButton.addEventListener("click", initializer);
window.addEventListener('load', initializer);
//window.onload = initializer;

//document.addEventListener('DOMContentLoaded', initializer)

