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

const addBodyPart = (part) => {
    part.classList.remove('hidden');
}

// this is the index of the array of words to guess
var wordArrIndex = 0;

// this will become the underline spaces that hide the letters in the word, it will 
var spaces = '';

for (let i = 0; i < wordArr[wordArrIndex].length; i++) {
    spaces += '_'
}

goalWord.textContent = spaces

console.log(spaces)
console.log(wordArr[wordArrIndex]);


