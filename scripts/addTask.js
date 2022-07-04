/**
 * The global Array
 */
let choosedUser = [];

async function initNewTask() {
    await includeHTML();
    await downloadFromServer();
    loadFromLocalStorage();
    setCurrentDateToInputField();
}

function setCurrentDateToInputField() {
    document.getElementById('input-field-date').value = new Date().toISOString().substring(0, 10);
}

/**
 * This function creates a new task
 */
function createNewTask() { // creat task button
    let titles = document.getElementById('input-field-title').value;
    let dueDates = document.getElementById('input-field-date').value;
    let categorys = document.getElementById('input-field-category').value;
    let descriptions = document.getElementById('input-field-description').value;
    let urgencys = document.getElementById('input-field-urgency').value;
    let date = new Date().toDateString();

    if (titles === '') {
        alert('Please fill out all fields');
    } else {
        pushTaskInArray(titles, dueDates, categorys, descriptions, urgencys, date);
        clearInputFields();
        saveToLocalStorage();

    }
}



/**
 * This function clear the input field and delete the employees
 */
function clearInputFields() {
    choosedUser = [];
    document.getElementById('input-field-title').value = '';
    document.getElementById('input-field-date').value = '';
    document.getElementById('input-field-description').value = '';

    document.getElementById('user-image-1').classList.add('d-none');
    document.getElementById('user-image-2').classList.add('d-none');
    document.getElementById('user-image-3').classList.add('d-none');
    document.getElementById('user-image-4').classList.add('d-none');

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
 * This function shows the individual employees in the large card
 */
function showUsers() {
    let showUsers = document.getElementById('card-details-users');

    for (let u = 0; u < employees.length; u++) {
        const employee = employees[u];
        let userAlreadySelected = false;
       if (choosedUser.length !== 0) {
        for (let i = 0; i < choosedUser.length; i++) {
            const user = choosedUser[i];
            if (employee['name'] === user['name']) {
                userAlreadySelected = true;
            }
        }
       }
       if (userAlreadySelected === false) {
        showUsers.innerHTML += showUsersHTML(u);
       } else {
        showUsers.innerHTML += showSelectedUsersHTML(u);
       }
    }

    // showNotSelectedUser();
}


/**
 * this function only shows the users who are still available
 */
// function showNotSelectedUser() {
//     for (let s = 0; s < choosedUser.length; s++) {
//         const notSeleceted = choosedUser[s]['name'];
        
//         if (notSeleceted == 'Leta Marshall') {
//             document.getElementById('user-container' + s).classList.add('user-inactive');
//         }
//         if (notSeleceted == 'Joachim Cancel') {
//             document.getElementById('user-container' + s).classList.add('user-inactive');
//         }
//         if (notSeleceted == 'Kirsten Büchler') {
//             document.getElementById('user-container' + s).classList.add('user-inactive');
//         }
//         if (notSeleceted == 'Miguel Olson') {
//             document.getElementById('user-container' + s).classList.add('user-inactive');
//         }
//     }
// }


/**
 * In this function, you can pick a single employee and push it into an array
 * 
 * @param {variable} u - This is a variable and replaces a place in the array
 */
function chooseTheUser(u) {
    let nameOfUser = document.getElementById('user-name' + u).innerHTML;
    let emailOfUSer = document.getElementById('user-email' + u).innerHTML;
    let imgOfUser = document.getElementById('user-img' + u).src;

        choosedUser.push({
            'name': employees[u]['name'],
            'email': employees[u]['email'],
            'img': employees[u]['img']
        })
    
    closeCardDetails();
    showUsersOnAddTask(u);
}

// function chooseTheUser(u) {
//     let nameOfUser = document.getElementById('user-name' + u).innerHTML;
//     let emailOfUSer = document.getElementById('user-email' + u).innerHTML;
//     let imgOfUser = document.getElementById('user-img' + u).src;

//         choosedUser.push({
//             'name': nameOfUser,
//             'email': emailOfUSer,
//             'img': imgOfUser
//         })
    
//     closeCardDetails();
//     showUsersOnAddTask(u);
// }


/**
 * The function show the selected employees
 * 
 * @param {variable} u - This is a variable and replaces a place in the array
 */
function showUsersOnAddTask(u) {
    if (employees[u]['name'] === "Leta Marshall") {
        document.getElementById('user-image-1').classList.remove('d-none');
    }

    if (employees[u]['name'] === "Joachim Cancel") {
        document.getElementById('user-image-2').classList.remove('d-none');
    }

    if (employees[u]['name'] === "Kirsten Büchler") {
        document.getElementById('user-image-3').classList.remove('d-none');
    }

    if (employees[u]['name'] === "Miguel Olson") {
        document.getElementById('user-image-4').classList.remove('d-none');
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
        <div id="user-container${u}" class="user-container-main user-inactive">
            <div class="user-container">
                <div class="img-user-container width-responsive"><img id="user-img${u}" class="user-img" src="${employees[u]['img']}"></div>
                <div class="assignee-user-name width-responsive">Name: <span id="user-name${u}">${employees[u]['name']}</span></div>
                <div class="assignee-email width-responsive">E-Mail: <span id="user-email${u}">${employees[u]['email']}</span></div>
            </div>
        </div>
    `
}