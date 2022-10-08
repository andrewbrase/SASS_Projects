"use strict";

/*
Bugs

- if two students have the same first name and then you try to add them to a classroom, they disapear
- Unassign student needs to be set back into unassigned secition from classrooms if they are <- unassigned

*/

const newStudentButton = document.getElementById('new-student-button');
const view = document.getElementById('view');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal-button');
const modalText = document.getElementById('modal-text');
const unassignedStudents = document.getElementById('unassigned-students');
const firstClass = document.getElementById('first-class');
const newClassButton = document.getElementById('new-class-button');

// this ratio is used for different classroom setups, it defines the max number of kids in that class following legal guidelines 
const maxdcfsRatio = {Nursery: 8, Toddlers: 10, Twos: 8, Threes: 10, PreSchool: 12};

// empty map will be used to hold all of the student key value pairs
const rosterMap = new Map();

// empty map to add new classrooms
const classMap = new Map();

// toggles the appearance of the modal
const toggleModal = () => {
    view.classList.toggle('overlay');
    modal.classList.toggle('hidden');
}

// updates the classRoster through a map object, assigns button to their tag as well
const updateRoster = (firstname, newlast, newage) => {
    rosterMap.set(firstname, {lastname : newlast, age :newage});

    let student = rosterMap.get(firstname);

    // add student to roster
    let studentTest = `<p id="P${firstname}">${firstname} ${student.lastname} age: ${student.age} <button id="B${firstname}">Assign -></button> <button id="${firstname}student-delete-button">X</button></p>`
    unassignedStudents.insertAdjacentHTML('beforeend', studentTest);

    // student remove button
    let studentDeleteButton = document.getElementById(`${firstname}student-delete-button`);
    let thisStudentTag = document.getElementById(`P${firstname}`);
    studentDeleteButton.addEventListener('click', function studentDeleteHandler(){
        thisStudentTag.remove();
    })

    // adds a submit button event handler per student
    let newStudentAssignButton = document.getElementById(`B${firstname}`);
    newStudentAssignButton.addEventListener('click' , function test(){

    if (classMap.size !== 0){

        toggleModal();
        modalText.innerHTML = 
        `
        <div>
        <h1>Choose class to assign student to</h1>
        </div>
        `
        
        // do a for each method on every teacher class and add it to the modal
        classMap.forEach((value, key) => {
            
            let classroom = 
            `
            <div class="teacher-option">
            <h2>${key} (${value.class})<button id="${key}-option">Assign</button></h2>
            </div>
            `
            modalText.insertAdjacentHTML('beforeend',classroom);
            
            let teacherOption = document.getElementById(`${key}-option`);
            teacherOption.addEventListener('click' , function teacherOptionHandler(){
                
                //creating a student object and adding it to the classroom roster map object
                class assignedStudent {
                    constructor(name,last,age) {
                        this.firstname = name;
                        this.lastname = last;
                        this.age = age;
                    }
                }

                let studentAddToClass = new assignedStudent(firstname,newlast,newage);

                let teacherEntry = (classMap.get(`${key}`));
                teacherEntry.classroomRoster = teacherEntry.classroomRoster.set(firstname , studentAddToClass);

                let teacherSection = document.getElementById(`new-class${key}`);

                let studentTag = 
                `
                <p id="P${firstname}">${firstname} ${newlast} age: ${newage} <button id="B${firstname}"><- Unassign</button> <button id="exit-button">X</button></p>
                `

                // need to remove that student from unassigned students
                let removedStudent = document.getElementById(`P${firstname}`);
                removedStudent.remove();

                teacherSection.insertAdjacentHTML('beforeend', studentTag);
                let numberOfStudents = document.getElementById(`${key}-classroom-size`);
                numberOfStudents.textContent = parseInt(numberOfStudents.textContent) + 1;
                teacherEntry.currentSize = parseInt(numberOfStudents.textContent);

                toggleModal();

                if (teacherEntry.currentSize > teacherEntry.maxSize){

                    let teacherClassSize = document.getElementById(`${key}-classroom-back`);
                    teacherClassSize.classList.add('max-size');
                    alert(`WARNING: \nClassroom max size has been reached for ${key}'s Classroom`);

                }
            })
        })


    } else {
        alert('Please create a class to assign students to');
    }

    })
}

const newClassCreate = (teacher, classtype) => {

    classMap.set(teacher, classtype);
    console.log(classMap);

    // insert the new class tag before the create new classroom button
    firstClass.insertAdjacentHTML('beforebegin', 

    `
    <section class="new-class" id="new-class${teacher}">
    <h2>${teacher}'s Classroom (${classtype.class})</h2>
    <h3 id="${teacher}-classroom-back"><span id="${teacher}-classroom-size">${classtype.currentSize}</span>/${classtype.maxSize} Students</h3>
    </section>
    `
    )
    
}

const newClassHandler = () => {
    toggleModal();
    modalText.innerHTML = 
    `
    <div>
    <h1>Create a new class</h1>
    <input id="teacher-name" type='text' placeholder='Teacher Name'>

    <label for="class-type">Class Type:</label>
    <select id="class-type" name="class-type">
    <option value="Nursery">Nursery</value>
    <option value="Toddlers">Toddlers</value>
    <option value="Twos">Twos</value>
    <option value="Threes">Threes</value>
    <option value="PreSchool">Pre-School</value>

    </select>
    <button id="create-class-button">Create Class</button>

    </div>
    `

    let createClassButton = document.getElementById('create-class-button');
    createClassButton.addEventListener('click', function createClassHandler(){

        let teacherName = document.getElementById('teacher-name').value;
        let classType = document.getElementById('class-type').value;
        
        if (teacherName !== ''){
            
            newClassCreate(teacherName,{class : classType, classroomRoster : new Map(), currentSize : 0, maxSize:maxdcfsRatio[classType]});
            toggleModal();

        } else {

            alert('Please fill in every field');

        }

    })
}

const addStudentRoster = () => {
    toggleModal();
    modalText.innerHTML = 
    `
    <h1>Add new Student</h1>
    <input id="firstname" type="text" placeholder="First Name">
    <input id="lastname" type="text" placeholder="Last Name">
    <input id="age" type="text" placeholder="Student age">
    <button id="submit-button">Submit</button>
    `

    let submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', function submitHandler(){
        
        let newStudentFirstName = document.getElementById('firstname').value;
        let newStudentLastName = document.getElementById('lastname').value;
        let newStudentAge = document.getElementById('age').value;

        if (newStudentFirstName !== '' && newStudentLastName !== '' && newStudentAge !== ''){

            toggleModal();
            updateRoster(newStudentFirstName, newStudentLastName, newStudentAge);
            
        } else {
            alert('Please fill in every field');
        }
    })
}

newStudentButton.addEventListener('click', addStudentRoster);
closeModalButton.addEventListener('click', toggleModal);
newClassButton.addEventListener('click', newClassHandler);