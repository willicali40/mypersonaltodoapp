const inputTask = document.querySelector("#inputTask");
const ul = document.querySelector("#ul");

let task = "";

inputTask.addEventListener("input", (e) => {
  if (e.target.value.trim() !== "") {
    task = e.target.value;
  }
});

inputTask.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    createTask(task);
  }
});

function createTask(task) {
  const template = `
    <li status="pending">
        <input type="checkbox" state="false" id="checkbox">
        <label state="false" id="label">${task}</label>
        <i class="fa-solid fa-xmark" state="false" id="close"></i>
    </li>
    `;
    ul.insertAdjacentHTML('beforeend', template)
    inputTask.value = '';
}

ul.addEventListener('click', (e) => {
    const element = e.target
    const parentElement = element.parentNode

    if (element.attributes.id.value === 'checkbox') {
        if (parentElement.attributes.status.value === 'pending') {
            parentElement.attributes.status.value = 'completed'
            const label = parentElement.querySelector('#label');
            label.style.textDecoration = 'line-through'
        } else if (parentElement.attributes.status.value === 'completed') {
            parentElement.attributes.status.value = 'pending'
            label.style.textDecoration = 'none'
        }
    } else if (e.target.attributes.id.value === 'close') {
        parentElement.remove()
    }
})