// Creates a new task
function createNewTask() {
    let titles = document.getElementById('input-field-title').value;
    let dueDates = document.getElementById('input-field-date').value;
    let categorys = document.getElementById('input-field-category').value;
    let descriptions = document.getElementById('input-field-description').value;
    let urgencys = document.getElementById('input-field-urgency').value;
    let date = new Date().toDateString();

    tasksToDos[3]['title'].push(titles);
    tasksToDos[3]['description'].push(descriptions);
    tasksToDos[3]['dueDate'].push(dueDates);
    tasksToDos[3]['category'].push(categorys);
    tasksToDos[3]['urgency'].push(urgencys);
    tasksToDos[3]['createdDate'].push(date);

    document.getElementById('input-field-title').value = '';
    document.getElementById('input-field-date').value = '';
    document.getElementById('input-field-category').value = '';
    document.getElementById('input-field-description').value = '';
    document.getElementById('input-field-urgency').value = '';
}


//The input is deleted from the input fields
function cancelTheInput() {
    document.getElementById('input-field-title').value = '';
    document.getElementById('input-field-date').value = '';
    document.getElementById('input-field-category').value = '';
    document.getElementById('input-field-description').value = '';
    document.getElementById('input-field-urgency').value = '';
}