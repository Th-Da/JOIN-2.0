let tasksToDos = [
    {
        'id':'0',
        'currentStatus': 'todo-list', 
        'title': 'Wäsche waschen',
        'urgency': 'Urgent',
        'category': 'Management',
        'createdDate': '19.03.2022',
        'dueDate': '22.08.22',
        'description': 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae odio minima, culpa ea?',
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
        'id':'1',
        'currentStatus': 'todo-list', 
        'title': 'Auto Kaufen',
        'urgency': 'Medium',
        'category': 'Sales',
        'createdDate': '1.02.2022',
        'dueDate': '2.09.22',
        'description': 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae odio minima, culpa ea?',
        'collaborators': [
            {
                'name': 'Tobias Fernkorn',
                'email': 'bieberbutzemann@fake.com',
                'img': "img/Profile-Pic-Tobi.PNG"
            },
        ],
    },
    {
        'id':'2',
        'currentStatus': 'todo-list', 
        'title': 'Pizza Essen',
        'urgency': 'Urgent',
        'category': 'Ich',
        'createdDate': '29.04.2022',
        'dueDate': '23.11.22',
        'description': 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae odio minima, culpa ea?',
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
        'id':'3',
        'currentStatus': 'in-progress-list', 
        'title': 'Kuh Föhnen',
        'urgency': 'Urgent',
        'category': 'Management',
        'createdDate': '19.03.2022',
        'dueDate': '22.08.22',
        'description': 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae odio minima, culpa ea?',
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

}

// stops event propagation
function stopPropagation(event) {
    event.stopPropagation();
}

// Fades objekts in with removing d-none and adds opacity transition
function openCardDetails() {
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

//save to LocalStorage
function saveToLocalStorage() {
    let tasksToDosAsText = JSON.stringify(tasksToDos);
    localStorage.setItem('tasksToDos', tasksToDosAsText);
}


//load to LocalStorage
function loadToLocalStorage() {
    let tasksToDosAsText = localStorage.getItem('tasksToDos');
    if (tasksToDos) {
        tasksToDos = JSON.parse(tasksToDosAsText);
    }
}