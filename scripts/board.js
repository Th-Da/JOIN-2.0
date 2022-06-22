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