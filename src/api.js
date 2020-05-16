export default{
    edit: (id, body) => {
        return fetch(`http://localhost:3000/edit/${id}`, {
         method : 'PUT',
         headers :{ 'Content-Type': 'application/json' },
         body : JSON.stringify(body)
        })
        .then(response => {
        if(!response.ok) throw new Error('Ошибка!')
        })
    }
}
export default{
    get:() =>{
        return fetch('http://localhost:3000/list')
           .then(response => {
               if(!response.ok) throw new Error('Ошибка!')
               return response.json()
           })
    }
}
export default{
    add:(body) => {
        return fetch('http://localhost:3000/add', {
         method : 'POST',
         headers :{ 'Content-Type': 'application/json' },
         body : JSON.stringify(body),
        })
        .then(response => {
            if(!response.ok) throw new Error('Ошибка!')
        })
    } 
}
export default{
    delete:(id) => {
        return fetch(`http://localhost:3000/delete/${id}`, {
         method : 'DELETE',
        })
        .then(response => {
            if(!response.ok) throw new Error('Ошибка!')
        })
    }
}


