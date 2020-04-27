fetch('http://localhost:3000/list')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('list')

    data.forEach(item => {
      const li = document.createElement('li')
      li.textContent = item.text
      li.setAttribute('data-num', item.id)

      if(item.done) li.classList.add('done')
      list.appendChild(li)
    })

  })
  .then(() => {
    const todoitems = document.querySelectorAll('li')
    todoitems.forEach(li => {
      li.addEventListener('click',()=>{
        const desc = document.createElement('div')
        desc.className = 'desc'
        const id = li.getAttribute('data-num')

        if(li.querySelector('.desc')) return
        fetch(`http://localhost:3000/list/${id}`)
        .then(response => response.json())
        .then(data => {
          desc.textContent = data.description
          desc.style.background = data.color
          li.appendChild(desc)
        })
      })
    })
  })
     