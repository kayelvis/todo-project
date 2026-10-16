// =============================================================
// Day 3 Demo: Build a To-Do List with vanilla JavaScript
// Pattern: STATE  →  RENDER  →  EVENTS update state  →  RENDER again
// Live-code in this order. Follow DEMO-GUIDE.md. Reference: demo-finished.js
// =============================================================

// STEP 1: Select elements
const formElem = document.getElementById("todo-form");
const todoInputElem = document.getElementById("todo-input");
const ulElem = document.getElementById("todo-list");
const clearCompleteBtn = document.querySelector("#clear-completed");

// STEP 2: State. One array of task objects: { id, text, completed }
function loadTodoApp() {
    const storeTodos = JSON.parse(localStorage.getItem("tasks")) || [];
    return storeTodos;
}

function saveTodosToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(todoItems));

    renderTodoApp();
}

let todoItems = loadTodoApp();


// STEP 3: render(): clear the list, build one <li> per task, append
function createTodoTask(todo) {
    const liTaskElem = document.createElement("li");
    liTaskElem.className = "todo-item";

    const liTextElem = document.createElement("span");
    liTextElem.className = "todo-text";
    liTextElem.textContent = todo.text;

    const deleteBtnElem = document.createElement("button");
    deleteBtnElem.className = "delete-Btn";
    deleteBtnElem.type = "submit";
    deleteBtnElem.textContent = "DELETE";
    deleteBtnElem.addEventListener("click", (event) => deleteTodoTask(todo.id, event));

    // create a checkbox for the li(to do item) to toggle the completed state of the task
    const checkboxElem = document.createElement("input");
    checkboxElem.type = "checkbox";
    checkboxElem.className = "toggle";
    checkboxElem.checked = todo.completed;
    checkboxElem.addEventListener("click", () => toggleTodoTaskCompletion(todo.id));

    //Appending
    liTaskElem.append(liTextElem);
    liTaskElem.append(checkboxElem);
    liTaskElem.append(deleteBtnElem); //appending the button
    ulElem.appendChild(liTaskElem);

    return liTaskElem;
}

function renderTodoApp() {
    ulElem.textContent = "";
    todoItems.forEach((todo) => {
        createTodoTask(todo);
    })
}

// STEP 4: Add a task (form "submit" + validation)
function handleformSubmit(event) {
    event.preventDefault();
    const textInput = todoInputElem.value.trim();
    if (textInput === "") {
        alert("please type a task first");
        return;
    }
    const newTaskItem = {
        id: Date.now(),
        text: textInput,
        completed: false
    }
    todoItems.push(newTaskItem);
    saveTodosToLocalStorage();
    todoInputElem.value = "";
}

function toggleTodoTaskCompletion(id) {
    todoItems = todoItems.map((todo) => {
        if (todo.id === id){
            return {...todo, completed: !todo.completed};
        }
        return todo;
    });
    saveTodosToLocalStorage();
}


formElem.addEventListener("submit", handleformSubmit);

function deleteTodoTask(id, event) {
    event.stopPropagation();  // prevent triggering other events on the same element wheb clicking delete
    todoItems = todoItems.filter((todo) => todo.id !== id);
    saveTodosToLocalStorage();
}

// STEP 5: Toggle + delete with ONE listener on the list (delegation)


// STEP 6: Filters (All / Active / Completed)


// STEP 7: Footer: items left + clear completed


// STEP 8: Save to localStorage and load on start

