const list = document.querySelector('#list')

const input = document.querySelector('.input')
const addBtn = document.querySelector('.addBtn')

addBtn.addEventListener('click', () =>{
    fetchAddTask({text: input.value})
     .then(() => renderTask())

})
const createEl = (tag, text, attrs = {}) => {
    const el = document.createElement(tag)
    el.textContent = text
    Object.keys(attrs).forEach((key) => {
      el.setAttribute(key, attrs[key])
    })
    return el
  }



const renderTask = (task,list) => {
    const li = document.createElement('li')
    const text = createEl('div', task.text, { class: task.done ? 'text done' : 'text' })

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Удалить'
    deleteBtn.addEventListener('click', ()=>{
        fetchDeleteTask(task.id)
    })

    const editBtn = document.createElement('button')
    editBtn.textContent = 'Изменить'
    editBtn.addEventListener('click', () => {
        const input = document.createElement('input')
        input.type = 'text'
        input.value = task.text
        editBtn.disabled = true
        li.insertBefore(input, text)
        li.removeChild(text)
        input.addEventListener('blur', () => {
          // запрос на бэкенд PUT /edit/:id
          fetchEditTask(task.id, { text: input.value })
          // при успешном ответе страница перезагружается
        })
      })


    

    if(task.done) li.classList.add('done')
    li.appendChild(text)
    list.appendChild(li)
    li.appendChild(deleteBtn)
    li.appendChild(editBtn)
   
}
const fetchGetTask = () =>{
    return fetch('http://localhost:3000/list')
       .then(response => response.json())
}

renderTaskList = () => {
    const list = createEl('ul', null, {id:'list'})
    document.body.appendChild(list)
    fetchGetTask()
      .then(tasklist => tasklist.forEach((item) => renderTask(item,list)))
} // не могу правльно написать этот код для перерисовки

renderTaskList()


// fetch('http://localhost:3000/list')
// .then(response =>{
//     return response.json()
// })
// .then(tasklist =>{
//     tasklist.forEach(renderTask)
// })





const fetchAddTask = (body) => {
    return fetch('http://localhost:3000/add', {
     method : 'POST',
     headers :{ 'Content-Type': 'application/json' },
     body : JSON.stringify(body),
})
} 

const fetchEditTask = (id, body) => {
    return fetch(`http://localhost:3000/edit/${id}`, {
     method : 'PUT',
     headers :{ 'Content-Type': 'application/json' },
     body : JSON.stringify(body)
})
}
const fetchDeleteTask = (id) => {
    return fetch(`http://localhost:3000/delete/${id}`, {
     method : 'DELETE',
    
})
}
