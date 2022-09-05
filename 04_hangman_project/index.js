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
const hintword = document.querySelector('#hint');

// this array will be the words that the user will be trying to guess
var wordArr = ['Website', 'December', 'Cat', 'Lizard', 'Lemon', 'frog'];

// this array will hold the hints to each of the guess words
var hintlist = ['You could visit one of these on the web', 'Usually a very cold month', "A dog's foe", "One of Andrew's favorite Animals", 'Freshly squeezed', 'Enjoys hopping'];

// this array includes all of the body parts of the stick man
var character = [head, leftArm, torso, rightArm, leftLeg, rightLeg];

// this is the used letters area, if a letter is guessed - it will be added to this area
usedLetters.textContent = '';

// this function will remove the hidden class from the body part and it will be used if the player guesses a wrong letter
const addBodyPart = (part) => {
    part.classList.remove('hidden');
    bodyIndex++
}

// this will hide the stick man by adding the hidden class to each body part
const reHideBody = () => {
    for (let i = 0; i < character.length; i++){
        character[i].classList.add('hidden');
    }
}

// this function can be used to reset the game
const newGame = () => {
    if (wordArrIndex !== 5) {
        remainGuesses.textContent = '6'
        usedLetters.textContent = ''
        wordArrIndex ++
        goalWord.textContent = wordArr[wordArrIndex]
        createSpaces(wordArr,wordArrIndex)
        newArr = goalWord.textContent.split('')
        reHideBody()
        bodyIndex = 0;
    } else {
        alert('Thanks for playing! You have reached the end of the game')
    }
}

// this can be used to promt the user if they'd like to play again
const playagain = () => {
    let again = prompt('Play again? Yes (y) or No (n)');
    if (again.toUpperCase() === 'Y') {
        newGame()
    }
}

// this is the index of the array of words to guess, a new round will up-tick this
var wordArrIndex = 0;

// this is the index of the stick figure part to reveal if an incorrect guess
var bodyIndex = 0;

// this function will create _ spaces for each letter of the guess word
const createSpaces = (array, word) => {
    let spaces = '';
    for (let i = 0; i < array[word].length; i++) {
        spaces += '_'
    }
    goalWord.textContent = spaces;
}

// initial spaces are created, the function above can be called again
var spaces = '';
for (let i = 0; i < wordArr[wordArrIndex].length; i++) {
    spaces += '_'
}

// hiding the goal word with the _ spaces
goalWord.textContent = spaces;

// split of goal word
var newArr = goalWord.textContent.split('')

// this event listener will listen for the player guess
submit.addEventListener('click', function () {

    // check to see if the input is a number
    var matches = guess.value.match(/\d+/g);
    if (guess.value !== '' && matches === null) {

        // this will search every letter of the guess word for the player guess
        for (let i = 0; i < wordArr[wordArrIndex].length; i++) {
            
            if (wordArr[wordArrIndex][i].toUpperCase() === guess.value.toUpperCase()) {

                newArr.splice(i,1,guess.value.toLowerCase())
                goalWord.textContent = newArr.join('')
            }
        }

        // if the player guess is not in the goal word - a stick figure part will be added and the remaining guesses will be lowered
        if (goalWord.textContent.includes(guess.value) == false) {
            addBodyPart(character[bodyIndex])
            remainGuesses.textContent = String(parseInt(remainGuesses.textContent) - 1)
        }

        // adding the player guess to the guessed letters field
        usedLetters.textContent = usedLetters.textContent + ' ' + guess.value

        // if the submit button was pressed without a guess
    } else {
        alert('Please enter a valid letter a-z');
    }

    // resetting the guess value so that a new guess can be entered
    guess.value = '';
    
    // checks for victory condition - also if the player has lost the game
    if (!goalWord.textContent.includes('_')) {
        setTimeout(() => {
            alert('You win!')
            playagain()
          }, 1000)
    } else if (remainGuesses.textContent === '0') {
        setTimeout(() => {
            alert('You Lose!')
            playagain()
        }, 1000)
    }

})

// will alert the player of the guess for the word
hintword.addEventListener('click' , function () {
    alert(hintlist[wordArrIndex])
})

// this will reset the game with a new word and reset the score
newGameButton.addEventListener('click' , function () {
    newGame()
})