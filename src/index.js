document.addEventListener('DOMContentLoaded', () => {

  let tableBody = document.querySelector('#table-body')
  let formDog = document.querySelector('#dog-form')
  let page = document.querySelector('body')
  const dog_url = `http://localhost:3000/dogs`

  fetch(dog_url)
  .then(function(res){
    return res.json()
  })
  .then(function(json){
    console.log(json);

    json.forEach(function(dog) {
      tableBody.innerHTML += `<tr><td>${dog.name}</td>
      <td> ${dog.breed}</td>
      <td>${dog.sex}</td>
      <td><button data-id="${dog.id}">Edit</button></td></tr> `
    })
  })

  page.addEventListener('click', function(event){
    // debugger
    if (event.target.tagName === "BUTTON" ) {
      event.preventDefault()
      let dogId = event.target.dataset.id
      formDog.setAttribute('data-id', `${dogId}`)
      fetch(dog_url + `/${dogId}`)
      .then(function(res) {
        return res.json()
      })
      .then(function(dog){
        formDog[0].value = dog.name
        formDog[1].value = dog.breed
        formDog[2].value = dog.sex
        // debugger
      })
      formDog.addEventListener('submit', function(event) {
          event.preventDefault()
        // if (event.target.tagName === "FORM") {
          let name = event.target[0].value
          let breed = event.target[1].value
          let sex = event.target[2].value
          dogId = event.target.dataset.id
          // document.querySelector(`button[data-set="${json.id}"]`)
          // patch(name, breed, sex, dogId)
          // debugger
          fetch(`${dog_url}/${dogId}`, {
            method: "PATCH",

            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: name,
              breed: breed,
              sex: sex
            })
          })
          .then(function(res){
            return res.json()
          })
          .then(function (json) {
            window.location.reload()
          })







      })

    }
  })
  //
  // function patch(name, breed, sex, dogId){
  //   debugger
  //
  //
  // }

})
