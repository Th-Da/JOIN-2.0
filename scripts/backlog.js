function initBacklog() {
    init();
    loadFromLocalStorage();
    loadTasksToBacklog();
}

function loadTasksToBacklog() {
    emptyBacklog();
    filterTasksByUrgency('High');
    filterTasksByUrgency('Intermediate');
    filterTasksByUrgency('Low');
}

function filterTasksByUrgency(urgency) {
    for (let i = 0; i < tasksToDos.length; i++) {
        const task = tasksToDos[i];
        const collaborators = task['collaborators'];
        if(task['urgency'] === urgency) {
            loadBacklockCard(i, task, collaborators)
        } 
    }
}

function loadBacklockCard(i, task, collaborators) {
    document.getElementById('backlog-cards').innerHTML += createBacklogCardHTML(i, task);
        insertBacklogCardCollaborators(collaborators, i);
        createUrgentBoarder(i, document.getElementById(i))
}

function insertBacklogCardCollaborators(collaborators, i) {
    let container = document.getElementById('backlog-card-img-container'+i)
    for (let i = 0; i < collaborators.length; i++) {
        const collaborator = collaborators[i];
        container.innerHTML += /*html*/ `
        <img src="${collaborator['img']}" alt="">
        `
    }
}

function emptyBacklog() {
    document.getElementById('backlog-cards').innerHTML = '';
}

//snippets
function createBacklogCardHTML(i, task) {
    return /*html*/ `
    <div class="backlog-card" id="${i}"  onclick="openCardDetails(${i})">
       <div class="task-asssignedment">
           <div id="backlog-card-img-container${i}" class="backlog-card-img-container">
           </div>
       </div>
       <div class="task-category">${task['category']}</div>
       <div class="task-description">${task['title']}</div>
   </div> 
`
}