const todoList = [];
const completedList = [];

// Add Todo
document.querySelector('#add-todo').addEventListener('click', () => {
  const taskInput = document.querySelector('#new-todo');

  const task = taskInput.value.trim();

  if (task) {
    todoList.push(task);

    taskInput.value = '';

    renderTodoList();
  }
});

// Render Active Todos
function renderTodoList() {
  const todoContainer = document.querySelector('#todo-list');

  todoContainer.innerHTML = '';

  todoList.forEach((task, index) => {

    const taskElement = document.createElement('div');
    taskElement.classList.add('todo-item');

    const taskText = document.createElement('span');
    taskText.textContent = task;

    // Complete Button
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';

    completeButton.addEventListener('click', () => {
      completedList.push(task);

      todoList.splice(index, 1);

      renderTodoList();
      renderCompletedList();
    });

    // Remove Button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';

    removeButton.addEventListener('click', () => {
      todoList.splice(index, 1);

      renderTodoList();
    });

    taskElement.appendChild(taskText);
    taskElement.appendChild(completeButton);
    taskElement.appendChild(removeButton);

    todoContainer.appendChild(taskElement);
  });
}

// Render Completed Todos
function renderCompletedList() {
  const completedContainer = document.querySelector('#completed-todos');

  completedContainer.innerHTML = '';

  completedList.forEach((task) => {

    const taskElement = document.createElement('div');

    taskElement.textContent = task;

    taskElement.classList.add('completed');

    completedContainer.appendChild(taskElement);
  });
}

// Remove All Todos
document.querySelector('#remove-all-todo').addEventListener('click', () => {
  todoList.length = 0;
  completedList.length = 0;

  renderTodoList();
  renderCompletedList();
});

// Theme Toggle
document.querySelector('#changetheme').addEventListener('click', () => {

  if (document.body.style.backgroundColor === 'white') {
    document.body.style.backgroundColor = '#333';
    document.body.style.color = '#fff';
  } else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = '#000';
  }
});