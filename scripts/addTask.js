/**
 * The global Array
 */
let choosedUser = [];

async function initNewTask() {
    await includeHTML();
    await downloadFromServer();
    loadFromLocalStorage();
    setCurrentDateToInputField();
    showUsersOnAddTask();
}

function setCurrentDateToInputField() {
    document.getElementById('input-field-date').value = new Date().toISOString().substring(0, 10);
}

/**
 * This function creates a new task
 */
async function createNewTask() { // creat task button
    let titles = document.getElementById('input-field-title').value;
    let dueDates = document.getElementById('input-field-date').value;
    let categorys = document.getElementById('input-field-category').value;
    let descriptions = document.getElementById('input-field-description').value;
    let urgencys = document.getElementById('input-field-urgency').value;
    let date = new Date().toDateString();
    pushTaskInArray(titles, dueDates, categorys, descriptions, urgencys, date);
    if (choosedUser.length === 0) {
        document.getElementById('add-user-button').classList.toggle('add-user-button')
    } else {
       showLoadingAnimation();
    await saveToLocalStorage();
    window.close();
    window.open("index.html");  
    }
   
}

/**
 * shows loading animation
 */
function showLoadingAnimation() {
    document.getElementById('loading-container').classList.remove('d-none')
}


/**
 * This function deletes the employees
 */
function clearInputFields() {
    choosedUser = [];
    showUsersOnAddTask();
    setCurrentDateToInputField();

}


//push in taskToDos Array
/**
 * This function pushed the content from the input field into an array
 * 
 * @param {string} titles - content from the input field from the function createNewTask
 * @param {string} dueDates - content from the input field from the function createNewTask 
 * @param {string} categorys - content from the input field from the function createNewTask 
 * @param {string} descriptions - content from the input field from the function createNewTask 
 * @param {string} urgencys - content from the input field from the function createNewTask 
 * @param {string} date - content from the input field from the function createNewTask 
 */
function pushTaskInArray(titles, dueDates, categorys, descriptions, urgencys, date) {
    tasksToDos.push({
        'currentStatus': 'todo-list',
        'title': titles,
        'description': descriptions,
        'dueDate': dueDates,
        'category': categorys,
        'urgency': urgencys,
        'createdDate': date,
        'collaborators': choosedUser,
    });
}


/**
 * This function open the large user card in the category AddTask
 */
function openUsersCard() {
    fadeIn();
    let openCard = document.getElementById('card-details-container');

    openCard.innerHTML = openUsersCardHTML();
    showUsers();
}


/**
 * This function shows the emlpoyees on details card
 */
function showUsers() {
    let showUsers = document.getElementById('card-details-users');

    for (let u = 0; u < employees.length; u++) {
        const employee = employees[u];
        let userAlreadySelected = checkIfUserAlreadySelected(employee);
        if (userAlreadySelected)
            showUsers.innerHTML += showSelectedUsersHTML(u);
        else
            showUsers.innerHTML += showUsersHTML(u);
    }
}

/**
 * checks if user is already selectet
 * 
 * @param {Element} employee 
 * @returns true or false
 */
function checkIfUserAlreadySelected(employee) {
    for (let i = 0; i < choosedUser.length; i++) {
        const user = choosedUser[i];
        if (employee['name'] === user['name']) {
            return true
        }
    }
    return false
}


/**
 * removes selected user from choosedUser
 * 
 * @param {index} u 
 */
function removeUser(u) {
    let UserToSearch = employees[u]['name'];
    for (let i = 0; i < choosedUser.length; i++) {
        const user = choosedUser[i];
        if (UserToSearch === user['name']) {
            choosedUser.splice(i, 1);
            break
        }
    }
    closeCardDetails();
    showUsersOnAddTask();
}

/**
 * In this function, you can pick a single employee and push it into an array
 * 
 * @param {variable} u - This is a variable and replaces a place in the array
 */
function chooseTheUser(u) {

    choosedUser.push({
        'name': employees[u]['name'],
        'email': employees[u]['email'],
        'img': employees[u]['img']
    })

    closeCardDetails();
    showUsersOnAddTask();
}


/**
 * This function show the selected employees
 */
function showUsersOnAddTask() {
    let showUsers = document.getElementById('user-icon');

    showUsers.innerHTML = '';

    for (let i = 0; i < choosedUser.length; i++) {
        const userImg = choosedUser[i]['img'];

        showUsers.innerHTML += `<img src="${userImg}">`;
    }
}


// HTML snippets

/**
 * This function return the HMTL
 * 
 * @returns - return the HTML for the openUsersCard function 
 */
function openUsersCardHTML() {
    return /*html*/`
    <div id="card-details" class="card-details-user" onclick="stopPropagation(event)">
        <div class="close-button-container">
            <img onclick="closeCardDetails()" src="img/x-mark-24.png" title="Go Back">
        </div>
        <div id="card-details-users"></div>
    </div>
    `
}


/**
 * This function return the HTML
 * 
 * @param {variable} u - This is a variable and replaces a place in the array
 * @returns - return the HTML for the showUsers function 
 */
function showUsersHTML(u) {
    return /*html*/`
        <div id="user-container${u}" onclick="chooseTheUser(${u})" class="user-container-main">
            <div class="user-container">
                <div class="img-user-container width-responsive"><img id="user-img${u}" class="user-img" src="${employees[u]['img']}"></div>
                <div class="assignee-user-name width-responsive">Name: <span id="user-name${u}">${employees[u]['name']}</span></div>
                <div class="assignee-email width-responsive">E-Mail: <span id="user-email${u}">${employees[u]['email']}</span></div>
            </div>
        </div>
    `
}

function showSelectedUsersHTML(u) {
    return /*html*/`
        <div id="user-container${u}" onclick="removeUser(${u})" class="user-container-main user-inactive">
            <div class="user-container">
                <div class="img-user-container width-responsive"><img id="user-img${u}" class="user-img" src="${employees[u]['img']}"></div>
                <div class="assignee-user-name width-responsive">Name: <span id="user-name${u}">${employees[u]['name']}</span></div>
                <div class="assignee-email width-responsive">E-Mail: <span id="user-email${u}">${employees[u]['email']}</span></div>
            </div>
        </div>
    `
}