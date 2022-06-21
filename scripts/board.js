let tasksToDos = [
    {
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
]

async function initBoard() {
    await includeHTML();
    createTodos();
}

function createTodos() {
    let container = document.getElementById('todo-list');
    for (let i = 0; i < tasksToDos.length; i++) {
        const task = tasksToDos[i];
        let collaborators = task['collaborators'];
        container.innerHTML += createToDoTaskCardHTML(task, i);
       insertTodoCollaboratorsToCard(collaborators, i);
    }
}

function insertTodoCollaboratorsToCard(collaborators, i) {
    for (let y = 0; y < collaborators.length; y++) {
        const collaborator = collaborators[y];
        document.getElementById('todoCollaborators'+ i).innerHTML += /*html*/ `
                <img src="${collaborator['img']}" alt="">`
    }
}

// HTML snippets

function createToDoTaskCardHTML(task, i) {
    return /*html*/ `
    <div class="task-card"  onclick="openCardDetails()">
       <div class="task-card-headline">${task['title']}</div>
       <span><b>Due Date:</b> ${task['dueDate']}</span>
       <div class="collaborators-container" id="todoCollaborators${i}">
       </div>
   </div>
   `
}