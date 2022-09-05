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
var wordArr = ['Website', 'December', 'Cat', 'Lizard', 'Lemon', 'frog'];
var character = [head, leftArm, torso, rightArm, leftLeg, rightLeg];

usedLetters.textContent = '';

const addBodyPart = (part) => {
    part.classList.remove('hidden');
    bodyIndex++
}

const reHideBody = () => {
    for (let i = 0; i < character.length; i++){
        character[i].classList.add('hidden');
    }
}

// this is the index of the array of words to guess, a new round will up-tick this
var wordArrIndex = 0;
var bodyIndex = 0;

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

var newArr = goalWord.textContent.split('')

submit.addEventListener('click', function () {

    if (guess.value !== '') {

        for (let i = 0; i < wordArr[wordArrIndex].length; i++) {
            
            if (wordArr[wordArrIndex][i].toUpperCase() === guess.value.toUpperCase()) {

                newArr.splice(i,1,guess.value.toLowerCase())
                goalWord.textContent = newArr.join('')
            }
        }

        if (goalWord.textContent.includes(guess.value) == false) {
            addBodyPart(character[bodyIndex])
        }

        usedLetters.textContent = usedLetters.textContent + ' ' + guess.value
        remainGuesses.textContent = String(parseInt(remainGuesses.textContent) - 1)

    } else {
        alert('Please enter a valid letter a-z');
    }

    guess.value = '';
    // need to downtick remaining guesses
    if (!goalWord.textContent.includes('_')) {
        setTimeout(() => {
            alert('You win!')
          }, 1000)
    } else if (remainGuesses.textContent === '0') {
        setTimeout(() => {
            alert('You Lose!')
        }, 1000)
    }

})

newGameButton.addEventListener('click' , function () {
    remainGuesses.textContent = '6'
    usedLetters.textContent = ''
    wordArrIndex ++
    goalWord.textContent = wordArr[wordArrIndex]
    createSpaces(wordArr,wordArrIndex)
    newArr = goalWord.textContent.split('')
    reHideBody()
    bodyIndex = 0;
})