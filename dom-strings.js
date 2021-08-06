import { renderToDom } from "./render-to-dom.js";
import { arrayOfStudents, houseArray } from "./data.js";

const renderSortingHatCard = () => {
  const domString = `<div class="card">
      <h1 class="sorting-hat-title">Welcome to Hogwarts!</h5>
      <p class="card-text">This app will allow you to sort the students you enter by house, and expel them if necessary.</p>
      <hr>
      <p class="card-text">Click the Sorting Hat below to start!</p>
      <a href="#" class="btn-sorting-start" onclick="renderStudentForm()"></a>
    </div>`;
  renderToDom("#sorting-hat-container", domString);
};

const voldemortDomStringTemplate = (student, index) => {
  const domString = `<div class="death-eater-card">
  <img src="img/voldemort.png" class="card-img-top" alt="Death Eaters">
    <h5 class="card-title">${student.name}</h5>
    <p class="card-text">Sadly, ${student.name} went over to the dark side!</p>
    <button type="button" class="btn" id="deathEater-${index}" onclick="updateStudent(${index},'${student.name}','${student.house}')">Update</button>
    <button type="button" class="btn delete-btn" id="delete-${index}">Delete</button>
</div>`;
  return domString;
};

const studentDomStringTemplate = (student, index) => {
  const domString = `<div class="student-card">
  <div class="house-color ${student.house}"></div>
  <div class="card-body">
    <img src="img/hogwarts.png" class="card-img-top" alt="Hogwarts">
    <h5 class="card-title">${student.name}</h5><br>
    <h6 class="card-subtitle mb-2">${student.house}</h6>
    <button type="button" class="btn" id="student-${index}" onclick="updateStudent(${index},'${student.name}','${student.house}')">Update</button>
    <button type="button" class="btn" onclick="expelStudent(${index})">Expel!</button>
    <button type="button" class="btn delete-btn" id="delete-${index}">Delete</button>
</div>
</div>`;
  return domString;
};

const updateStudent = (index, name, houseOfStudent) => {
  const notMyHouses = houseArray.filter((house) => house != houseOfStudent);
  const domString = `<div class="updateForm update-student">
        <div class="update-container" id="updateContainer-${index}">
          <form>
            <div class="mb-3 update-input">
              <label for="updateName" class="form-label">Student Name</label>
              <input
                type="text"
                value="${name}"
                class="form-control name-input"
                id="updateName-${index}"
              />
            </div>
            <label for="houseDropdown" class="form-label">Student House</label>
            <select class="form-select" id="houseDropdown-${index}">
              <option selected >${houseOfStudent}</option>
              <option value="${notMyHouses[0]}">${notMyHouses[0]}</option>
              <option value="${notMyHouses[1]}">${notMyHouses[1]}</option>
              <option value="${notMyHouses[2]}">${notMyHouses[2]}</option>
              <option value="${notMyHouses[3]}">${notMyHouses[3]}</option>
            </select>
            <button type="button" class="btn btn-primary" onclick="pushStudentUpdate(${index})">
              Submit
            </button>
            <button
              type="button"
              class="btn btn-danger"
              id="updateCancelButton-${index}"
              onclick="updateCancelButton(${index})"
              />
              Cancel
            </button>
          </form>
        </div>
        </div>`;
  renderToDom("#updateDiv", domString);
};

const renderStudentForm = () => {
  const domString = `<div class=student-form><h4>Enter First Year's Name</h4><div id = "errorMessage"></div><form class="form-inline mx-auto" id="studentForm">
  <label class="sr-only" for="inlineFormInputName2">Student:</label>
  <input required type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Albus Percival Wulfric Brian Dumbledore">
  <button type="button" class="btn" onclick="handleSubmit()">Submit</button>
</form></div>`;

  renderToDom("#studentFormContainer", domString);
};

window.renderStudentForm = renderStudentForm;
window.updateStudent = updateStudent;

export {
  arrayOfStudents,
  houseArray,
  renderSortingHatCard,
  voldemortDomStringTemplate,
  studentDomStringTemplate,
  updateStudent,
  renderStudentForm,
};
