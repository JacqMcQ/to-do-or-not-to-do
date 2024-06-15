
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
function renderTaskList() {
    $('#todo-cards').empty();
    
    todoList.forEach(task => {
        const taskCard = createTaskCard(task);
        $('#todo-cards').append(taskCard);
    });
}

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
});
