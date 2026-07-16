
let tasks = [];
let nextId = 1;

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');

// Render the full task list from the `tasks` array
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;

    // Task text (click it to toggle completed/incomplete)
    const span = document.createElement('span');
    span.className = 'task-text' + (task.completed ? ' completed' : '');
    span.textContent = task.text;
    span.addEventListener('click', () => toggleTask(task.id));

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '❌';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateCounter();
}

// Update the "X of Y tasks done" counter
function updateCounter() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  taskCounter.textContent = `${done} of ${total} tasks done`;
}

// Add a new task from the input value
function addTask() {
  const text = taskInput.value.trim();

  // Validation: empty input triggers an alert
  if (text === '') {
    alert('Please enter a task.');
    return;
  }

  tasks.push({ id: nextId++, text, completed: false });
  taskInput.value = '';
  taskInput.focus();
  renderTasks();
}

// Remove a task by id
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
}

// Wire up events
addBtn.addEventListener('click', addTask);

// Also allow pressing "Enter" while focused on the input
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Initial render (starts empty: 0 of 0 tasks done)
renderTasks();