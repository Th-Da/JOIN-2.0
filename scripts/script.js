let tasksToDos = [
    {
        'id': '0',
        'currentStatus': 'todo-list',
        'title': 'Wäsche waschen',
        'urgency': 'High',
        'category': 'Management',
        'createdDate': '19.03.2022',
        'dueDate': '22.08.22',
        'description': 'Endlich mal den Berg an Wäsche machen',
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

async function init() {
    await includeHTML();
    loadFromLocalStorage();

    //    await loadUrlUsers();
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
    fillCardDeatilCollaborators(id);
    createUrgentBoarder(id, document.getElementById("card-details"))
    fadeIn();
}

//creates all collaborator details on detail card before fade in
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

//save to LocalStorage
function saveToLocalStorage() {
    let tasksToDosAsText = JSON.stringify(tasksToDos);
    localStorage.setItem('tasksToDos', tasksToDosAsText);
}


//load from LocalStorage
function loadFromLocalStorage() {
    let tasksToDosAsText = localStorage.getItem('tasksToDos');
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
                <div class="card-details-button-container">
                    <img src="img/arrow-32-24.png" alt="" title="Task Done">
                    <img src="img/x-mark-24.png" alt="" title="Go Back" onclick="closeCardDetails()">
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
           <div class="assignee-email">${collaborator['email']}</div>
       </div>
   </div>
`
}