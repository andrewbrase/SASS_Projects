"use strict";

const newStudentButton = document.getElementById('new-student-button');
const view = document.getElementById('view');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal-button');
const modalText = document.getElementById('modal-text');
const unassignedStudents = document.getElementById('unassigned-students');
const firstClass = document.getElementById('first-class');
const newClassButton = document.getElementById('new-class-button');

// empty map will be used to hold all of the student key value pairs
const rosterMap = new Map();

// empty map to add new classrooms
const classMap = new Map();

// toggles the appearance of the modal
const toggleModal = () => {
    view.classList.toggle('overlay')
    modal.classList.toggle('hidden');
}

// updates the classRoster through a map object, assigns button to their tag as well
const updateRoster = (firstname, newlast, newage) => {
    rosterMap.set(firstname, {lastname : newlast, age :newage})
    console.log(rosterMap)

    let student = rosterMap.get(firstname)

    // add student to roster
    let studentTest = `<p id="P${firstname}">${firstname} ${student.lastname} age: ${student.age} <button id="B${firstname}">Assign -></button> <button>X</button></p>`
    unassignedStudents.insertAdjacentHTML('beforeend', studentTest);

    // adds a submit button event handler per student
    let newStudentAssignButton = document.getElementById(`B${firstname}`);
    newStudentAssignButton.addEventListener('click' , function test(){

    // 
    // !!! need to add a method to choose the class that the child will be entered into, will need to validate the guidelines as well per class
    // 

    if (classMap.size !== 0){

        toggleModal()

        // need to remove that student from unassigned students
        let removedStudent = document.getElementById(`P${firstname}`);
        removedStudent.remove()
        firstClass.insertAdjacentHTML('beforeend', studentTest);
    } else {
        alert('Please create a class to assign students to')
    }

    // need to edit the assign -> button to say <-unassign
    })
}

const newClassCreate = (teacher, classtype) => {
    classMap.set(teacher, classtype)

    // insert the new class tag before the create new classroom button
    firstClass.insertAdjacentHTML('beforebegin', `<p>${teacher}</p>`)
    console.log(classMap)
}

const newClassHandler = () => {
    toggleModal()
    modalText.innerHTML = 
    `
    <div>
    <h1>Create a new class</h1>
    <input id="teacher-name" type='text' placeholder='Teacher Name'>

    <label for="class-type">Class Type:</label>
    <select id="class-type" name="class-type">
    <option value="nursery">Nursery</value>
    <option value="toddlers">Toddlers</value>
    <option value="2s">2s</value>
    <option value="3s">3s</value>
    <option value="pre-school">Pre-School</value>

    </select>
    <button id="create-class-button">Create Class</button>

    </div>
    `

    let createClassButton = document.getElementById('create-class-button');
    createClassButton.addEventListener('click', function createClassHandler(){

        let teacherName = document.getElementById('teacher-name').value;
        let classType = document.getElementById('class-type').value;
        
        if (teacherName !== ''){
            newClassCreate(teacherName,classType)
            toggleModal()
        }

    })
}

const addStudentRoster = () => {
    toggleModal()
    modalText.innerHTML = 
    `
    <h1>Add new Student</h1>
    <input id="firstname" type="text" placeholder="First Name">
    <input id="lastname" type="text" placeholder="Last Name">
    <input id="age" type="text" placeholder="Student age">
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
            
        } else {
            alert('Please fill in every field');
        }
    })
}

newStudentButton.addEventListener('click', addStudentRoster);
closeModalButton.addEventListener('click', toggleModal);
newClassButton.addEventListener('click', newClassHandler)