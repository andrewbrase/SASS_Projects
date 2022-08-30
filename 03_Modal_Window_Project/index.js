'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const buttonCloseModel = document.querySelector('.close-modal');
const buttonsOpenModel = document.querySelectorAll('.main__modal-button');

for (let i = 0; i < buttonsOpenModel.length; i++) {
    buttonsOpenModel[i].addEventListener('click', function () {
        modal.classList.remove('hidden');
    });
}