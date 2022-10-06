"use strict";

const newStudentButton = document.getElementById('new-student-button');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal-button');
const modalText = document.getElementById('modal-text');
const unassignedStudents = document.getElementById('unassigned-students');
const firstClass = document.getElementById('first-class');
const classMap = new Map();

// toggles the appearance of the modal
const toggleModal = () => {

    modal.classList.toggle('hidden');

}

// updates the classRoster through a map object
const updateRoster = (firstname, newlast, newage) => {
    classMap.set(firstname, {lastname : newlast, age :newage})
    console.log(classMap)
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

            toggleModal();
            updateRoster(newStudentFirstName, newStudentLastName, newStudentAge);
            // add student to roster
            let studentTest = `<p id="P${newStudentFirstName}">${newStudentFirstName} ${newStudentLastName} age: ${newStudentAge} <button id="B${newStudentFirstName}">Assign -></button></p>`
            unassignedStudents.insertAdjacentHTML('beforeend', studentTest);

            // adds a submit button event handler per student
            let newStudentAssignButton = document.getElementById(`B${newStudentFirstName}`);

            newStudentAssignButton.addEventListener('click' , function test(){
            // need to remove that student from unassigned students
            let removedStudent = document.getElementById(`P${newStudentFirstName}`);
            removedStudent.remove()

            firstClass.insertAdjacentHTML('beforeend', studentTest);
            // need to edit the assign -> button to say <-unassign
            })

        } else {
            alert('Please fill in every field');
        }
        
    })

}

newStudentButton.addEventListener('click', addStudentRoster);
closeModalButton.addEventListener('click', toggleModal)