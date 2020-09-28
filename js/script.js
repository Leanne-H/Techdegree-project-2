/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage (list, page) {
  const itemsPerPage = 9;
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = page * itemsPerPage;
  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';
  // Loop over the list-parameter inside the showPage function:
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
      studentList.insertAdjacentHTML('beforeend', listItem);
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
  let numberOfPages = Math.ceil(list.length / 9);
  let pageList = document.querySelector('.link-list');
  pageList.innerHTML = '';

  for (let i = 1; i < numberOfPages +1 ; i++) {
    const li = document.createElement('li');
    const button = document.createElement("button");
    li.appendChild(button);
    pageList.appendChild(li);
    button.type = "button";
    button.textContent = `${i}`;
  }
  // Setting class of first page button to 'active'
  const firstButton = pageList.firstElementChild.firstElementChild;
  firstButton.className = "active";
  //Event listener on paginationList to: remove classname 'active' from all buttons
  pageList.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
      const removeClass = document.querySelector('.active');
      removeClass.className = 'none';
      e.target.className = "active";
      showPage(data, e.target.textContent);
    }
  });
}

showPage(data, 1);
addPagination(data);




// Call functions
