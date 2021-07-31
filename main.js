const renderToDom = (divId, textToPrint) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = textToPrint;
};

const renderSortingHatCard = () => {
  document.getElementById(
    "sorting-hat-container"
  ).innerHTML = `<div class="card">
      <h1 class="sorting-hat-title">Welcome to Hogwarts!</h5>
      <p class="card-text">This app will allow you to sort the students you enter by house, and expel them if necessary.</p>
      <hr>
      <p class="card-text">Press the button below to start!</p>
      <a href="#" class="btn btn-primary btn-sorting-start">Let's Start Sorting!</a>
    </div>`;
};

const initialize = () => {
  renderSortingHatCard();
};

initialize();
