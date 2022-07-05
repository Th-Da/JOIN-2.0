/**
 * initial load function
 */
async function initBacklog() {
    await includeHTML();
    await downloadFromServer();
    loadFromLocalStorage();
    loadTasksToBacklog();
}


/**
 * load tasks to backlog
 */
function loadTasksToBacklog() {
    emptyBacklog();
    filterTasksByUrgency('High');
    filterTasksByUrgency('Intermediate');
    filterTasksByUrgency('Low');
    filterTaskByStatudDone();
}


/**
 * load tasks by urgency
 * 
 * @param {string} urgency 
 */
function filterTasksByUrgency(urgency) {
    for (let i = 0; i < tasksToDos.length; i++) {
        const task = tasksToDos[i];
        const collaborators = task['collaborators'];
        if(task['urgency'] === urgency && task['currentStatus'] !== 'done-list') {
            loadBacklockCard(i, task, collaborators)
        } 
    }
}


/**
 * load task that are done 
 */
function filterTaskByStatudDone() {
    for (let i = 0; i < tasksToDos.length; i++) {
        const task = tasksToDos[i];
        const collaborators = task['collaborators'];
        if(task['currentStatus'] === 'done-list') {
            loadBacklockCard(i, task, collaborators)
        } 
    }
}


/**
 * creates backlog card
 * 
 * @param {number} i 
 * @param {Element} task 
 * @param {Array} collaborators 
 */
function loadBacklockCard(i, task, collaborators) {
    document.getElementById('backlog-cards').innerHTML += createBacklogCardHTML(i, task);
        insertBacklogCardCollaborators(collaborators, i);
        createUrgentBoarder(i, document.getElementById(i))
}


/**
 * insert collaborators to backlog card
 * 
 * @param {array} collaborators 
 * @param {number} i 
 */
function insertBacklogCardCollaborators(collaborators, i) {
    let container = document.getElementById('backlog-card-img-container'+i)
    for (let i = 0; i < collaborators.length; i++) {
        const collaborator = collaborators[i];
        container.innerHTML += /*html*/ `
        <img src="${collaborator['img']}" alt="">
        `
    }
}


/**
 * emptys backlog before loading new cards
 */
function emptyBacklog() {
    document.getElementById('backlog-cards').innerHTML = '';
}

//HTML snippets

/**
 * returns html code for creating backlog card
 * 
 * @param {number} i 
 * @param {Element} task 
 * @returns html code for creating backlog card
 */
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