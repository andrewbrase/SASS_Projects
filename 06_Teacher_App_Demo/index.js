"use strict";

const newStudentButton = document.getElementById('new-student-button');
const modal = document.getElementById('modal')
const closeModalButton = document.getElementById('close-modal-button');
const modalText = document.getElementById('modal-text')

const toggleModal = () => {

    modal.classList.toggle('hidden')

}

const addStudentRoster = () => {

    toggleModal()
    modalText.innerHTML = 
    `
    <h1>Add new Student</h1>
    <input id="firstname" type="text" placeholder="First Name" required>
    <input id="lastname" type="text" placeholder="Last Name" required>
    <input id="age" type="text" placeholder="Student age" required>
    <button id="submit-button">Submit</button>
    `

    let submitButton = document.getElementById('submit-button')
    submitButton.addEventListener('click', function submitHandler(){
        let newStudentFirstName = document.getElementById('firstname').value
        console.log(newStudentFirstName)
        toggleModal()
        
    })

}

newStudentButton.addEventListener('click', addStudentRoster);
closeModalButton.addEventListener('click', toggleModal)