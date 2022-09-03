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

var wordArr = ['Website', 'December', 'Cat', 'Lizard', 'Lemon', 'frog', 'END'];
var character = [head, leftArm, torso, rightArm, leftLeg, rightLeg, 'END'];

const addBodyPart = (part) => {
    part.classList.remove('hidden');
}

// this is the index of the array of words to guess, a new round will up-tick this
var wordArrIndex = 0;
var partIndex = 0;

// this will become the underline spaces that hide the letters in the word, it will 
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
                
                newArr.splice(i,1,guess.value)
                goalWord.textContent = newArr.join('')

            } else {
                
                // addBodyPart(character[0])
            }
        }

    } else {
        alert('Please enter a valid letter a-z');
    }

    guess.value = '';
    // need to downtick remaining guesses
})