const modal = document.querySelector('#modal');
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
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
addTaskButton.addEventListener('click', function (event) {
    event.preventDefault();

    const newTask = {
        title: taskTitle.value,
        description: taskDescription.value,
        dueDate: taskDueDate.value
    };

    tasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    renderMessage();

});

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Generate a unique task ID
// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCardDiv = document.createElement("div");
    taskCardDiv.classList.add("card", "border-light", "mb-3");

    const taskCardHeaderDiv = document.createElement("div");
    taskCardHeaderDiv.classList.add("card-header", "bg-white");

    const taskTitleH2 = document.createElement("h2");
    taskTitleH2.classList.add("card-title", "mb-1");
    taskTitleH2.textContent = task.title;

    taskCardHeaderDiv.appendChild(taskTitleH2);

    const taskCardBodyDiv = document.createElement("div");
    taskCardBodyDiv.classList.add("card-body", "bg-light");

    const taskDescriptionP = document.createElement("p");
    taskDescriptionP.classList.add("card-text");
    taskDescriptionP.textContent = task.description;

    const taskDueDateP = document.createElement("p");
    taskDueDateP.classList.add("card-text");
    taskDueDateP.textContent = "Due Date: " + task.dueDate;

    taskCardBodyDiv.appendChild(taskDescriptionP);
    taskCardBodyDiv.appendChild(taskDueDateP);
    taskCardDiv.appendChild(taskCardHeaderDiv);
    taskCardDiv.appendChild(taskCardBodyDiv);

    return taskCardDiv;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    

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
