/******************************************
Treehouse FSJS Techdegree:
project 2 - Going through various pages of student information
******************************************/

/*
  The code below displays the information of various students (ie. information like the student's name, email, picture, etc.).
  The initial web page displays the first 9 students in the database. Web users can click on page 2 to see the next 9, etc.

  The code contains two functions:
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
  for(let i = 0; i < list.length; i++) {
    if(i >= startIndex && i < endIndex) {
      let listItem = `
      <li class="student-item cf">
        <div class="student-details">
          <img class="avatar" src=${data[i].picture.large} alt="Profile Picture">
          <h3>${data[i].name.first} ${data[i].name.last}</h3>
          <span class="email">${data[i].email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${data[i].registered.date}</span>
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
      showPage(data, e.target.textContent);
    }
  });
}
// Run the two function, called the data as collected in data.js with information on all the Students
// and the number 1 for the parameter 'page' as to initially open the web page on page 1.
showPage(data, 1);
addPagination(data);
