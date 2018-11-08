document.addEventListener('DOMContentLoaded', () => {
const baseUrl = `http://localhost:3000/dogs`
const tablebody = document.getElementById('table-body')
const form = document.getElementById('dog-form')
fetch(baseUrl)
.then(res=>res.json())
.then(json=>
json.forEach(dog=>{
  tablebody.innerHTML += `<tr data-id='${dog.id}'><td>${dog.name}</td>
  <td>${dog.breed}</td>
  <td>${dog.sex}</td>
  <td><button class='edit'>Edit</button></td></tr>`
}))

tablebody.addEventListener('click',(event)=>{

  if(event.target.className==='edit'){
     form.children[0].value= event.target.parentElement.parentElement.children[0].innerText
     form.children[1].value= event.target.parentElement.parentElement.children[1].innerText
     form.children[2].value= event.target.parentElement.parentElement.children[2].innerText
     let submitid =event.target.parentElement.parentElement.getAttribute('data-id')
     form.setAttribute('submit-id',submitid)
  }
})

form.addEventListener('submit',(event)=>{
  event.preventDefault()
  let recordid=form.getAttribute('submit-id')
  if (event.target.children[3]){
    fetch(`${baseUrl}/${recordid}`,
    {
                method: 'PATCH',
                headers: {'Accept': 'application/json',
                          'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({
                   name: event.target.children[0].value,
                   breed: event.target.children[1].value,
                   sex: event.target.children[2].value
  })
})
fetch(baseUrl)
.then(res=>res.json())
.then(json=>{
  console.log(json)
  tablebody.innerHTML=''
  json.forEach(dog=>{
    tablebody.innerHTML += `<tr data-id='${dog.id}'><td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button class='edit'>Edit</button></td></tr>`
  })
})
}
})

})
