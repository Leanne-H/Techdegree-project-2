/******************************************
Treehouse FSJS Techdegree:
project 2 - Going through various pages of student information
******************************************/

/*
  The code below displays the information of various students (ie. information like the student's name, email, picture, etc.).
  The initial web page displays the first 9 students in the database. Web users can click on page 2 to see the next 9, etc.
  The search bar at the top of the page offers the option to look for students based on (parts of) their first or last names.

  The code contains two functions, an event handler for the search bar and some corresponding variables:
    - The first function is called 'showPage'. It creates and appends the elements needed to display a page of nine students.
      It works with a template literal to collect the student information from the database (stored in data.js);
    - The second function is called 'addPagination'. It creates and appends the elements needed for the pagination buttons and
      allows for the 'active' selection of students to be displayed on the web page.

  If something is unclear in this code, please contact me.
*/

// First function
function showPage (list, page) {
  // We wish to display the information of 9 students per page. Here I collect the index number of the first and final student to be displayed on the web page.
  // The content is thus dependent on the page to be selected by the second function 'addPagination'.
  const itemsPerPage = 9;
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = page * itemsPerPage;
  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';
  // Loop over the list-parameter (which represents the dataset of students) in order to collect their information and format it HTML-style.
  for(let i = 0 ; i < list.length; i++) {
    if(i >= startIndex && i < endIndex) {
      let listItem = `
      <li class="student-item cf">
        <div class="student-details">
          <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
          <h3>${list[i].name.first} ${list[i].name.last}</h3>
          <span class="email">${list[i].email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${list[i].registered.date}</span>
        </div>
      </li>
      `;
      // Push the HTML-formatted information to the web page. The information of the next student is inserted following the info on the previously
      // selected student, such that the page starts with the student at number startIndex and ends with the student at number endIndex
      studentList.insertAdjacentHTML('beforeend', listItem);
    }
  }
}


// Second function
function addPagination(list) {
  // Calculate the required number of pages needed to display all selected students. Round off to the upper integer (if there are 10 students and
  // we can display 9 students per page then we need 2 pages (10 / 9 is more than 1 so to round this off we get 2).
  let numberOfPages = Math.ceil(list.length / 9);
  let pageList = document.querySelector('.link-list');
  pageList.innerHTML = '';

  // Loop over the number of pages to assign each a button with the correct page number.
  // Only execute the loop + create page buttons if the numberOfPages is defined (thus, if there is at least 1 student included in the list-parameter)
  if (numberOfPages) {
    for (let i = 1; i < numberOfPages +1 ; i++) {
      const li = document.createElement('li');
      const button = document.createElement("button");
      li.appendChild(button);
      pageList.appendChild(li);
      button.type = "button";
      button.textContent = `${i}`;
    }
    // Setting class of first page button to 'active' such that the web user first sees the first page of 9 students.
    const firstButton = pageList.firstElementChild.firstElementChild;
    firstButton.className = "active";
    // When a page button is clicked, switch the page it represents and display the corresponding students.
    // To do so, remove the class 'active' from the button which was initially classed 'active' and move the class to the 'clicked' button.
    pageList.addEventListener('click', (e) => {
      if (e.target.tagName == 'BUTTON') {
        const removeClass = document.querySelector('.active');
        removeClass.className = 'none';
        e.target.className = "active";
        showPage(list, e.target.textContent);
      }
    });
  // If numberOfPages does not exist (aka, the list of students is emty, print the message "No results found" to the web page)
  } else {
    let message = document.createElement('h3');
    h2.appendChild(message);
    message.innerHTML = "No results found";
  }
}

// Creating the search bar elements and appending them to the h2-element:
const h2 = document.querySelector('h2');
const searchBar = document.createElement('div');
h2.appendChild(searchBar);
const searchContent = `
      <label for="search" class="student-search">
        <input id="search" placeholder="Search by name...">
        <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
      `;
searchBar.innerHTML = searchContent;
const searchButton = document.querySelector('label button');
const searchInput = document.querySelector('label input');

// Creating an addEventListener to the search button. Pushing the searched content to 'text'. The content of text is compared with the first names and last names of the students in the data list.
// If the first or last name of a student contains the content of 'text', then the student will be included in the 'new student list' (called 'searchData').
//
searchButton.addEventListener('click', () => {
  // Remove any existing messages displayed on screen
  let message = document.querySelector('h3');
  message.innerHTML = '';
  // Save the input value in variable 'text'
  const text = searchInput.value;
  //For each new search, the database with students to be searched starts off empty:
  let searchData = [];
  // Loop through all students in the 'data'-database and push the ones that meet the conditions to 'searchData'.
  for(let i = 0; i < data.length; i++) {
    if( data[i].name.first.toUpperCase().includes(text.toUpperCase()) || data[i].name.last.toUpperCase().includes(text.toUpperCase()) ) {
      searchData.push(data[i]);
    }
  }
  // Call the functions with the newly created list of students, only including searched items.
  showPage(searchData, 1);
  addPagination(searchData);
  // Restore empty string value for searchInput such that after clicking the search button, the textbox is empty and displays (default) 'Search by name...'.
  searchInput.value = '';
});

// Run the functions, calling the data as collected in data.js with information on all the Students
// and the number 1 for the parameter 'page' as to initially open the web page on page 1.
showPage(data, 1);
addPagination(data);
