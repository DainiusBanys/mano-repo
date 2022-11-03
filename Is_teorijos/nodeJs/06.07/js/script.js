const fetchData = async (url, method = 'GET', body = {}) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(method != 'GET') 
        options.body = JSON.stringify(body)

    const tasks = await fetch(url, options)
        
    if(tasks.status === 200) {
        if(method == 'GET')
            return await tasks.json()
        else 
            return true
    } else { 
        return false
    }
}

const login = async (event) => {
    event.preventDefault()
    const form = event.target
    const email = form.querySelector('input[name="email"]').value
    const password = form.querySelector('input[name="password"]').value
    
    const login = await fetchData('/authenticate', 'POST', {
        email,
        password
    })
    if(login) {
        window.location = '/'
    } else {
        document.querySelector('div[role="alert"]').textContent = 'Nepavyko prisijungti'
        document.querySelector('div[role="alert"]').style.display = 'block'
    }
}