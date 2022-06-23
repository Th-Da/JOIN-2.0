let tasksToDos = [
    {
        'currentStatus': 'ToDo', 
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
        'currentStatus': 'ToDo', 
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
        'currentStatus': 'ToDo', 
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
];

let tasksInProgress = [];

let tasksTesting = [];

let tasksDone = [];

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