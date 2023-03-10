import Task from "./task-component.js";

let todos = JSON.parse(localStorage.getItem("todos")) || [];

window.addEventListener("load", () => {
  const addTastForm = document.querySelector(".add-task__form");
  const noTasks = document.querySelector(".tasks p");

  //   if (noTasks && todos.length > 0) {
  //     noTasks.remove();
  //   }

  addTastForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      text: e.target.elements.newTask.value,
      done: false,
    };
    todos.push(todo);

    // if (noTasks && todos.length > 0) {
    //   noTasks.remove();
    // }

    localStorage.setItem("todos", JSON.stringify(todos));
    e.target.reset();

    renderTodos();
  });
  renderTodos();
});

function renderTodos() {
  const tasks = document.querySelector(".tasks");
  const noTasks = document.createElement("p");
  noTasks.classList.add("no-tasks-p");
  if (document.querySelector(".no-tasks-p") && todos.length > 0) {
    document.querySelector(".no-tasks-p").remove();
  } else if (!document.querySelector(".no-tasks-p") && todos.length === 0) {
    noTasks.innerText = "You have nothing to do :(";
    tasks.append(noTasks);
  }

  const tasksWrapper = document.querySelector(".tasks-wrapper");
  tasksWrapper.innerHTML = "";
  todos.forEach((todo) => {
    let newTask = new Task(todo.text);
    tasksWrapper.appendChild(newTask.elem);

    const deleteBtn = newTask.elem.querySelector(".delete");
    deleteBtn.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    });

    const editBtn = newTask.elem.querySelector(".edit");
    const input = newTask.elem.querySelector(".task-text");
    editBtn.addEventListener("click", (e) => {
      if (editBtn.classList.contains("editing")) {
        editBtn.innerHTML = "Edit";
        todo.text =
          e.target.parentElement.previousElementSibling.firstElementChild.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        input.setAttribute("readonly", true);
        editBtn.classList.remove("editing");
        renderTodos();
      } else {
        editBtn.innerHTML = "Confirm";
        input.removeAttribute("readonly");
        editBtn.classList.add("editing");
      }
    });

    const checkbox = newTask.elem.querySelector(".task-check");
    if (todo.done) {
      checkbox.checked = true;
      input.style.textDecoration = "line-through";
    }

    checkbox.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      if (todo.done) {
        checkbox.checked = true;
        input.style.textDecoration = "line-through";
      } else {
        checkbox.checked = false;
      }
      renderTodos();
    });
  });
}
