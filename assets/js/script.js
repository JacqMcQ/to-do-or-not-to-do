$(document).ready(function() {
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

    // Function to create a task card
    function createTaskCard(task) {
        const taskCard = $('<div>').addClass('task-card').attr('data-id', task.id);

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

        // Delete button
        const deleteButton = $('<button>').addClass('delete-btn').text('Delete');
        deleteButton.on('click', function() {
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

        // Make task cards draggable
        $('.task-card').draggable({
            revert: 'invalid',
            helper: 'clone',
            zIndex: 100,
            start: function(event, ui) {
                $(this).addClass('dragging');
            },
            stop: function(event, ui) {
                $(this).removeClass('dragging');
            }
        });

        // Initialize Sortable for swim lanes
        $('#todo-cards, #in-progress-cards, #done-cards').sortable({
            connectWith: '.card-body',
            placeholder: 'task-placeholder',
            start: function(event, ui) {
                ui.item.addClass('dragging');
            },
            stop: function(event, ui) {
                ui.item.removeClass('dragging');

                // Update task status when dropped into a new lane
                const taskId = ui.item.data('id');
                const newStatus = ui.item.parent().parent().attr('id').replace('-cards', ''); // Get new status

                // Find the task in todoList and update its status
                const taskIndex = todoList.findIndex(task => task.id === taskId);
                if (taskIndex !== -1) {
                    todoList[taskIndex].status = newStatus;

                    // Update localStorage
                    localStorage.setItem('tasks', JSON.stringify(todoList));
                }
            }
        }).disableSelection(); // Disable text selection during dragging
    }

    // Function to delete a task
    function deleteTask(taskId) {
        todoList = todoList.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(todoList));
        renderTaskList();
    }

    // Event listener for form submission
    $('#addTaskForm').on('submit', function(event) {
        event.preventDefault();

        const newTask = {
            id: generateTaskId(),
            title: $('#taskTitle').val(),
            description: $('#taskDescription').val(),
            deadline: $('#taskDueDate').val(),
            status: 'todo' // Initial status
        };

        todoList.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(todoList));
        renderTaskList();

        $('#addTaskForm')[0].reset(); // Reset form fields
        $('#formModal').modal('hide'); // Close modal
    });

    // Initial rendering of existing tasks
    renderTaskList();

    // Event delegation for delete button click
    $(document).on('click', '.delete-btn', function() {
        const taskId = $(this).closest('.task-card').data('id');
        deleteTask(taskId);
    });

    // Optional: Add event listener to the "Add" button inside the modal
    $('#submit-btn').on('click', function(event) {
        event.preventDefault();
        $('#addTaskForm').submit(); // Trigger form submission
    });
});