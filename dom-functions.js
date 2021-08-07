import {
  renderSortingHatCard,
  voldemortDomStringTemplate,
  studentDomStringTemplate,
  renderStudentForm,
} from "./dom-strings.js";

import { arrayOfStudents, houseArray } from "./data.js";

import { renderToDom } from "./render-to-dom.js";

const filterHouse = () => {
  const selectedHouse = document.getElementById("filterDropdown").value;
  if (selectedHouse === "All") {
    renderStudents(arrayOfStudents);
  } else {
    const filteredHouseArray = arrayOfStudents.filter(
      (student) =>
        student.house === selectedHouse || student.house === "Expelled!"
    );
    renderStudents(filteredHouseArray);
  }
};

const resetForm = () => {
  document.getElementById("studentForm").reset();
};

const renderStudents = (arr) => {
  document.getElementById("goodStudents").style.visibility = "visible";
  document.getElementById("badStudents").style.visibility = "visible";
  document.getElementById("firstYearTitle").style.visibility = "visible";
  document.getElementById("voldemortTitle").style.visibility = "visible";
  let studentDomString = "";
  let voldemortDomString = "";

  arr.forEach((student, index) => {
    if (student.house === "Expelled!") {
      document.getElementById("badStudents").innerHTML = "";
      voldemortDomString += voldemortDomStringTemplate(student, index);
    } else {
      document.getElementById("goodStudents").innerHTML = "";
      studentDomString += studentDomStringTemplate(student, index);
    }
  });
  renderToDom("#goodStudents", studentDomString);
  renderToDom("#badStudents", voldemortDomString);
};

const expelStudent = (index) => {
  arrayOfStudents[index].house = "Expelled!";
  filterHouse();
};

const updateCancelButton = (index) => {
  document.getElementById("updateDiv").innerHTML = "";
};

const pushStudentUpdate = (index) => {
  arrayOfStudents[index].name = document.getElementById(
    `updateName-${index}`
  ).value;
  arrayOfStudents[index].house = document.getElementById(
    `houseDropdown-${index}`
  ).value;
  arrayOfStudents.sort((a, b) => (a.house > b.house ? 1 : -1));
  filterHouse();
  document.getElementById("updateDiv").innerHTML = "";
};

const randomHouse = () => {
  return houseArray[Math.floor(Math.random() * (houseArray.length - 1))];
};

const addStudent = (student) => {
  arrayOfStudents.push({
    name: student,
    house: randomHouse(),
  });
  arrayOfStudents.sort((a, b) => (a.house > b.house ? 1 : -1));
  filterHouse();
};

const deleteStudent = (eventId) => {
  if (eventId.startsWith("delete")) {
    const deletedStudent = eventId.split("-");
    arrayOfStudents.splice(deletedStudent[1], 1);
  }
  filterHouse();
};

const deletebtnListener = () => {
  document
    .getElementById("studentContainer")
    .addEventListener("click", (event) => deleteStudent(event.target.id));
};

const enterBtnListener = (btnId, inputId) => {
  document.getElementById(inputId).addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      document.getElementById(btnId).click();
    }
  });
};

const handleSubmit = () => {
  const errorMessage = document.getElementById("errorMessage");
  const studentForm = document.getElementById("inlineFormInputName2");
  if (studentForm.value) {
    addStudent(studentForm.value);
    resetForm();
    errorMessage.textContent = "";
  } else errorMessage.textContent = "Please enter student name";
};

const initialize = () => {
  renderSortingHatCard();
  deletebtnListener();
};

window.handleSubmit = handleSubmit;
window.updateCancelButton = updateCancelButton;
window.pushStudentUpdate = pushStudentUpdate;
window.expelStudent = expelStudent;
window.filterHouse = filterHouse;

export {
  expelStudent,
  updateCancelButton,
  pushStudentUpdate,
  handleSubmit,
  initialize,
  enterBtnListener,
};
