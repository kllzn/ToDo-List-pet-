export default class Task {
  elem = null;
  constructor(text) {
    this.text = text;
    this.#render();
  }

  #template() {
    return `
    <div class="task">
    <div class="content">
      <input type="text" class='task-text' value="${this.text}" name="task-text" readonly />
    </div>
    <div class="actions">
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </div>
  </div>
    `;
  }

  #render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.#template();
    this.elem = wrapper.firstElementChild;
  }

  //   addDeleteEvent(todos, todo) {
  //     const deleteBtn = this.elem.querySelector(".delete");

  //     deleteBtn.addEventListener("click", (e) => {
  //       todos = todos.filter((t) => t != todo);
  //       localStorage.setItem("todos", JSON.stringify(todos));
  //     });
  //   }

  addEditEvent() {
    const editBtn = this.elem.querySelector(".edit");

    const input = this.elem.querySelector("input");

    editBtn.addEventListener("click", () => {
      if (editBtn.classList.contains("editing")) {
        editBtn.innerHTML = "Edit";
        input.setAttribute("readonly", true);
        editBtn.classList.remove("editing");
      } else {
        editBtn.innerHTML = "Confirm";
        input.removeAttribute("readonly");
        editBtn.classList.add("editing");
      }
    });
  }
}
