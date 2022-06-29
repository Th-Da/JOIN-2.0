let choosedUser = [];


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
    document.getElementById('input-field-description').value = '';

    document.getElementById('user-image-1').classList.add('d-none');
    document.getElementById('user-image-2').classList.add('d-none');
    document.getElementById('user-image-3').classList.add('d-none');
    document.getElementById('user-image-4').classList.add('d-none');
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
        'collaborators': choosedUser,
    });
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


//Choose the user and push in a array
function chooseTheUser(u) {
    let nameOfUser = document.getElementById('user-name' + u).innerHTML;
    let emailOfUSer = document.getElementById('user-email' + u).innerHTML;
    let imgOfUser = document.getElementById('user-img' + u).src;

    let checkUsers = choosedUser.indexOf(employees[u]);

    if (checkUsers == -1) {
        choosedUser.push({
            'name': nameOfUser,
            'email': emailOfUSer,
            'img': imgOfUser
        })
    }
    showUsersOnAddTask(u);
}


//show users on addtask
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
                <div class="img-user-container width-responsive"><img id="user-img${u}" class="user-img" src="${employees[u]['img']}"></div>
                <div class="assignee-user-name width-responsive">Name: <span id="user-name${u}">${employees[u]['name']}</span></div>
                <div class="assignee-email width-responsive">E-Mail: <span id="user-email${u}">${employees[u]['email']}</span></div>
            </div>
        </div>
    `
}