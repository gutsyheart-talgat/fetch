import {addTask, deleteTask, getTask,editTask} from './api'

const createEl = (tag, text, attrs = {}) => {
    const el = document.createElement(tag)
    el.textContent = text
    Object.keys(attrs).forEach((key) => {
      el.setAttribute(key, attrs[key])
    })
    return el
}

const block2 = document.querySelector('.block-2')
const createBtn = document.querySelector('.create-btn')
const textName = document.querySelector('.text-name')
const textContent = document.querySelector('.text-content')
const row = document.querySelector('.second-row')
const errorCont = document.querySelector('.error-cont')
const colorbtn = document.querySelectorAll('.color')
const errImg = createEl('img', null, {class:'error-img'})
const errorMsg = createEl('div', null, {class:"error-msg"})
const errorText = createEl('div', null, {class: "error"})

createBtn.addEventListener('click', function(){
    colorbtn.forEach(function(color){
        addTask({
            text: textName.value,
            desc: textContent.value,
            color: color.value
        })
            .then(() => {
                renderTaskList()
            })
            .catch((err) => {
                errorMsg.appendChild(errImg);
                errorText.textContent = err.message;
                errorMsg.appendChild(errorText);
                errorCont.appendChild(errorMsg)
            })
    })
})

const renderTask = (task,col) => {
    const item = createEl('div', null, {
        class: 'items mt-5 mb-5'
    });
    const container = document.createElement('div')
    container.classList.add('item-container')
    const header = document.createElement('header')
    header.classList.add('item-header')
    const headH1 = document.createElement('h1')
    headH1.classList.add('name-do')
    headH1.textContent = task.text
    const check = document.createElement('button')
    check.classList.add('check')
    check.addEventListener('click', function(){
        editTask(task.id, getDoneInfo)
            .then(() => {
                col.remove()
                col.classList.toggle('checked')
            })
    })
    const getDoneInfo = task.done ? {
        'done': false
    } : {
        'done': true
    }
    const main = document.createElement('main')
    const mainP = document.createElement('p')
    mainP.textContent = task.desc
    const footer = document.createElement('footer')
    footer.classList.add('item-footer')
    const colors = document.createElement('div')
    for(let i = 0; i < 5; i++){
        const color = document.createElement('button')
        color.classList.add('color-btn')
        color.classList.add(`color-${i+1}`)
        const cveta = [
            '#FFFBE3',
            '#FFD2D2',
            '#D3D2FF',
            '#D7FDD1',
            '#F8E1B6',
        ]
        color.addEventListener('click', function(){
            item.style.background = cveta[i]
            color.classList.toggle('clicked')
        })
        colors.appendChild(color)
    }
    const deletebtn = document.createElement('button')
    deletebtn.classList.add('urna')

    item.style.background = task.color

    block2.appendChild(row)
    row.appendChild(col)
    col.appendChild(item)
    item.appendChild(container)
    container.appendChild(header)
    container.appendChild(main)
    container.appendChild(footer)
    header.appendChild(headH1)
    header.appendChild(check)
    main.appendChild(mainP)
    footer.appendChild(colors)
    footer.appendChild(deletebtn)

    deletebtn.addEventListener('click', function(){
        deleteTask(task.id)
            .then(() => {
                col.remove()
                renderTaskList()
            })
    
    })

    console.log()
}

renderTaskList = () => {
    const col = createEl('div', null, {
        class: 'col-12 col-md-6 col-lg-3'
    });
    getTask()
      .then(tasklist => tasklist.forEach((item) => renderTask(item,col)))
      .catch((err) => {
        console.log(err.message)
        const divErr = createEl('div', err.message, {
            class: "error"
        })
        col.appendChild(divErr)
      })
}

renderTaskList()




