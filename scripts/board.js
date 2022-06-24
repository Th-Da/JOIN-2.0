let currentDraggedElement; // used for drag and drop
let currentMouseoverId;    // ---------^^-----------
let boardListIds = ['todo-list', 'in-progress-list', 'testing-list', 'done-list'];

async function initBoard() {
    await includeHTML();
    loadTasks();
}

function loadTasks() {
    // if (currentMouseoverId) {
    //     var container = document.getElementById(currentMouseoverId); // used for drag and drop
    //     var status = tasksToDos.filter(t => t['currentStatus'] == currentMouseoverId);
    //     container.innerHTML = ``;
    // } else {
    //     var container = document.getElementById('todo-list');
    //     container.innerHTML = ``;
    //     var status = tasksToDos;
    // }
    // for (let i = 0; i < status.length; i++) {
    //     const task = status[i];
    //     let collaborators = task['collaborators'];
    //     container.innerHTML += createToDoTaskCardHTML(task, i);
    //     insertTodoCollaboratorsToCard(collaborators, i);
    // }
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
    // saveToLocalStorage();
    // loadToLocalStorage();
    setTimeout(loadTasks, 1000);
    console.log(tasksToDos);
}

// HTML snippets

function createToDoTaskCardHTML(task, i) {
    return /*html*/ `
    <div class="task-card" onclick="openCardDetails()" ondragstart="startDragging(${i})" draggable="true" id="${currentMouseoverId}">
       <div class="task-card-headline">${task['title']}</div>
       <span><b>Due Date:</b> ${task['dueDate']}</span>
       <div class="collaborators-container" id="todoCollaborators${i}">
       </div>
   </div>
   `
}