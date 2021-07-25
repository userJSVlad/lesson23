let btnAdd = document.querySelector('#btn')
let changeBtn = document.querySelector('#change')
let deleteBtn = document.querySelector('#delete')

let getInfoFronServer = () => {
   fetch('http://localhost:3000/todos').then(res => {
      return res.json();
   }).then(data => {
      makeAllInfoOnPage(data);
   })
};

let makeAllInfoOnPage = (data) => {
   let boxInner = document.querySelector('#list');
   data.forEach(elem => {
      boxInner.innerHTML += `
      <li class="task">${elem.title}(${elem.time}days)</li>
      `
   });
}

let sendoInfo = () => {
   let task = document.querySelector('#task')
   let day = document.querySelector('#day')

   if (task.value === '' || day.value === '') {
      alert('заполните значение!')
      return;
   }
   fetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify({
         "title": task.value,
         "time": day.value
      }),
      headers: {
         'Content-Type': 'application/json;charset=utf-8'
      },
   }).then(res => {
      return res.json();
   }).then(icaport => {
      console.log(icaport)
   })
}

let changeAllInf = () => {
   let numberOfId = prompt('Напишите название id')
   titleName = prompt('Напишите новое загавие')
   timeStr = prompt('Напишите новое колличество дней')
   fetch(`http://localhost:3000/todos/${numberOfId}`, {
      method: "PUT",
      body: JSON.stringify({
         "title": titleName,
         "time": timeStr,
         "id": 5
      }),
      headers: {
         "Content-type": "application/json; charset=utf-8"
      }
   }).then(res => {
      return res.json()
   }).then(res => {
      topName(res)
   })
}

let deleteElement = () => {
   let delelElem = prompt('Номер id?')
   fetch(`http://localhost:3000/todos/${delelElem}`, {
      method: 'DELETE'
   })
}

deleteBtn.addEventListener('click', deleteElement)
changeBtn.addEventListener('click', changeAllInf)
btnAdd.addEventListener('click', sendoInfo)

getInfoFronServer();