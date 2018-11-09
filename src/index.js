const BASE_URL  = 'http://localhost:3000/dogs'
let container   = ''
let dogForm     = ''
let target      = 0

function init() {
  container = document.getElementById('table-body')
  dogForm = document.getElementById('dog-form')
  displayAllDogs()
}

function displayAllDogs() {
  fetch(BASE_URL)
    .then(response => response.json())
    .then(dogs => dogs.forEach(renderDog))
}

function renderDog(dog) {
  container.innerHTML += `<tr data-dog-id="${dog.id}">
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button>Edit</button></td>
  </tr>`
}

function updateRowAttribute(dogId, newName, newBreed, newSex) {
  const dog = getDogRow(dogId)
  dog.children[0].textContent = (newName  || dog.children[0].textContent)
  dog.children[1].textContent = (newBreed || dog.children[1].textContent)
  dog.children[2].textContent = (newSex   || dog.children[2].textContent)
}

function getDog(id) {
  return fetch(BASE_URL)
    .then(response => response.json())
    .then(dogs => dogs.find(dog => String(dog.id) === id))
}

function populateFormInputs(dog) {
  const nameInput  = document.querySelector("input[type='name']")
  const breedInput = document.querySelector("input[type='breed']")
  const sexInput   = document.querySelector("input[type='sex']")

  nameInput.value = dog.name 
  breedInput.value = dog.breed 
  sexInput.value = dog.sex
}

function getDogRow(id) {
  const dogRows = document.querySelectorAll('tr')
  for (const dogRow of dogRows) {
    if (dogRow.dataset.dogId === String(id)) {
      return dogRow
    }
  }
}

function updateDogInfo(id, newInfo) {
  fetch(`${BASE_URL}/${id}`, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(newInfo)
  })
}

document.addEventListener('DOMContentLoaded', (e) => {
  init()

  container.addEventListener('click', (e) => {
    if (e.target.textContent.match(/edit/i)) {
      target = e.target.parentElement.parentElement.dataset.dogId
      getDog(target)
        .then(dog => populateFormInputs(dog))
    }
  })

  dogForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const [name, sex, breed] = e.target.children
    updateDogInfo(target, {'name':  name.value,
                           'breed': breed.value,
                           'sex':   sex.value})
    updateRowAttribute(target, name.value, breed.value, sex.value)
    this.reset()
  })
})