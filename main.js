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

const resetForm = () => {
  document.getElementById("studentForm").reset();
};

renderStudents = () => {
  document.getElementById("goodStudents").style.visibility = "visible";
  document.getElementById("badStudents").style.visibility = "visible";
  document.getElementById("firstYearTitle").style.visibility = "visible";
  document.getElementById("voldemortTitle").style.visibility = "visible";
  studentDomString = "";
  voldemortDomString = "";

  arrayOfStudents.forEach((student, index) => {
    if (student.house === "expelled") {
      document.getElementById("goodStudents").innerHTML = "";
      studentDomString += `<div class="death-eater-card">
      <img src="img/deathEaters.jpg" class="card-img-top" alt="Death Eaters">
      <div class="card-body">
        <h5 class="card-title">${student.name}</h5>
        <p class="card-text">Sadly, ${student.name} went over to the dark side!</p>
      </div>
    </div>`;
    } else {
      document.getElementById("badStudents").innerHTML = "";
      voldemortDomString += `<div class="student-card">
      <div class="card-body">
        <h5 class="card-title">${student.name}</h5><br>
        <h6 class="card-subtitle mb-2">${student.house}</h6>
        <button type="button" class="btn btn-danger" onclick="expelStudent(${index})">Expel!</button>
        </div>
      </div>`;
    }
  });
  renderToDom("#goodStudents", voldemortDomString);
  renderToDom("#badStudents", studentDomString);
};

const expelStudent = (index) => {
  arrayOfStudents[index].house = "expelled";
  renderStudents();
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
  renderStudents();
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
