let tasksToDos = [
    {
        'id': '0',
        'currentStatus': 'todo-list',
        'title': 'Wäsche waschen',
        'urgency': 'High',
        'category': 'Management',
        'createdDate': '19.03.2022',
        'dueDate': '22.08.22',
        'description': 'Endlich mal den Berg an Wäsche machen, loremlkulaskdj laksjfhlk lkjsaölk jkahljkynm cyxzwqkj sclkjcpiuw',
        'collaborators': [
            {
                'name': 'Tobias Fernkorn',
                'email': 'bieberbutzemann@fake.com',
                'img': "img/Profile-Pic-Tobi.PNG"
            },
            {
                'name': 'Sir Cow',
                'email': 'laktoseintolerant@kuh.com',
                'img': "img/sir-cow.png"
            }
        ],
    },
    {
        'id': '1',
        'currentStatus': 'todo-list',
        'title': 'Auto Kaufen',
        'urgency': 'Intermediate',
        'category': 'Sales',
        'createdDate': '1.02.2022',
        'dueDate': '2.09.22',
        'description': 'Muss mir noch den neuen Tesla zulegen',
        'collaborators': [
            {
                'name': 'Tobias Fernkorn',
                'email': 'bieberbutzemann@fake.com',
                'img': "img/Profile-Pic-Tobi.PNG"
            },
        ],
    },
    {
        'id': '2',
        'currentStatus': 'todo-list',
        'title': 'Pizza Essen',
        'urgency': 'High',
        'category': 'Software Development',
        'createdDate': '29.04.2022',
        'dueDate': '23.11.22',
        'description': 'Einmal die 12 mit doppelt Käse',
        'collaborators': [
            {
                'name': 'Sir Cow',
                'email': 'laktoseintolerant@kuh.com',
                'img': "img/sir-cow.png"
            },
            {
                'name': 'Tobias Fernkorn',
                'email': 'bieberbutzemann@fake.com',
                'img': "img/Profile-Pic-Tobi.PNG"
            },
        ],
    },
    {
        'id': '3',
        'currentStatus': 'in-progress-list',
        'title': 'Kuh Föhnen',
        'urgency': 'Low',
        'category': 'Human Resourches',
        'createdDate': '19.03.2022',
        'dueDate': '22.08.22',
        'description': 'Auch eine Kuh muss geföhnt werden.',
        'collaborators': [
            {
                'name': 'Tobias Fernkorn',
                'email': 'bieberbutzemann@fake.com',
                'img': "img/Profile-Pic-Tobi.PNG"
            },
            {
                'name': 'Sir Cow',
                'email': 'laktoseintolerant@kuh.com',
                'img': "img/sir-cow.png"
            }
        ],
    },
];
let boardListIds = ['todo-list', 'in-progress-list', 'testing-list', 'done-list']; //used to empty boards and change status
let employees = [
    {
        'name': 'Leta Marshall',
        'email': 'leta.marshall@example.com',
        'img': 'https://randomuser.me/api/portraits/women/72.jpg'
    },
    {
        'name': 'Joachim Cancel',
        'email': 'joachim.Cancel@example.com',
        'img': 'https://randomuser.me/api/portraits/men/89.jpg'
    },
    {
        'name': 'Kirsten Büchler',
        'email': 'kirsten.buchler@example.com',
        'img': 'https://randomuser.me/api/portraits/women/69.jpg'
    },
    {
        'name': 'Miguel Olson',
        'email': 'miguel.olson@example.com',
        'img': 'https://randomuser.me/api/portraits/men/40.jpg'
    }
];

setURL('http://gruppe-260.developerakademie.net/smallest_backend_ever-master');

async function init() {
    await includeHTML();
    await downloadFromServer();
    loadFromLocalStorage();
}

// stops event propagation
function stopPropagation(event) {
    event.stopPropagation();
}

//creates card details before fade in
function openCardDetails(id) {
    let task = tasksToDos[id]
    let container = document.getElementById("card-details-container");
    container.innerHTML = fillCardDetailsHTML(task);
    fillCardDetailsButtonsContainer(task, id);
    fillCardDeatilCollaborators(id);
    createUrgentBoarder(id, document.getElementById("card-details"))
    fadeIn();
}

//creates collaborator details on detail card before fade in
function fillCardDeatilCollaborators(id) {
    let collaborators = tasksToDos[id]['collaborators'];
    for (let i = 0; i < collaborators.length; i++) {
        const collaborator = collaborators[i];
        document.getElementById('assignee-container').innerHTML += fillCardDeatilCollaboratorsHTML(collaborator)
        ;
    } 
}

// Fades objekts in with removing d-none and adds opacity transition
function fadeIn() {
    document.getElementById('card-details-container').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('card-details-container').classList.remove('fade-out')
    }, 50);
}

// Fades objekts out with opacity transition and adding d-none
function closeCardDetails() {
    document.getElementById('card-details-container').classList.add('fade-out');
    setTimeout(() => {
        document.getElementById('card-details-container').classList.add('d-none')
    }, 500);
}

//add colored border to cards, depending on the urgent status
function createUrgentBoarder(i, container) {
    let task = tasksToDos[i];
    if (task['currentStatus'] === 'done-list') {
        container.classList.add("done")
    } else if (task['urgency'] === 'High') {
        container.classList.add("urgent")    
        } else if (task['urgency'] === 'Intermediate') {
            container.classList.add("medium") 
        } else if (task['urgency'] === 'Low') {
            container.classList.add("low") 
        }
}

