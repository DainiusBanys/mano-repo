import express from 'express'
import router from './controller/routes.js'
import session from 'express-session'

const app = express()

app.use(express.static('./'))
    //Express konfiguracijos prapletimas norint priimti POST metodu perduodamus duomenis
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Teisingi prisijungimo duomenys
const credentials = {
    login: 'admin@bit.lt',
    password: '1234'
}


app.use(express.static('./'))

//Sesijos priskyrimas prie express objekto
app.use(session({
    secret: 'Xc8BWMjxR5u2hyJaQ2R7UCUXAJeB4jKrXF722RXuumjZEfcD7AHuhCmEYgfCMeQ67J3Tqtumd6Nzf4ZKU9BJ3j9a4TLvFT2KmKrcaBTbdsYVWSYjXd54PRASMxfaX7Zz',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 864000000
    }
}))

session.loggedin = false

//MVC 
//Model
//View X
//Controller

app.use('/', router)

app.listen(3000)