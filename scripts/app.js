const taskButton = document.querySelector('#add-task-btn');
const taskField = document.querySelector('#new-task-input');


const newToDo = [];

function addTask(task) {
    newToDo.push(task); //Need to add task to a array.
    console.log("Task added");
    console.log(newToDo);
    return;
}

taskButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the button from reloading the page
    addTask(taskField.value);
    taskField.value = "";
    console.log("Click happened");
    return;
});

taskField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter'){
    addTask(taskField.value);
    taskField.value = "";  
    console.log("Press event happened");
        return;
    } else {
        return;
    }
});

