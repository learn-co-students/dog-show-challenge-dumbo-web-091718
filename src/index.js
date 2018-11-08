document.addEventListener('DOMContentLoaded', () => {

  const BASE_URL = 'http://localhost:3000/dogs'
  const tableCon = document.querySelector('table')
  const tbodyCon = document.getElementById('table-body')
  const dogForm = document.querySelector('form')

  function init() {
    tbodyCon.addEventListener('click', editDog)
    dogForm.addEventListener('submit', submitDog)

    tbodyCon.innerHTML = ""
    fetch(BASE_URL)
    .then(res => res.json())
    .then(json => json.forEach(dog => {
      renderDog(dog)
    }))
  }

  function renderDog(dog) {
    tbodyCon.innerHTML += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id="${dog.id}">Edit</button></td></tr>`
  }

  function editDog() {
    if (event.target.innerText === 'Edit') {
      renderEditDog(event)
    }
  }

  function renderEditDog(event) {
    let dogID = event.target.dataset.id
    fetch(`${BASE_URL}/${dogID}`)
    .then(res => res.json())
    .then(function(json){
      let nameInput = dogForm[0]
      let breedInput = dogForm[1]
      let sexInput = dogForm[2]

      dogForm.dataset.id = json.id
      nameInput.value = json.name
      breedInput.value = json.breed
      sexInput.value = json.sex
    })
  }

  function submitDog() {
    event.preventDefault()

    let nameInput = dogForm[0]
    let breedInput = dogForm[1]
    let sexInput = dogForm[2]

    if (nameInput.value !== "" && breedInput.value !== "" && sexInput.value !== "") {
      updateDog(event)
    }
  }

  function updateDog(event) {
    let dogID = event.target.dataset.id
    let nameInput = dogForm[0]
    let breedInput = dogForm[1]
    let sexInput = dogForm[2]

    fetch(`${BASE_URL}/${dogID}`, {
      method: 'PATCH',
      headers:
      {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput.value,
        breed: breedInput.value,
        sex: sexInput.value
      })
    })
    .then(function(){
      dogForm.reset()
      init()})
  }

  init()
})
