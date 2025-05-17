const taskButton = document.querySelector('#add-task-btn');
const taskField = document.querySelector('#new-task-input');
 const task = taskField.value; // Define 'task' using the input field value


// Load tasks from localStorage on page load
function loadTasks() {
    const saved = JSON.parse(localStorage.getItem('tasks'));
    if (Array.isArray(saved)) {
        newToDo = saved;
    }
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(newToDo));
}

taskButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the button from reloading the page
    addTask(taskField.value);
    taskField.value = "";
    console.log("Click happened");
    addTaskUi(task);
    renderTasks();
    return;
});

taskField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter'){
    addTask(taskField.value);
    taskField.value = "";  
    console.log("Press event happened");
    addTaskUi(task);
    renderTasks();
    return;
    } else {
        return;
    }
});


const newToDo = [];
function addTask(task) {
    newToDo.push(task); //Need to add task to a array.
    console.log("Task added");
    addTaskUi(task);
    console.log(newToDo);
    return;
}

function addTaskUi(task){
    const active = document.querySelector('.active-tasks');
    const taskElement = document.createElement('p');
    taskElement.textContent = task;
    active.append(taskElement);
    console.log("Displaying active tasks");
}
// TODO: Understand this 
function renderTasks() {
    const activeTasksList = document.querySelector('#active-tasks-list');
    activeTasksList.innerHTML = '';
    newToDo.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.addEventListener('change', function() {
            // Here you can handle marking as completed
            // For example: move to completed tasks array
        });

        // Task text
        const span = document.createElement('span');
        span.textContent = task;

        li.append(checkbox);
        li.append(span);
        activeTasksList.append(li);
    });
}



