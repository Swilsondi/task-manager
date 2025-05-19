// --- DOM ELEMENT REFERENCES ---
// Get references to the "Add Task" button and the input field for new tasks
const taskButton = document.querySelector('#add-task-btn'); // Button to add a new task
const taskField = document.querySelector('#new-task-input'); // Input field for entering a new task

// --- DATA ARRAYS ---
// The array that holds all active tasks
const newToDo = [];
// The array that holds all completed tasks
const completedTasks = [];
// This array holds deleted tasks
const deletedTasks = [];
// Reference to the deleted tasks list in the DOM (not always needed, see recoverDeleted)
const deletedList = document.querySelector('#deleted-tasks-list');

// --- LOCAL STORAGE FUNCTIONS ---
// Load tasks from localStorage on page load
function loadTasks() {
    // Retrieve the 'tasks' array from localStorage and parse it from JSON
    const saved = JSON.parse(localStorage.getItem('tasks'));
    // If the saved data is an array, update the newToDo array with its contents
    if (Array.isArray(saved)) {
        newToDo.length = 0;      // Clear the current array (preserves reference)
        newToDo.push(...saved);  // Add all saved tasks to the array
    }

    const completed = JSON.parse(localStorage.getItem('completedTasks'));
    if (Array.isArray(completed)) {
        completedTasks.length = 0;
        completedTasks.push(...completed);
    }

    const deleted = JSON.parse(localStorage.getItem('deletedTasks'));
    if (Array.isArray(deleted)) {
        deletedTasks.length = 0;
        deletedTasks.push(...deleted);
    }

    renderTasks();
    recoverDeleted();
    // Add a call to render completed tasks if you have a function for it
    completedTasks.forEach(completedTaskRenderUi);
}

// Save tasks to localStorage
function saveTasks() {
    // Convert the newToDo array to a JSON string and store it in localStorage
    localStorage.setItem('tasks', JSON.stringify(newToDo));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
}

// --- EVENT LISTENERS ---
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

// --- CORE LOGIC FUNCTIONS ---
// Function to add a task to the array
function addTask(task) {
    newToDo.push(task); // Add the new task string to the array
    console.log("Task added"); // Log for debugging
    renderTasks(); 
    console.log(newToDo);     // Log the current array for debugging
    return;
}

// Function to render all tasks in the active tasks list as <li> elements with action buttons
function renderTasks() {
    const activeTasksList = document.querySelector('#active-tasks-list');
    activeTasksList.innerHTML = ''; // Clear the current list

    newToDo.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        // Font Awesome checkmark button for completion
        const completeBtn = document.createElement('button');
        completeBtn.className = 'task-btn complete-btn';
        completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        completeBtn.title = 'Mark as completed';
        completeBtn.addEventListener('click', function() {
            newToDo.splice(idx, 1); // Remove from active tasks
            saveTasks();
            renderTasks();
            completedTasks.push(task); // Add to completed tasks array
            completedTaskRenderUi(task); // Render in completed column
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
            newToDo.splice(idx, 1); // Remove from active tasks
            saveTasks();
            renderTasks();
            deletedTasks.push(task); // Add to deleted tasks array
            recoverDeleted(); // Render in deleted column
            console.log(`Your deleted task array is: ${deletedTasks}`);
        });

        // Add elements to the list item
        li.append(completeBtn, span, deleteBtn);
        activeTasksList.append(li);
    });
}

// Function to render a completed task in the completed tasks list
function completedTaskRenderUi(task) {
    const completed = document.querySelector("#completed-tasks-list");
    const li = document.createElement('li');
    li.className = 'task-item completed';
    const span = document.createElement('span');
    span.textContent = task;
    li.append(span);
    completed.append(li);
}

// Function to render deleted tasks and allow recovery
function recoverDeleted() {
    const deletedTasksList = document.querySelector('#deleted-tasks-list');
    deletedTasksList.innerHTML = ''; // Clear the deleted tasks list UI

    deletedTasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item-deleted';

        // Font Awesome checkmark button for recovery
        const recoverButton = document.createElement('button');
        recoverButton.className = 'task-btn recover-btn';
        recoverButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        recoverButton.title = 'Recover deleted task';

        // When clicked, move task back to active, update arrays and UI
        recoverButton.addEventListener('click', function() {
            newToDo.push(task); // Add back to active tasks
            deletedTasks.splice(idx, 1); // Remove from deleted tasks
            saveTasks();
            renderTasks();
            recoverDeleted(); // Re-render deleted tasks list
            console.log(`Task added back to active tasks`);
        });

        // Task text
        const span = document.createElement('span');
        span.textContent = task;

        li.append(recoverButton, span);
        deletedTasksList.append(li);
    });
}

// Initial load of tasks from localStorage
loadTasks();
