let employees = [];
let loadUsers = [];


// Creates a new task
function createNewTask() { // creat task button
    let titles = document.getElementById('input-field-title').value;
    let dueDates = document.getElementById('input-field-date').value;
    let categorys = document.getElementById('input-field-category').value;
    let descriptions = document.getElementById('input-field-description').value;
    let urgencys = document.getElementById('input-field-urgency').value;
    let date = new Date().toDateString();

    if (titles, categorys, descriptions, urgencys == '') {
        alert('Please fill out all fields');
    } else {

        pushTaskInArray(titles, dueDates, categorys, descriptions, urgencys, date);

        clearInputFields();

        saveToLocalStorage();
    }
}


// clear the input fields
function clearInputFields() {
    document.getElementById('input-field-title').value = '';
    document.getElementById('input-field-date').value = '';
    document.getElementById('input-field-category').value = '';
    document.getElementById('input-field-description').value = '';
    document.getElementById('input-field-urgency').value = '';
}


//push in taskToDos Array
function pushTaskInArray(titles, dueDates, categorys, descriptions, urgencys, date) {
    tasksToDos.push({
        'currentStatus': 'todo-list',
        'title': titles,
        'description': descriptions,
        'dueDate': dueDates,
        'category': categorys,
        'urgency': urgencys,
        'createdDate': date
    });
}


//The input is deleted from the input fields
function cancelTheInput() { //cancel button
    document.getElementById('input-field-title').value = '';
    document.getElementById('input-field-date').value = '';
    document.getElementById('input-field-category').value = '';
    document.getElementById('input-field-description').value = '';
    document.getElementById('input-field-urgency').value = '';
}


// Load users from the api
async function loadUrlUsers() {
    let url = 'https://randomuser.me/api/?results=4';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    loadUsers = responseAsJson; 
}