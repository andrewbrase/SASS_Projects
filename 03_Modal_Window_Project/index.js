'use strict';

// assigning variables by their classes using DOM
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const buttonCloseModel = document.querySelector('.close-modal');
const buttonsOpenModel = document.querySelectorAll('.main__modal-button');

// function to remove the hidden class - this displays the modal
const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

// function to add the hidden class - this hides the modal 
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

// giving the three buttons event listeners on click to use the openModal function 
for (let i = 0; i < buttonsOpenModel.length; i++) {
    buttonsOpenModel[i].addEventListener('click', openModal);
}

// giving a way to exit out of the modal by using the closeModal
//  function on the X button and also if you click outside of the modal window
buttonCloseModel.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// keyboard events are global events- they do not happen on a single element
// document is a big object with a bunch of methods
// keydown, keypress or keyup
// keypress is fired continuously as you keep your finger down
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        if (!modal.classList.contains('hidden')) {
            closeModal();
        };
    };
});