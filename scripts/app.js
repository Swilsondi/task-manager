// Get references to the "Add Task" button and the input field for new tasks
const taskButton = document.querySelector('#add-task-btn');
const taskField = document.querySelector('#new-task-input'); 
// The array that holds all active tasks
const newToDo = [];
// The array that holds all completed tasks
const completedTasks = [];
// This array holds deleted tasks
const deletedTasks = [];
const deletedList = document.querySelector('#deleted-tasks-list');


// Load tasks from localStorage on page load
function loadTasks() {
    // Retrieve the 'tasks' array from localStorage and parse it from JSON
    const saved = JSON.parse(localStorage.getItem('tasks'));
    // If the saved data is an array, update the newToDo array with its contents
    if (Array.isArray(saved)) {
        newToDo.length = 0;      // Clear the current array (preserves reference)
        newToDo.push(...saved);  // Add all saved tasks to the array
    }
    renderTasks(); // Update the UI to show the loaded tasks
}

// --------------------
// Save tasks to localStorage
function saveTasks() {
    // Convert the newToDo array to a JSON string and store it in localStorage
    localStorage.setItem('tasks', JSON.stringify(newToDo));
}

// --------------------
// Event listener for the "Add Task" button click
taskButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission or page reload
    addTask(taskField.value); // Add the task from the input field to the array
    taskField.value = "";     // Clear the input field
    console.log("Click happened"); // Log for debugging
    renderTasks();            // Update the UI to show all tasks
    saveTasks();              // Save the updated tasks array to localStorage
    return;                   // End the function
});

// --------------------
// Event listener for pressing "Enter" in the input field
taskField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter'){
        e.preventDefault();       // Prevent form submission or page reload
        addTask(taskField.value); // Add the task from the input field to the array
        taskField.value = "";     // Clear the input field
        console.log("Press event happened"); // Log for debugging
        renderTasks();            // Update the UI to show all tasks
        saveTasks();              // Save the updated tasks array to localStorage
        return;
    } else {
        return; // Do nothing for other keys
    }
});

// --------------------
// Function to add a task to the array
function addTask(task) {
    newToDo.push(task); // Add the new task string to the array
    console.log("Task added"); // Log for debugging
    renderTasks(); 
    console.log(newToDo);     // Log the current array for debugging
    return;
}

// --------------------
// Function to render all tasks in the active tasks list as <li> elements with checkboxes
function renderTasks() {
    const activeTasksList = document.querySelector('#active-tasks-list');
    activeTasksList.innerHTML = '';

    newToDo.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        // Font Awesome checkmark button for completion
        const completeBtn = document.createElement('button');
        completeBtn.className = 'task-btn complete-btn';
        completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        completeBtn.title = 'Mark as completed';
        completeBtn.addEventListener('click', function() {
            newToDo.splice(idx, 1);
            saveTasks();
            renderTasks();
            completedTasks.push(task);
            completedTaskRenderUi(task);
        });

        // Task text
        const span = document.createElement('span');
        span.textContent = task;

        // Delete button (Font Awesome trash can)
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-btn delete-btn';
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.title = 'Delete task';
        deleteBtn.addEventListener('click', function() {
            newToDo.splice(idx, 1);
            saveTasks();
            renderTasks();
            deletedTasks.push(task);
            deletedTasksRenderUi(task);
            console.log(deletedTasks);
            recoverDeleted(task);

        });

        // Add elements to the list item
        li.append(completeBtn, span, deleteBtn);
        activeTasksList.append(li);
    });
}

function completedTaskRenderUi(task) {
    const completed = document.querySelector("#completed-tasks-list");
    const li = document.createElement('li');
    li.className = 'task-item completed';
    const span = document.createElement('span');
    span.textContent = task;
    li.append(span);
    completed.append(li);
}

function deletedTasksRenderUi(task) {
    const li = document.createElement('li');
    li.className = 'task-item-deleted';
    const span = document.createElement('span');
    span.textContent = task;
    li.append(span);
    deletedList.append(li);
}

function recoverDeleted(task){
    //take the deleted task and place it back in the active list
    const recoverButton =  document.createElement('button');
    
}
