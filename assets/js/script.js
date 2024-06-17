
// Retrieve tasks and nextId from localStorage
let todoList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Generate a unique task ID
function generateTaskId() {
    let id = nextId;
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return id;
}

function createTaskCard(task) {
    const taskCard = $('<div>').addClass('card draggable').attr('data-id', task.id);

    // Check if task status is not 'done'
    if (task.status !== 'done') {
        const today = dayjs();
        const dueDate = dayjs(task.deadline);

        // Add 'overdue' class if task is overdue
        if (dueDate.isBefore(today, 'day')) {
            taskCard.addClass('overdue');
        }
        // Add 'almost-due' class if task is almost due
        else if (dueDate.diff(today, 'day') <= 1) {
            taskCard.addClass('almost-due');
        }
    }

    // Create elements for task details
    const titleElement = $('<h3>').text(task.title);
    const deadlineElement = $('<p>').text(`Deadline: ${task.deadline}`);
    const descriptionElement = $('<p>').text(task.description);

    // Delete button
    const deleteButton = $('<button>').addClass('delete-btn').text('Delete');
    deleteButton.on('click', function () {
        deleteTask(task.id); // Call deleteTask function with task id
    });

    // Append elements to task card
    taskCard.append(titleElement, deadlineElement, descriptionElement, deleteButton);

    return taskCard;
}
// Function to render the task list
function renderTaskList() {
    $('#todo-cards, #in-progress-cards, #done-cards').empty();

    todoList.forEach(task => {
        const taskCard = createTaskCard(task);
        $(`#${task.status}-cards`).append(taskCard); // Append to the correct lane
    });
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
            // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });

}

function handleDrop(event, ui) {
    const tasks = todoList;
    const taskId = ui.draggable[0].dataset.id;


    // ? Get the id of the lane that the card was dropped into
    const newStatus = event.target.id;

    console.log("tasks =" + tasks);
    for (let task of tasks) {
        // ? Find the project card by the `id` and update the project status.
        if (task.id == taskId) {
            task.status = newStatus;

        }
    }
    // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
    localStorage.setItem('tasks', JSON.stringify(todoList));
    renderTaskList();
}

function handleNewTask(event) {
    event.preventDefault();
    const newTask = {
        id: generateTaskId(),
        title: $('#taskTitle').val(),
        description: $('#taskDescription').val(),
        deadline: $('#taskDueDate').val(),
        status: 'todo'
    };

    todoList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(todoList));
    renderTaskList();

    $('#addTaskForm')[0].reset();
    $('#formModal').modal('hide');
}
function deleteTask(taskId) {
    todoList = todoList.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(todoList));
    renderTaskList();
}


// ? Add event listener to the form element, listen for a submit event, and call the `handleProjectFormSubmit` function.
$('#formModal').on('submit', handleNewTask);

// TODO: Add an event listener to listen for the delete buttons. Use event delegation to call the `handleDeleteProject` function.
$('.delete-btn').on('click', deleteTask);

// ? When the document is ready, print the project data to the screen and make the lanes droppable. Also, initialize the date picker.
$(document).ready(function () {
    // ? Print project data to the screen on page load if there is any
    renderTaskList();

    // ? Make lanes droppable
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });

});
