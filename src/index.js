document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementsByTagName('table')[0]
  const url = "http://localhost:3000/dogs"
  const form = document.getElementById('dog-form')

  fetch(url).then(function(response){
    return response.json()
  }).then(function(json){
    json.forEach(dog => {
      table.innerHTML += `<tr id="${dog.id}"><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit Dog</button></td></tr>`

    })
  })

  table.addEventListener("click", function(event){
    if (event.target.innerText === "Edit Dog"){
      fillForm(event)
    }
  })

  form.addEventListener("submit", function(event){
    if (event.target.dataset.id === undefined){
      alert("You Need to Select a Pupper")
    } else {
      editPupper(event)
    }
  })

  function fillForm(event){
    const form = document.getElementById('dog-form')
    row = event.target.parentElement.parentElement
    form[0].value = row.children[0].innerText
    form[1].value = row.children[1].innerText
    form[2].value = row.children[2].innerText
    form.setAttribute("data-id", `${row.id}`)
  }

  function editPupper(event){
    let form = event.target
    let id = form.dataset.id
    let dogName = form[0].value
    let dogBreed = form[1].value
    let dogSex = form[2].value

    patchPupper(id, dogName, dogBreed, dogSex)

    form.reset()
  }

  function patchPupper(id, dogName, dogBreed, dogSex){
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers:{
      "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: dogName,
        breed: dogBreed,
        sex: dogSex
      })
    })
  }
})
