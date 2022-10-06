"use strict";

const newStudentButton = document.getElementById('new-student-button');
const modal = document.getElementById('modal')
const closeModalButton = document.getElementById('close-modal-button');

const toggleModal = () => {
    modal.classList.toggle('hidden')
}

const addStudentRoster = () => {
    toggleModal()
}

newStudentButton.addEventListener('click', addStudentRoster);
closeModalButton.addEventListener('click', toggleModal)