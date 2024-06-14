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

// Retrieve tasks and nextId from localStorage
let todoList = JSON.parse(localStorage.getItem("tasks")) && [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Generate a unique task ID
function generateTaskId() {
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextID));
}



// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('task-card');

    const today = dayjs();
    const dueDate = dayjs(task.deadline);
    if (dueDate.isAfter(today, 'day')) {
        taskCard.addClass('overdue');
    } else if (dueDate.diff(today, 'day') <= 1) {
        taskCard.addClass('almost-due');
    }
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('task-card');

    const today = dayjs();
    const dueDate = dayjs(task.deadline);
    if (dueDate.isAfter(today, 'day')) {
        taskCard.addClass('overdue');
    } else if (dueDate.diff(today, 'day') <= 1) {
        taskCard.addClass('almost-due');
    }
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('task-card');

    const today = dayjs();
    const dueDate = dayjs(task.deadline);
    if (dueDate.isAfter(today, 'day')) {
        taskCard.addClass('overdue');
    } else if (dueDate.diff(today, 'day') <= 1) {
        taskCard.addClass('almost-due');
    }
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('task-card');

    const today = dayjs();
    const dueDate = dayjs(task.deadline);
    if (dueDate.isAfter(today, 'day')) {
        taskCard.addClass('overdue');
    } else if (dueDate.diff(today, 'day') <= 1) {
        taskCard.addClass('almost-due');
    }
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('task-card');

    const today = dayjs();
    const dueDate = dayjs(task.deadline);
    if (dueDate.isAfter(today, 'day')) {
        taskCard.addClass('overdue');
    } else if (dueDate.diff(today, 'day') <= 1) {
        taskCard.addClass('almost-due');
    }
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('task-card');

    const today = dayjs();
    const dueDate = dayjs(task.deadline);
    if (dueDate.isAfter(today, 'day')) {
        taskCard.addClass('overdue');
    } else if (dueDate.diff(today, 'day') <= 1) {
        taskCard.addClass('almost-due');
    }
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('task-card');

    const today = dayjs();
    const dueDate = dayjs(task.deadline);
    if (dueDate.isAfter(today, 'day')) {
        taskCard.addClass('overdue');
    } else if (dueDate.diff(today, 'day') <= 1) {
        taskCard.addClass('almost-due');
    }
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('task-card');

    const today = dayjs();
    const dueDate = dayjs(task.deadline);
    if (dueDate.isAfter(today, 'day')) {
        taskCard.addClass('overdue');
    } else if (dueDate.diff(today, 'day') <= 1) {
        taskCard.addClass('almost-due');
    }
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('task-card');

    const today = dayjs();
    const dueDate = dayjs(task.deadline);
    if (dueDate.isAfter(today, 'day')) {
        taskCard.addClass('overdue');
    } else if (dueDate.diff(today, 'day') <= 1) {
        taskCard.addClass('almost-due');
    }
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('task-card');

    const today = dayjs();
    const dueDate = dayjs(task.deadline);
    if (dueDate.isAfter(today, 'day')) {
        taskCard.addClass('overdue');
    } else if (dueDate.diff(today, 'day') <= 1) {
        taskCard.addClass('almost-due');
    }
function createTaskCard(task) {
    const taskCard = $('<div>').addClass('task-card');

    const today = dayjs();
    const dueDate = dayjs(task.deadline);
    if (dueDate.isAfter(today, 'day')) {
        taskCard.addClass('overdue');
    } else if (dueDate.diff(today, 'day') <= 1) {
        taskCard.addClass('almost-due');
    }
    //elements with task details
    const taskCardTitle = $('<h3>').text(todo.task);
    const DueDateElement = $('<p>').text(`Deadline: ${task.dueDate}`);
    const description = $('<p>').text(task.description);

 taskCard.append (taskCardTitle, DueDateElement, description);

 $('#to-do').append(taskCard);


    function renderTaskList() {
        taskList.forEach(task => {
            createTaskCard(task);
   
        });
    }
    
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