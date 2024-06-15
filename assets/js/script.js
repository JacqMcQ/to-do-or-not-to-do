
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

        // Append elements to task card
        taskCard.append(titleElement, deadlineElement, descriptionElement);

        return taskCard;
    }

// Create a function to render the task list and make cards draggable
    // Function to render the task list and make cards draggable
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
    $('#to-do, #in-progress, #done').sortable({
        connectWith: '.card-body',
        placeholder: 'task-placeholder',
        start: function (event, ui) {
            ui.item.toggleClass('dragging');
        },
        stop: function (event, ui) {
            ui.item.toggleClass('dragging');

            // Update task status when dropped into a new lane
            const taskId = ui.item.data('task-id');
            const newStatus = ui.item.parent().parent().attr('id'); // Get parent card's ID

            // Find the task in todoList and update its status
            const taskIndex = todoList.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                todoList[taskIndex].status = newStatus;

                localStorage.setItem('tasks', JSON.stringify(todoList));
                renderTaskList(); // Re-render task list after status update
            }
        }
    });
    
    // Add event listener for form submission
$('#addTaskForm').on('submit', function(event) {
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


    $('#addTaskForm')[0].reset();
});

renderTaskList();

function renderTaskList() {
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