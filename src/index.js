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
    pushData();
    createTask(task);
  }
});

let identifier = 0;

let data = []

function pushData() {
    data.push({
        id: identifier,
        status: 'pending',
        task: task,
    })

    storageLocalData()
}

function storageLocalData() {
    localStorage.setItem('data', JSON.stringify(data))
}

function createTask(task) {
  const template = `
    <li status="pending" id="${identifier}">
        <input type="checkbox" state="false" id="checkbox">
        <label state="false" id="label">${task}</label>
        <i class="fa-solid fa-xmark" state="false" id="delete"></i>
    </li>
    `;
    ul.insertAdjacentHTML('beforeend', template)
    inputTask.value = '';
    console.log('identifier before add 1 ' + identifier);
    identifier++
    console.log(data);
    console.log('identifier after add 1 ' + identifier);
}

ul.addEventListener('click', (e) => {
    const element = e.target;
    const parentElement = element.parentNode;
    const parentElementId = parentElement.attributes.id.value
    const label = parentElement.querySelector('#label');

    if (element.attributes.id.value === 'checkbox') {
        if (parentElement.attributes.status.value === 'pending') {
            parentElement.attributes.status.value = 'completed'
            data[parentElementId].status = 'completed'
            console.log(data);
            label.style.textDecoration = 'line-through'
            storageLocalData()
        } else if (parentElement.attributes.status.value === 'completed') {
            parentElement.attributes.status.value = 'pending';
            label.style.textDecoration = 'none';
            data[parentElementId].status = 'pending'
            console.log(data);
            storageLocalData()
        }
    } else if (e.target.attributes.id.value === 'delete') {
        const indexOfElement = data.findIndex((ele) => {
            return ele.id == parentElementId
        })
        data.splice(indexOfElement, 1)
        parentElement.remove()

        console.log(data);
        storageLocalData()
        console.log(identifier);
        identifier--
        console.log(identifier);
    }
})

//localStorage.clear()


window.addEventListener('load', () => {
    if (localStorage.getItem('data')) {
        data = JSON.parse(localStorage.getItem('data'))
        console.log(data);

        data.map(element => {
            const renderFromBrowser = `
            <li status="${element.status}" id="${element.id}">
            <input type="checkbox" state="false" id="checkbox" ${element.status == 'completed'? 'checked': ''}>
            <label state="false" id="label" ${element.status == 'completed'? 'style="text-decoration: line-through"': ''}>${element.task}</label>
            <i class="fa-solid fa-xmark" state="false" id="delete"></i>
            </li>
            `;
            ul.insertAdjacentHTML('beforeend', renderFromBrowser)
            identifier = element.id
            console.log('identifier from localStorage is ' + identifier);
        });

    } else {
        console.log('no data');
    }
})