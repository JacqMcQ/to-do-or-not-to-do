
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Generate a unique task ID
function generateTaskId() {
  // Get the current timestamp
  var timestamp = new Date().getTime();

  // Get the current task ID counter from localStorage
  var nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

  // Increment the task ID counter
  nextId++;

  // Save the updated task ID counter to localStorage
  localStorage.setItem("nextId", JSON.stringify(nextId));

  // Return the unique task ID as a string
  return "task-" + timestamp + "-" + nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {

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
