let currentDraggedElement; // used for drag and drop
let currentMouseoverId;      // ---------^^-----------

async function initBoard() {
    await includeHTML();
    createTodos();
}

function createTodos() {
    if (currentMouseoverId) {
        var container = document.getElementById(currentMouseoverId); // used for drag and drop

    } else {
        var container = document.getElementById('todo-list');
    }
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
        document.getElementById('todoCollaborators' + i).innerHTML += /*html*/ `
                <img src="${collaborator['img']}" alt="">`
    }
}

// drag and drop functions

function startDragging(i) {
    currentDraggedElement = i;
}

function getId(obj) {
    currentMouseoverId = obj.id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo() {
    let taskToPush = tasksToDos[currentDraggedElement];
    tasksInProgress.push(taskToPush);
    tasksToDos.splice(currentDraggedElement, 1);
    setTimeout(createTodos, 1000);
}

// HTML snippets

function createToDoTaskCardHTML(task, i) {
    return /*html*/ `
    <div class="task-card" onclick="openCardDetails()" ondragstart="startDragging(${i})" draggable="true">
       <div class="task-card-headline">${task['title']}</div>
       <span><b>Due Date:</b> ${task['dueDate']}</span>
       <div class="collaborators-container" id="todoCollaborators${i}">
       </div>
   </div>
   `
}