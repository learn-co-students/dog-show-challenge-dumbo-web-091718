document.addEventListener('DOMContentLoaded', init)
let BASE_URL = 'http://localhost:3000/dogs'


///function to output dogs to page after api fetch
function renderDogsToPage(dogArr) {
  let dogTable = document.getElementById('table-body')
  for (dog of dogArr) {
    let dogRow =`<tr data-id="${dog.id}"><td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><p style="cursor:default;color:blue;font-size:1em;padding-left:1.5em;padding-top:1em" class="edit-button" data-id="${dog.id}">Edit</p></td></tr>`
    dogTable.innerHTML += dogRow
  }
}


////function to send patch request
function sendEditedDog(body, dogId) {
  let url = BASE_URL +`/${dogId}`
  fetch(url, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(function(response) {
      return response.json();
    })
    .then(function(responseJson){
      console.log("succes")
    })
}

/// function to add dog to edit form and submit edited dog to patch fetch function
function addDogToEditForm(dogId, dogName, dogBreed, dogSex) {
  let dogForm = document.getElementById('dog-form')
  dogForm.children[0].value = dogName
  dogForm.children[1].value = dogBreed
  dogForm.children[2].value = dogSex
  dogForm.addEventListener("submit", (e) => {
    e.preventDefault()
    updatedName = dogForm.children[0].value
    updatedBreed = dogForm.children[1].value
    updatedSex = dogForm.children[2].value
    let body = {
      name: updatedName,
      breed: updatedBreed,
      sex: updatedSex
    }
    let dogRow = document.querySelector(`tr[data-id="${dogId}"]`)
    dogRow.children[0].innerHTML = updatedName
    dogRow.children[1].innerHTML = updatedBreed
    dogRow.children[2].innerHTML = updatedSex
    sendEditedDog(body, dogId)
  })
}


//// edit button creation
window.addEventListener("click", (event) => {
  if (event.target.className === "edit-button") {
    let dogId = parseInt(event.target.dataset.id)
    let dogRow = document.querySelector(`tr[data-id="${dogId}"]`)
    let dogName = dogRow.children[0].innerHTML
    let dogBreed = dogRow.children[1].innerHTML
    let dogSex = dogRow.children[2].innerHTML
    addDogToEditForm(dogId, dogName, dogBreed, dogSex)
  }
})


///api fetch function
function init() {
  fetch(BASE_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(responseJson){
    renderDogsToPage(responseJson)
  })
}


//
