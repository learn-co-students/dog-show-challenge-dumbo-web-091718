document.addEventListener('DOMContentLoaded', () => {

  const url = 'http://localhost:3000/dogs'
  const tableBody = document.getElementById('table-body')
  const tableContainer = document.querySelector('.table-container')
  const form = document.getElementById('dog-form')

  let nameInput = document.querySelector('input[name=name]')
  let breedInput = document.querySelector('input[name=breed]')
  let sexInput = document.querySelector('input[name=sex]')

  // display all dogs in the table
    fetch(url)
      .then(response => response.json())
      .then(json => {
        json.forEach(dog => {
          tableBody.innerHTML += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class='edit-btn' data-id='${dog.id}'>Edit Dog</button></td></tr>`
        })
      })

  // edit a dog
  tableContainer.addEventListener('click', (event) => {

    if (event.target.className === 'edit-btn') {

      let tdTag = event.target.parentNode.parentNode.firstElementChild // <td> Dog name </td>

      let nameField = tdTag.innerHTML
      let breedField = tdTag.nextElementSibling.innerHTML
      let sexField = tdTag.nextElementSibling.nextElementSibling.innerHTML
      var dogId = event.target.dataset.id
      // debugger

      nameInput.value = nameField
      breedInput.value = breedField
      sexInput.value = sexField
    }

      form.addEventListener('submit', (event) => {
        event.preventDefault()
        // debugger

        if (event.target[3].className === 'submit-btn') {

          fetch(url + '/' + dogId, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accepts': 'application/json'
            },
            body: JSON.stringify({
              name: nameInput.value,
              breed: breedInput.value,
              sex: sexInput.value
            })
          })
          .then(response => response.json())
          .then(json => {

            tdTag.innerHTML = nameInput.value
            tdTag.nextElementSibling.innerHTML = breedInput.value
            tdTag.nextElementSibling.nextElementSibling.innerHTML = sexInput.value

          })

          fetch(url)
            .then(response => response.json())
            .then( json => {
              tableBody.innerHTML = ""
              json.forEach(dog => {
                tableBody.innerHTML += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class='edit-btn' data-id='${dog.id}'>Edit Dog</button></td></tr>`
              })
            })


      }

    })

  })
})
