//Užduoties sprendimas

const button = document.querySelector('.addPhotoButton')

button.addEventListener('click', (e) => {
    e.preventDefault()
    
    const input = `<label>Dinamiškai pridėta nuotrauka</label>
                   <input class="form-control form-control mb-2" type="file" name="photo">`
    
    document.querySelector('.nuotraukos').innerHTML += input
})

const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = new FormData(form)
    
    fetch(form.getAttribute('action'), {
        method: 'POST',
        body: data
    })
    .then(resp => resp.text())
    .then(resp => console.log(resp))

})

const photos = document.querySelectorAll('.deletePhoto')

photos.forEach(element => {
    element.addEventListener('click', (e) => {
        element.parentElement.remove()
    })
})

// document.querySelector('.linkas').addEventListener('click', (e) => {
//     e.preventDefault()

//     fetch('/test', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: "indeksas=reiksme"
//     })
//     .then(resp => resp.text())
//     .then(resp => console.log(resp))

// })
