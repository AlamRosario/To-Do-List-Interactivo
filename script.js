document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', loadTasks); // Cargar tareas al iniciar la página

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value.trim();

    if (taskText !== '') {
        createTaskElement(taskText);
        saveTask(taskText, false); // Guardar la tarea en localStorage
        taskInput.value = '';
    } else {
        alert('Por favor, ingresa una tarea.');
    }
}

function createTaskElement(taskText, isCompleted = false) {
    let taskList = document.getElementById('taskList');
    let newTask = document.createElement('li');
    newTask.textContent = taskText;

    // Marcar como completada si ya estaba completada
    if (isCompleted) {
        newTask.classList.add('completed');
    }

    // Funcionalidad para marcar una tarea como completada
    newTask.addEventListener('click', function() {
        toggleTaskCompletion(newTask);
    });

    // Botón para eliminar la tarea
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
        deleteTask(newTask, taskText);
    });

    newTask.appendChild(deleteBtn);
    taskList.appendChild(newTask);
}

// Funcionalidad para marcar una tarea como completada
function toggleTaskCompletion(taskElement) {
    taskElement.classList.toggle('completed');
    updateTaskStatus(taskElement.textContent.replace('Eliminar', ''), taskElement.classList.contains('completed'));
}

// Guardar tareas en localStorage
function saveTask(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: isCompleted });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Cargar tareas desde localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Actualizar el estado de la tarea en localStorage
function updateTaskStatus(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskIndex = tasks.findIndex(task => task.text === taskText);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = isCompleted;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Eliminar una tarea
function deleteTask(taskElement, taskText) {
    taskElement.remove();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
