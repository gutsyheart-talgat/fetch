export const addTask =(body) => {
    return fetch('http://localhost:5555/add', {
     method : 'POST',
     headers :{ 'Content-Type': 'application/json' },
     body : JSON.stringify(body),
    })
    .then(response => {
        if(!response.ok) throw new Error('Не удалось создать заметку!')
    })
} 
export const deleteTask =(id) {
    return fetch(`http://localhost:5555/delete/${id}`, {
     method : 'DELETE',
    })
    .then(response => {
        if(!response.ok) throw new Error('Ошибка удаления!')
    })
}
export const getTask =()=> {
    return fetch('http://localhost:5555/list')
       .then(response => {
           if(!response.ok) throw new Error('Ошибка загрузки!')
           return response.json()
       })
}
export const editTask =(id, body)=> {
    return fetch(`http://localhost:5555/edit/${id}`, {
     method : 'PUT',
     headers :{ 'Content-Type': 'application/json' },
     body : JSON.stringify(body)
    })
    .then(response => {
    if(!response.ok) throw new Error('Ошибка изменения!')
    })
}