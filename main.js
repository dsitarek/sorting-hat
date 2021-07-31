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
      <a href="#" class="btn btn-primary btn-sorting-start">Let's Start Sorting!</a>
    </div>`;

  renderToDom("#sorting-hat-container", domString);
};

const renderStudentForm = () => {
  domString = `<form class="form-inline">
  <label class="sr-only" for="inlineFormInputName2">Student:</label>
  <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Jane Doe">
  <button type="submit" class="btn btn-primary mb-2">Submit</button>
</form>`;

  renderToDom("#studentForm", domString);
};

const initialize = () => {
  renderSortingHatCard();
  renderStudentForm();
};

initialize();