//creates buttons on detail card depending on their current status
function fillCardDetailsButtonsContainer(task, id) {
    container = document.getElementById('button-container');
    container.innerHTML = '';
    if(task['currentStatus'] === 'todo-list') {
        container.innerHTML += addCurrentStatusTitleHTML('To Do');
        container.innerHTML += addForwardButtonHTML(id);
        container.innerHTML += addGoBackButtonHTML(id);
    } else if (task['currentStatus'] === 'in-progress-list') {
        container.innerHTML += addBackButtonHTML(id);
        container.innerHTML += addCurrentStatusTitleHTML('In Progress');
        container.innerHTML += addForwardButtonHTML(id);
        container.innerHTML += addGoBackButtonHTML(id);
    } else if (task['currentStatus'] === 'testing-list') {
        container.innerHTML += addBackButtonHTML(id);
        container.innerHTML += addCurrentStatusTitleHTML('Testing');
        container.innerHTML += addForwardButtonHTML(id);
        container.innerHTML += addGoBackButtonHTML(id);
    } else {
        container.innerHTML += addBackButtonHTML(id);
        container.innerHTML += addCurrentStatusTitleHTML('Done');
        container.innerHTML += addDeleteButtonHTML(id);
        container.innerHTML += addGoBackButtonHTML(id);
    }
}

//moves task to next status
function nextStatus(id) {
    let task = tasksToDos[id];
    let currentStatus = task['currentStatus'];
    let currentStatusIndex = boardListIds.indexOf(currentStatus);
    let newStatusIndex = currentStatusIndex + 1;
    task['currentStatus'] = boardListIds[newStatusIndex];
    fillCardDetailsButtonsContainer(task, id);
    saveToLocalStorage();
    checkCurrentHtmlLocationAndUpdateCards()
}

//moves task to previous status
function lastStatus(id) {
    let task = tasksToDos[id];
    let currentStatus = task['currentStatus'];
    let currentStatusIndex = boardListIds.indexOf(currentStatus);
    let newStatusIndex = currentStatusIndex - 1;
    task['currentStatus'] = boardListIds[newStatusIndex];
    fillCardDetailsButtonsContainer(task, id);
    saveToLocalStorage();
    checkCurrentHtmlLocationAndUpdateCards()
}

//deletes Task
function deleteTask(id) {
    tasksToDos.splice(id, 1);
    saveToLocalStorage();
    checkCurrentHtmlLocationAndUpdateCards();
    closeCardDetails();
}

//checks request origin
function checkCurrentHtmlLocationAndUpdateCards() {
    if(document.getElementById('card-details-container').classList.contains('primary')) {
        loadTasksToBoard();
    } else {
        loadTasksToBacklog()
    }
}

//shows navbar when in mobile mode and hide it after 4s
function toggleNavbar() {
    document.getElementById('navbar').classList.toggle('show-navbar');
    setTimeout(() => {
        document.getElementById('navbar').classList.remove('show-navbar');
    }, 4000)
}

//opens loginpage
function logout() {
    window.location.replace('../welcome.html')
}

//save to LocalStorage
function saveToLocalStorage() {
    let tasksToDosAsText = JSON.stringify(tasksToDos);
    backend.setItem('tasksToDos', tasksToDosAsText);
}


//load from LocalStorage
function loadFromLocalStorage() {
    let tasksToDosAsText = backend.getItem('tasksToDos');
    if (tasksToDosAsText) {
        tasksToDos = JSON.parse(tasksToDosAsText);
    }
}

//Snippets
function fillCardDetailsHTML(task) {
    return /*html*/ `
    <div class="card-details-content" id="card-details" onclick="stopPropagation(event)">
            <div class="card-details-content-left">
                <h2>${task['title']}</h2>
                <span><b>Urgency:</b> ${task['urgency']}</span>
                <span><b>Category:</b> ${task['category']}</span>
                <div class="deadline-container">
                    <span><b>Created On:</b> ${task['createdDate']}</span>
                    <span><b>Due Date:</b> ${task['dueDate']}</span>
                </div>
                <span><b>Task Description:</b></span>
                <span class="card-details-description">${task['description']}</span>
            </div>
            <div class="card-details-content-right">
                <div class="card-details-button-container" id="button-container">
                </div>
                <div id="assignee-container">
                </div>
            </div>
        </div>
`
}

function fillCardDeatilCollaboratorsHTML(collaborator) {
    return /*html*/ `
    <div class="assignee-container">
       <img src="${collaborator['img']}" alt="">
       <div class="person-data-container">
           <div class="assignee-name">${collaborator['name']}</div>
           <div class="assignee-email"><a href="mailto:"${collaborator['email']}">${collaborator['email']}</div>
       </div>
   </div>
`
}

function addBackButtonHTML(id) {
    return /*html*/ `
    <img src="img/arrow-97-24.png" alt="" title="Last Status" onclick="lastStatus('${id}')">
    `
}

function addCurrentStatusTitleHTML(title){
    return /*html*/ `
    <span><b>${title}</b></span>
    `
}

function addForwardButtonHTML(id) {
    return /*html*/ `
    <img src="img/arrow-32-24.png" alt="" title="Next Status" onclick="nextStatus('${id}')">
    `
}

function addGoBackButtonHTML(id) {
    return /*html*/ `
    <img src="img/close-window-24.png" alt="" title="Go Back" onclick="closeCardDetails('${id}')">
    `
}

function addDeleteButtonHTML(id) {
    return /*html*/ `
    <img src="img/trash-2-24.png" alt="" title="Delete Task" onclick="deleteTask('${id}')">
    `
}