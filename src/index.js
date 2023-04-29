const inputTask = document.querySelector("#inputTask");
const ul = document.querySelector("#ul");
const counter = document.querySelector("#counter");
const allButton = document.querySelector("#all");
const pendingButton = document.querySelector("#pending");
const completeButton = document.querySelector("#complete");

let task = "";

inputTask.addEventListener("input", (e) => {
  if (e.target.value.trim() !== "") {
    task = e.target.value.trim();
  }
});

inputTask.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    let idGenerated = generateId()
    pushData(idGenerated);
    createTask(task, idGenerated);
    totalTasks()
  }
});

function generateId() {
    const date = Date.now().toString(30)
    const random = Math.random().toString(20).substring(2)
    return date + random
}

let data = []

function pushData(id) {
    data.push({
        id: id,
        status: 'pending',
        task: task,
    })

    storageLocalData()
}

function storageLocalData() {
    localStorage.setItem('data', JSON.stringify(data))
}

function createTask(task, id) {
  const template = `
    <li status="pending" id="${id}">
        <input type="checkbox" state="false" id="checkbox">
        <label state="false" id="label">${task}</label>
        <i class="fa-solid fa-xmark" state="false" id="delete"></i>
    </li>
    `;
    ul.insertAdjacentHTML('beforeend', template)
    inputTask.value = '';
}

ul.addEventListener('click', (e) => {
    const element = e.target;
    const parentElement = element.parentNode;
    const parentElementId = parentElement.attributes.id.value
    const label = parentElement.querySelector('#label');
    if (element.attributes.id.value === 'checkbox') {
        if (parentElement.attributes.status.value === 'pending') {
            parentElement.attributes.status.value = 'completed'
            data.map((ele) => {
                if (ele.id == parentElementId) {
                    ele.status = 'completed'
                }
            })
            label.style.textDecoration = 'line-through'
            storageLocalData()
            totalTasks()
        } else if (parentElement.attributes.status.value === 'completed') {
            parentElement.attributes.status.value = 'pending';
            label.style.textDecoration = 'none';
            data.map((ele) => {
                if (ele.id == parentElementId) {
                    ele.status = 'pending'
                }
            })
            storageLocalData()
            totalTasks()
        }
    } else if (e.target.attributes.id.value === 'delete') {
        const indexOfElement = data.findIndex((ele) => {
            return ele.id == parentElementId
        })
        data.splice(indexOfElement, 1)
        parentElement.remove()
        storageLocalData()
        totalTasks()
    }
})

window.addEventListener('load', () => {
    if (localStorage.getItem('data')) {
        data = JSON.parse(localStorage.getItem('data'))
        data.map(element => {
            const renderFromBrowser = `
            <li status="${element.status}" id="${element.id}">
            <input type="checkbox" state="false" id="checkbox" ${element.status == 'completed'? 'checked': ''}>
            <label state="false" id="label" ${element.status == 'completed'? 'style="text-decoration: line-through"': ''}>${element.task}</label>
            <i class="fa-solid fa-xmark" state="false" id="delete"></i>
            </li>
            `;
            ul.insertAdjacentHTML('beforeend', renderFromBrowser)
        });

    } else {
        console.log('no data');
    }
    totalTasks()
})

function totalTasks() {
    let tasks = 0
    data.map((ele) => {
        if (ele.status === 'pending') {
            tasks++
        }
    })
    counter.innerHTML = `
        ${tasks} pending ${tasks !== 1? 'tasks': 'task'} left
    `
}

completeButton.addEventListener('click', () => {
    let liId = ''
    data.map((ele) => {
        liId = ele.id
        if (ele.status !== 'completed') {
            document.getElementById(liId).style.display = 'none'
        }
    })
})


pendingButton.addEventListener('click', () => {
    let liId = ''
    data.map((ele) => {
        liId = ele.id
        if (ele.status !== 'pending') {
            document.getElementById(liId).style.display = 'none'
        }
        if (ele.status === 'pending') {
            document.getElementById(liId).style.display = 'block'
        }
    })

})


allButton.addEventListener('click', () => {
    data.map((ele) => {
        document.getElementById(ele.id).style.display = 'block'
    })
})