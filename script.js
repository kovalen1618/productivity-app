function createCountdown(countdownElement, startingMinutes) {
    let time = startingMinutes * 60;

    const interval = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        countdownElement.innerHTML = `${hours}:${minutes}:${seconds}`;
        time--;

        // Placeholder to stop intervalf from running after it hits 0
        if (time < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = 'Expired'
        }
    }
}

// Display all tasks from the json-server
const taskContainer = document.querySelector('.task-container')

// Function to retrieve all tasks from the server and display them in the task container
async function displayTasks() {
    // GET request
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();

    // Create new element for each task
    for (const task of tasks) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.setAttribute('data-id', task.id);

        // Title
        const titleElement = document.createElement('h3');
        titleElement.classList.add('title');
        titleElement.textContent = task.title;
        taskElement.appendChild(titleElement);

        // Timer
        const countdownElement = document.createElement('p');
        countdownElement.classList.add('countdown');
        taskElement.appendChild(countdownElement);

        createCountdown(countdownElement, task.time);

        // Options
        const optionsElement = document.createElement('div');
        optionsElement.classList.add('options');
        taskElement.appendChild(optionsElement);
        // Delete
        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.classList.add('delete');
        deleteTaskButton.textContent = 'DELETE';
        optionsElement.appendChild(deleteTaskButton);
        // DELETE Data
        deleteTaskButton.addEventListener('click', (e) => {
            e.preventDefault();

            deleteTask(task.id);
        })

        // Container
        taskContainer.appendChild(taskElement);
    }
}

// Function for successfully sending DELETE request
async function deleteTask(id) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        // If the request was successful, remove the task from the DOM
        const taskElement = document.querySelector(`.task[data-id="${id}"]`);
        taskElement.remove();
    } else {
        console.error('Error deleting task');
    }
}


// Requests
// GET Data
fetch('./data/db.json')
    .then(response => response.json())
    .then(data => {
        displayTasks();
    })

// POST Data
const addTaskButton = document.querySelector('.add-task');

addTaskButton.addEventListener('click', (e) => {
    // Stop the page from reloading when the button is clicked so that the task is dynamically added
    e.preventDefault();

    // TODO: Ask user for input

    // Define the data for the new task
    const data = {
        title: "New task",
        time: 120
    };

    // Send a POST request to add the new task at the URL of the json-server
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
})