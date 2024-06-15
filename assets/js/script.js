
// Retrieve tasks and nextId from localStorage
let todoList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Generate a unique task ID
function generateTaskId() {
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return nextId++;
}
    // Function to create a task card
    function createTaskCard(task) {
        const taskCard = $('<div>').addClass('task-card');

        const today = dayjs();
        const dueDate = dayjs(task.deadline);

        if (dueDate.isBefore(today, 'day')) {
            taskCard.addClass('overdue');
        } else if (dueDate.diff(today, 'day') <= 1) {
            taskCard.addClass('almost-due');
        }
        // Create elements for task details
        const titleElement = $('<h3>').text(task.title);
        const deadlineElement = $('<p>').text(`Deadline: ${task.deadline}`);
        const descriptionElement = $('<p>').text(task.description);

        const deleteButton = $('<button>').addClass('delete-btn').text('Delete');
        deleteButton.on('click', function() {
            deleteTask(task.id); // Call deleteTask function with task id
        });

        // Append elements to task card
        taskCard.append(titleElement, deadlineElement, descriptionElement,deleteButton);

        return taskCard;
    }
// Create a function to render the task list and make cards draggable
function renderTaskList() {
    const latestTask = todoList[todoList.length - 1]; // Get the latest added task

    if (latestTask) {
        const taskCard = createTaskCard(latestTask);
        $(`#${latestTask.status}-cards`).append(taskCard); // Append to the correct lane
    }

    // Make task cards draggable
    $('.task-card').draggable({
        revert: 'invalid',
        helper: 'clone',
        zIndex: 100
    });
}
    
    function renderTaskList() {
        // Clear existing tasks before rendering
        $('#todo-cards').empty();
        $('#in-progress-cards').empty();
        $('#done-cards').empty();

        // Iterate over tasks and create cards
        todoList.forEach(task => {
            const taskCard = createTaskCard(task);

            // Append task card to the appropriate lane
            if (task.status === 'todo') {
                $('#todo-cards').append(taskCard);
            } else if (task.status === 'in-progress-cards') {
                $('#in-progress-cards').append(taskCard);
            } else if (task.status === 'done-cards') {
                $('#done-cards').append(taskCard);
            }
        });

        // Make task cards draggable
        $('.task-card').draggable({
            revert: 'invalid',
            helper: 'clone',
            zIndex: 100
        });
    }

    // Initialize Sortable and Droppable for lanes
    $(document).ready(function() {
    $('.connectedSortable').sortable({
        connectWith: '.connectedSortable',
        placeholder: 'task-placeholder',
        start: function(event, ui) {
            ui.item.toggleClass('dragging');
        },
        stop: function(event, ui) {
            ui.item.toggleClass('dragging');
            // Update task status or perform other actions here
        }
    }).disableSelection();
});
    
    $('#addTaskForm').on('submit', function (event) {
        event.preventDefault();
    
        const newTask = {
            id: generateTaskId(),
            title: $('#taskTitle').val(),
            description: $('#taskDescription').val(),
            deadline: $('#taskDueDate').val(),
            status: 'to-do' 
        };
    
        todoList.push(newTask);
    
        localStorage.setItem('tasks', JSON.stringify(todoList));
        localStorage.setItem('nextId', JSON.stringify(nextId));
    
        renderTaskList(); 


    $('#addTaskForm')[0].reset(); // Reset form fields
});

// Initial rendering of existing tasks
    renderTaskList();

    // Add event listener for form submission
    function handleAddTask(event) {
        event.preventDefault(); // Prevent form submission
    
        // Get form values
        const taskTitle = $('#taskTitle').val();
        const taskDescription = $('#taskDescription').val();
        const taskDueDate = $('#taskDueDate').val();
    
        // Validate form values (optional)
        if (!taskTitle || !taskDueDate) {
            alert('Please fill out all required fields.');
            return;
        }
    
        // Create new task object
        const newTask = {
            id: generateTaskId(), // Assuming you have a function to generate unique IDs
            title: taskTitle,
            description: taskDescription,
            deadline: taskDueDate,
            status: 'to-do' // Initial status
        };
    
        // Add new task to todoList
        todoList.push(newTask);
    
        // Optionally, update localStorage
        localStorage.setItem('tasks', JSON.stringify(todoList));
    
        // Update UI
        renderTaskList();
    
        // Reset form fields
        $('#addTaskForm')[0].reset();
    
        // Close the modal
        $('#formModal').modal('hide');
    }
    
    // Add event listener to the form for submission
    $('#addTaskForm').on('submit', handleAddTask);
    
    // Add event listener to the "Add" button inside the modal
    $('#submit-btn').on('click', function() {
        handleAddTask(event); // Call handleAddTask function
    });function renderTaskList() {
    $('#to-do-cards, #in-progress-cards, #done-cards').empty();

    todoList.forEach(task => {
        const taskCard = createTaskCard(task);
        $(`#${task.status}`).append(taskCard);
    });

    $('.task-card' ).draggable({
        revert: 'invalid',
        helper: 'clone',
        zIndex: 100
    });
    
    }
    function deleteTask(taskId) {
        // Find index of task in todoList
        const taskIndex = todoList.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            // Remove task from array
            todoList.splice(taskIndex, 1);
    
            // Update localStorage
            localStorage.setItem('tasks', JSON.stringify(todoList));
    
            // Re-render task list
            renderTaskList();
        }
    }