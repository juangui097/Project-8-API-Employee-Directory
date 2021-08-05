/*____________________________________
          GLOBAL VARIABLES
  ------------------------------------*/
const gridContainer = document.querySelector('#grid-container');
const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('.modal-content');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const modalClose = document.querySelector('.modal-close');
var currentSlide;
//Employee empty array
let employees = [];

//API string literal
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;


//_____________________________
/*-----    FUNCTIONS    -----*/
//----------------------------
function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = '';
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    employeeHTML += `
    <div class="card" data-index="${index}">
      <img class="avatar" src="${picture.large}" alt="Employee Profile Image">
      <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
      </div>
    </div>
    `;
  });
  gridContainer.innerHTML = employeeHTML;
}


function displayModal(index) {
  let {
    name,
    dob,
    phone,
    email,
    location:{
      city,
      street,
      state,
      postcode
    },
    picture
  } = employees[index];
  let date = new Date (dob.date);
  const modalHTML = `
    <img class="modal-avatar" src="${picture.large}" alt="Employee Profile Image">
    <div class="modal-text-container">
      <h2 class="modal-name">${name.first} ${name.last}</h2>
      <p class="modal-email">${email}</p>
      <p class="modal-address">${city}</p>
    </div>
    <hr>
    <div class="text-container2">
      <p class="phone">${phone}</p>
      <p class="address-2">${street.number} ${street.name}, ${state} ${postcode}</p>
      <p class="birthday">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `;
  overlay.classList.remove('hidden');
  modalContent.innerHTML = modalHTML;
}


function searchFilter() {
  var search, filter, card, empName, i, txtValue;
  search = document.querySelector('#search');
  filter = search.value.toUpperCase();
  card = gridContainer.querySelectorAll('.card');
  for (i = 0; i < card.length; i +=1) {
    empName = card[i].querySelectorAll('.name')[0];
    txtValue = empName.textContent || empName.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}

//___________________________________
/*-------  EVENT LISTENERS  -------*/
//----------------------------------
gridContainer.addEventListener('click', e => {
  if (e.target !== gridContainer) {
    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');
    var indexNumber = parseInt(index);
    currentSlide = indexNumber;
    displayModal(indexNumber);
  }
});

// Previous button
prevButton.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide = currentSlide - 1;
    displayModal(currentSlide);
  }
});

// Next button
nextButton.addEventListener('click', () => {
  if (currentSlide < 11) {
    currentSlide = currentSlide + 1;
    displayModal(currentSlide);
  }
});

// Close button
modalClose.addEventListener('click', () => {
  overlay.classList.add('hidden');
});

//________________________
/*-------  fetch  -------*/
//------------------------
fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));
