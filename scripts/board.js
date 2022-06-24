let currentDraggedElement; // used for drag and drop
let currentMouseoverId;    // ---------^^-----------

async function initBoard() {
    await includeHTML();
    createTodos();
}

function createTodos() {
    if (currentMouseoverId) {
        var container = document.getElementById(currentMouseoverId); // used for drag and drop
        var status = tasksToDos.filter(t => t['currentStatus'] == currentMouseoverId);
        container.innerHTML = ``;
    } else {
        var container = document.getElementById('todo-list');
        container.innerHTML = ``;
        var status = tasksToDos;
    }
    for (let i = 0; i < status.length; i++) {
        const task = status[i];
        let collaborators = task['collaborators'];
        container.innerHTML += createToDoTaskCardHTML(task, i);
        insertTodoCollaboratorsToCard(collaborators, i, status);
    }
}

function insertTodoCollaboratorsToCard(collaborators, i, status) {
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
    tasksToDos[currentDraggedElement]['currentStatus'] = currentMouseoverId;
    saveToLocalStorage();
    loadToLocalStorage();
    setTimeout(createTodos, 1000);
    
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