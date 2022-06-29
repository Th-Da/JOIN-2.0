// Creates a new task
function createNewTask() { // creat task button
    let titles = document.getElementById('input-field-title').value;
    let dueDates = document.getElementById('input-field-date').value;
    let categorys = document.getElementById('input-field-category').value;
    let descriptions = document.getElementById('input-field-description').value;
    let urgencys = document.getElementById('input-field-urgency').value;
    let date = new Date().toDateString();

    if (titles, categorys, descriptions, urgencys == '') {
        alert('Please fill out all fields');
    } else {

        pushTaskInArray(titles, dueDates, categorys, descriptions, urgencys, date);

        clearInputFields();

        saveToLocalStorage();
    }
}


// clear the input fields
function clearInputFields() {
    document.getElementById('input-field-title').value = '';
    document.getElementById('input-field-date').value = '';
    document.getElementById('input-field-category').value = '';
    document.getElementById('input-field-description').value = '';
    document.getElementById('input-field-urgency').value = '';
}


//push in taskToDos Array
function pushTaskInArray(titles, dueDates, categorys, descriptions, urgencys, date) {
    tasksToDos.push({
        'currentStatus': 'todo-list',
        'title': titles,
        'description': descriptions,
        'dueDate': dueDates,
        'category': categorys,
        'urgency': urgencys,
        'createdDate': date,
        'collaborators': [
            {
                'name': employees['0']['name'],
                'email': employees['0']['email'],
                'img': employees['0']['img']
            }
        ],
    });
}


//The input is deleted from the input fields
function cancelTheInput() { //cancel button
    document.getElementById('input-field-title').value = '';
    document.getElementById('input-field-date').value = '';
    document.getElementById('input-field-category').value = '';
    document.getElementById('input-field-description').value = '';
    document.getElementById('input-field-urgency').value = '';
}


// open user card in AddTask
function openUsersCard() {
    fadeIn();
    let openCard = document.getElementById('card-details-container');

    openCard.innerHTML = openUsersCardHTML();
    showUsers();
}


// The individual employees are displayed
function showUsers() {

    for (let u = 0; u < employees.length; u++) {
        const users = employees[u];
        let showUsers = document.getElementById('card-details-users');
        
        showUsers.innerHTML += showUsersHTML(u);
    }
}


// HTML snippets
function openUsersCardHTML() {
    return /*html*/`
    <div id="card-details" class="card-details-user">
        <div class="close-button-container">
            <img onclick="closeCardDetails()" src="img/x-mark-24.png" title="Go Back">
        </div>
        <div id="card-details-users"></div>
    </div>
    `
}


function showUsersHTML(u) {
    return /*html*/`
        <div onclick="chooseTheUser(${u})" class="user-container-main">
            <div class="user-container">
                <div class="img-user-container width-responsive"><img class="user-img" src="${employees[u]['img']}"></div>
                <div class="assignee-user-name width-responsive"><b>Name:</b> ${employees[u]['name']}</div>
                <div class="assignee-email width-responsive">E-Mail: ${employees[u]['email']}</div>
            </div>
        </div>
    `
}