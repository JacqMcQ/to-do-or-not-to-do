const modal = document.querySelector('#formModal');
const openModal = document.querySelector('.btn-success');
const closeModal = document.querySelector('.btn-close');

openModal.addEventListener('click', () => {
    modal.showModal();
})
closeModal.addEventListener('click', () => {
modal.close();
})

// setting up variables:
const taskTitle = document.querySelector('#taskTitle');
const taskDescription = document.querySelector('#taskDescription');
const taskDueDate = document.querySelector('#taskDueDate');
const addTaskButton = document.querySelector('#submitTaskBtn');

//event listener for submit:

// Retrieve tasks and nextId from localStorage
let todoList = JSON.parse(localStorage.getItem("tasks")) && [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Generate a unique task ID
function generateTaskId() {
    nextId++;
}


$(document).ready(function () {
    // Retrieve tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to create a task card
    function createTaskCard(task) {
        const taskCard = $('<div>').addClass('task-card');

        const today = dayjs();
        const dueDate = dayjs(task.dueDate);
        if (dueDate.isAfter(today, 'day')) {
            taskCard.addClass('overdue');
        } else if (dueDate.diff(today, 'day') <= 1) {
            taskCard.addClass('almost-due');
        }

        // Create elements for task details
        const titleElement = $('<h3>').text(task.title);
        const deadlineElement = $('<p>').text(`Deadline: ${task.dueDate}`);
        const descriptionElement = $('<p>').text(task.description);

        // Append elements to task card
        taskCard.append(titleElement, deadlineElement, descriptionElement);

        return taskCard;
    }

    // Function to render tasks
    function renderTasks() {
        // Clear existing tasks
        $('#todo-cards').empty();
        $('#in-progress-cards').empty();
        $('#done-cards').empty();

        // Iterate over tasks and create cards
        tasks.forEach(function (task) {
            const taskCard = createTaskCard(task);

            // Append task card to the appropriate lane
            if (task.status === 'to-do') {
                $('#todo-cards').append(taskCard);
            } else if (task.status === 'in-progress') {
                $('#in-progress-cards').append(taskCard);
            } else if (task.status === 'done') {
                $('#done-cards').append(taskCard);
            }
        });
    }

    // Call renderTasks when the page loads
    renderTasks();
});

// Create a function to render the task list and make cards draggable
function renderTaskList() {
    $('#to-do').empty(); // Clear existing tasks before rendering
    todoList.forEach(task => {
        const taskCard = createTaskCard(task);
        $('#to-do').append(taskCard);
    });
}

// Add event listener for form submission
addTaskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const newTask = {
        id: generateTaskId(),
        title: taskTitle.value,
        description: taskDescription.value,
        deadline: taskDueDate.value,
        status: 'to-do'
    };

    todoList.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(todoList));
    localStorage.setItem('nextId', JSON.stringify(nextId));

    renderTaskList();
    modal.close();
});

// Call renderTaskList to display existing tasks when the page loads
$(document).ready(function() {
    renderTaskList();
});    
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
event.preventDefault();
let title =$('#taskTitle').val();
let description = $('#taskDescription').val();
let d = $('#taskDueDate').val();
    
let neTask = {
    id: generateTaskId(),
    title: title,
    deadline: deadline,
    description: description,
    status: 'to-do'
};
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});