"use strict";

const newStudentButton = document.getElementById('new-student-button');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal-button');
const modalText = document.getElementById('modal-text');
const unassignedStudents = document.getElementById('unassigned-students');
const classMap = new Map();

const toggleModal = () => {

    modal.classList.toggle('hidden');

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
        let newStudentLastName = document.getElementById('lastname').value
        let newStudentAge = document.getElementById('age').value

        if (newStudentFirstName !== '' && newStudentLastName !== '' && newStudentAge !== ''){

            // these are the values that were assigned from the input fields
            // console.log(`new student ${newStudentFirstName} , ${newStudentLastName} age: ${newStudentAge} will be added to roster`)
            toggleModal()

            // add student to the map? will use this feature later
            // classMap.set('newStudentFirstName', {lastname : newStudentLastName, age :newStudentAge})
            // console.log(classMap.get('newStudentFirstName'))

            // add student to roster
            let studentTest = `<p id="P${newStudentFirstName}">${newStudentFirstName} ${newStudentLastName} age: ${newStudentAge} <button id="B${newStudentFirstName}">Assign -></button></p>`
            unassignedStudents.insertAdjacentHTML('beforeend', studentTest);

            // adds a submit button event handler per student
            let newStudentAssignButton = document.getElementById(`B${newStudentFirstName}`);
            newStudentAssignButton.addEventListener('click' , function test(){
                console.log('test')
            })

        } else {
            alert('Please fill in every field');
        }
        
    })

}

newStudentButton.addEventListener('click', addStudentRoster);
closeModalButton.addEventListener('click', toggleModal)