arrayOfStudents = [];

const renderToDom = (divId, textToPrint) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = textToPrint;
};

const renderSortingHatCard = () => {
  domString = `<div class="card">
      <h1 class="sorting-hat-title">Welcome to Hogwarts!</h5>
      <p class="card-text">This app will allow you to sort the students you enter by house, and expel them if necessary.</p>
      <hr>
      <p class="card-text">Press the button below to start!</p>
      <a href="#" class="btn btn-primary btn-sorting-start" onclick="renderStudentForm()">Let's Start Sorting!</a>
    </div>`;

  renderToDom("#sorting-hat-container", domString);
};

const filterHouse = () => {
  const selectedHouse = document.getElementById("filterDropdown").value;
  if (selectedHouse === "All") {
    renderStudents(arrayOfStudents);
  } else {
    const filteredHouseArray = arrayOfStudents.filter(
      (student) =>
        student.house === selectedHouse || student.house === "expelled"
    );
    renderStudents(filteredHouseArray);
  }
};

const resetForm = () => {
  document.getElementById("studentForm").reset();
};

renderStudents = (arr) => {
  document.getElementById("goodStudents").style.visibility = "visible";
  document.getElementById("badStudents").style.visibility = "visible";
  document.getElementById("firstYearTitle").style.visibility = "visible";
  document.getElementById("voldemortTitle").style.visibility = "visible";
  studentDomString = "";
  voldemortDomString = "";

  arr.forEach((student, index) => {
    if (student.house === "Expelled!") {
      document.getElementById("badStudents").innerHTML = "";
      voldemortDomString += `<div class="death-eater-card">
      <img src="img/deathEaters.jpg" class="card-img-top" alt="Death Eaters">
        <h5 class="card-title">${student.name}</h5>
        <p class="card-text">Sadly, ${student.name} went over to the dark side!</p>
        <button type="button" class="btn btn-primary" id="deathEater-${index}" onclick="updateStudent(${index},'${student.name}','${student.house}')">Update</button>
    </div>`;
    } else {
      document.getElementById("goodStudents").innerHTML = "";
      studentDomString += `<div class="student-card">
        <div class="house-color ${student.house}"></div>
        <div class="card-body">
          <h5 class="card-title">${student.name}</h5><br>
          <h6 class="card-subtitle mb-2">${student.house}</h6>
          <button type="button" class="btn btn-danger" onclick="expelStudent(${index})">Expel!</button>
          <button type="button" class="btn btn-primary" id="student-${index}" onclick="updateStudent(${index},'${student.name}','${student.house}')">Update</button>
      </div>
      </div>`;
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

const updateStudent = (index, name, houseOfStudent) => {
  const houseArray = [
    "Ravenclaw",
    "Gryffindor",
    "Hufflepuff",
    "Slytherin",
    "Expelled!",
  ];
  const notMyHouses = houseArray.filter((house) => house != houseOfStudent);
  domString = `<div class="updateForm update-student">
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
            >
              Cancel
            </button>
          </form>
        </div>
        </div>`;

  renderToDom("#updateDiv", domString);
};

const randomHouse = () => {
  const house = ["Ravenclaw", "Gryffindor", "Hufflepuff", "Slytherin"];
  return house[Math.floor(Math.random() * house.length)];
};

const addStudent = (student) => {
  arrayOfStudents.push({
    name: student,
    house: randomHouse(),
  });
  arrayOfStudents.sort((a, b) => (a.house > b.house ? 1 : -1));
  filterHouse();
};

const handleSubmit = () => {
  errorMessage = document.getElementById("errorMessage");
  const studentForm = document.getElementById("inlineFormInputName2");
  if (studentForm.value) {
    addStudent(studentForm.value);
    resetForm();
    errorMessage.textContent = "";
  } else errorMessage.textContent = "Please enter student name";
};

const renderStudentForm = () => {
  domString = `<div class=student-form><h4>Enter First Year's Name</h4><div id = "errorMessage"></div><form class="form-inline mx-auto" id="studentForm">
  <label class="sr-only" for="inlineFormInputName2">Student:</label>
  <input required type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Albus Percival Wulfric Brian Dumbledore">
  <button type="button" class="btn btn-primary mb-2" onclick="handleSubmit()">Submit</button>
</form></div>`;

  renderToDom("#studentFormContainer", domString);
};

const initialize = () => {
  renderSortingHatCard();
};

initialize();
document.querySelector("body").addEventListener("click", (event) => {
  console.log(event.target.id);
});
