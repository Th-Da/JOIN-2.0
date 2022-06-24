let currentDraggedElement; // used for drag and drop
let currentMouseoverId;    // ---------^^-----------
let boardListIds = ['todo-list', 'in-progress-list', 'testing-list', 'done-list']; //used to empty boards

async function initBoard() {
    await includeHTML();
    loadFromLocalStorage();
    loadTasks();
}

function loadTasks() {
    emptyBoardLists();
    for (let i = 0; i < tasksToDos.length; i++) {
        const task = tasksToDos[i];
        let container = document.getElementById(task['currentStatus']);
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

function emptyBoardLists() {
    for (let i = 0; i < boardListIds.length; i++) {
        const id = boardListIds[i];
        document.getElementById(id).innerHTML = '';
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
    tasksToDos[currentDraggedElement]['currentStatus'] = currentMouseoverId;
    saveToLocalStorage();
    loadFromLocalStorage();
    setTimeout(loadTasks, 0);
    console.log(tasksToDos);
}

// HTML snippets

function createToDoTaskCardHTML(task, i) {
    return /*html*/ `
    <div class="task-card" onclick="openCardDetails()" ondragstart="startDragging(${i})" draggable="true" id="${task['id']}">
       <div class="task-card-headline">${task['title']}</div>
       <span><b>Due Date:</b> ${task['dueDate']}</span>
       <div class="collaborators-container" id="todoCollaborators${i}">
       </div>
   </div>
   `
}