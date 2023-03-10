export default class Task {
  elem = null;
  constructor(text) {
    this.text = text;
    this.#render();
  }

  #template() {
    return `
    <div class="task">
    <input type='checkbox' name='task-check' class='task-check'/>
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
}
