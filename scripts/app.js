// Get references to the "Add Task" button and the input field for new tasks
const taskButton = document.querySelector('#add-task-btn');
const taskField = document.querySelector('#new-task-input');

// --------------------
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
    // addTaskUi(task);          // (Redundant) Adds the task to the UI as a <p> (not needed if using renderTasks)
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
        addTaskUi(task);          // (Redundant) Adds the task to the UI as a <p> (not needed if using renderTasks)
        renderTasks();            // Update the UI to show all tasks
        saveTasks();              // Save the updated tasks array to localStorage
        return;
    } else {
        return; // Do nothing for other keys
    }
});

// --------------------
// The array that holds all active tasks
const newToDo = [];

// --------------------
// Function to add a task to the array
function addTask(task) {
    newToDo.push(task); // Add the new task string to the array
    console.log("Task added"); // Log for debugging
    addTaskUi(task);          // (Redundant) Adds the task to the UI as a <p> (not needed if using renderTasks)
    console.log(newToDo);     // Log the current array for debugging
    return;
}

// --------------------
// Function to add a task to the UI as a <p> element (not used by renderTasks)
// This is redundant if you use renderTasks for all UI updates
function addTaskUi(task){
    const active = document.querySelector('.active-tasks'); // Get the active tasks column
    const taskElement = document.createElement('p');        // Create a new <p> element
    taskElement.textContent = task;                         // Set its text to the task
    active.append(taskElement);                             // Add it to the active tasks column
    console.log("Displaying active tasks");                 // Log for debugging
}

// --------------------
// Function to render all tasks in the active tasks list as <li> elements with checkboxes
function renderTasks() {
    const activeTasksList = document.querySelector('#active-tasks-list'); // Get the <ul> for active tasks
    activeTasksList.innerHTML = ''; // Clear the current list

    // For each task in the array, create a list item with a checkbox and the task text
    newToDo.forEach((task, idx) => {
        const li = document.createElement('li');      // Create a new <li> element
        li.className = 'task-item';                   // Add a class for styling

        // Create a checkbox for marking the task as completed
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.addEventListener('change', function() {
            // Placeholder: Here you can handle marking as completed
            // For example: move to completed tasks array
        });

        // Create a <span> to hold the task text
        const span = document.createElement('span');
        span.textContent = task;

        // Add the checkbox and text to the list item
        li.append(checkbox);
        li.append(span);

        // Add the list item to the active tasks list in the DOM
        activeTasksList.append(li);
    });
}



