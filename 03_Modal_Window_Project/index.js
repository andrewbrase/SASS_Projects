'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const buttonCloseModel = document.querySelector('.close-modal');
const buttonsOpenModel = document.querySelectorAll('.main__modal-button');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < buttonsOpenModel.length; i++) {
    buttonsOpenModel[i].addEventListener('click', openModal) }

buttonCloseModel.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
