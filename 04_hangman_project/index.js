"use strict";

const newGameButton = document.querySelector('#newgame');
const goalWord = document.querySelector('#goal-word');
const head = document.querySelector('#head');
const leftArm = document.querySelector('#leftarm');
const torso = document.querySelector('#maintorso');
const rightArm = document.querySelector('#rightarm');
const leftLeg = document.querySelector('#leftleg');
const rightLeg = document.querySelector('#rightleg');
const guess = document.querySelector('#guess');
const submit = document.querySelector('#submit');
const usedLetters = document.querySelector('#wrong');
const remainGuesses = document.querySelector('#guessesnum');

// make JSON obj that includes hints too?
var wordArr = ['Website', 'December', 'Cat', 'Lizard', 'Lemon', 'frog', 'END'];
var character = [head, leftArm, torso, rightArm, leftLeg, rightLeg, 'END'];

usedLetters.textContent = '';

const addBodyPart = (part) => {
    part.classList.remove('hidden');
}

// this is the index of the array of words to guess, a new round will up-tick this
var wordArrIndex = 0;

// this will become the underline spaces that hide the letters in the word, it will 
// create function?? for newgame and initialize

const createSpaces = (array, word) => {
    let spaces = '';
    for (let i = 0; i < array[word].length; i++) {
        spaces += '_'
    }
    goalWord.textContent = spaces;
}

var spaces = '';

for (let i = 0; i < wordArr[wordArrIndex].length; i++) {
    spaces += '_'
}

goalWord.textContent = spaces;

//

var newArr = goalWord.textContent.split('')

submit.addEventListener('click', function () {

    if (guess.value !== '') {

        for (let i = 0; i < wordArr[wordArrIndex].length; i++) {
            
            if (wordArr[wordArrIndex][i].toUpperCase() === guess.value.toUpperCase()) {
                // console.log(`${guess.value} at index ${[i]}`);
                
                newArr.splice(i,1,guess.value.toLowerCase())
                goalWord.textContent = newArr.join('')

            } else {
                // will do 6 times
                // addBodyPart(character[0]) ???
            }
        }

        usedLetters.textContent = usedLetters.textContent + ' ' + guess.value
        remainGuesses.textContent = String(parseInt(remainGuesses.textContent) - 1)

    } else {
        alert('Please enter a valid letter a-z');
    }

    guess.value = '';
    // need to downtick remaining guesses
    if (!goalWord.textContent.includes('_')) {
        alert('You win!')
    } else if (remainGuesses.textContent === '0') {
        alert('You Lose!')
    }

})

// need to fix new game
newGameButton.addEventListener('click' , function () {
    remainGuesses.textContent = '20'
    usedLetters.textContent = ''
    wordArrIndex ++
    createSpaces(wordArr,wordArrIndex)
})