// ========================================
// 1. GET HTML ELEMENTS
// ========================================
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// ========================================
// 2. INITIALIZE DATA
// ========================================
let todos = [];

// ========================================
// 3. LOAD DATA ON PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    loadTodosFromStorage();
    renderTodos();
});

// ========================================
// 4. LOCALSTORAGE FUNCTIONS
// ========================================

function loadTodosFromStorage() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}

function saveTodosToStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// ========================================
// 5. RENDER FUNCTION (UPDATE UI)
// ========================================

function renderTodos() {
    // Clear current list
    todoList.innerHTML = '';

    // Loop through todos and create HTML for each
    todos.forEach(function(todo) {
        // Create list item
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed) {
            li.classList.add('completed');
        }

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('click', function() {
            toggleTodo(todo.id);
        });

        // Create text span
        const span = document.createElement('span');
        span.textContent = todo.text;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function() {
            deleteTodo(todo.id);
        });

        // Assemble and add to page
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// ========================================
// 6. CRUD FUNCTIONS
// ========================================

function addTodo() {
    const text = todoInput.value.trim();

    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    saveTodosToStorage();
    renderTodos();
    todoInput.value = '';
}

function deleteTodo(id) {
    todos = todos.filter(function(todo) {
        return todo.id !== id;
    });
    saveTodosToStorage();
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(function(todo) {
        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed
            };
        }
        return todo;
    });
    saveTodosToStorage();
    renderTodos();
}

// ========================================
// 7. EVENT LISTENERS
// ========================================

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});