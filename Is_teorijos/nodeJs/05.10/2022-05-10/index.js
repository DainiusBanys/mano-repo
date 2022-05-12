import express from 'express'
import { engine } from 'express-handlebars'
import session from 'express-session'

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './templates')

app.use(session({
    secret: "sHcFjPyqBDKYMEss8GpbdeG8eRkZwUu3xrDzpTtaHwUtxcTaCuMmV2tM74xtx6ZcXXgWbCwLVe4xdWVjFNHPEaybPPQ9tCxpG6SpYXEzt7VpNvSwem7QTmVqvxHdWZZG",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 86400000
    }
}))

const credentials = {
    login: 'admin@bit.lt',
    password: 'labas1234',
    name: 'Dainius Banys'
}

app.get('/', (req, res) => {
    let returned = {}

    if (parseInt(Object.keys(req.query).length) > 0) {
        if (
            req.query.email != '' &&
            req.query.password != '' &&
            req.query.email === credentials.login &&
            req.query.password === credentials.password
        ) {
            //returned = {message: 'Prisijungimas pavyko', status: 'success'}
            req.session.loggedin = true
            req.session.user = credentials.name
            res.redirect('/account')
            return
        } else {
            returned = { message: 'Neteisingi prisijungimo duomenys', status: 'danger' }
        }
    }

    res.render('forma', { layout: 'login', title: 'banko aplikacija', returned })
})

app.get('/account', (req, res) => {
    if (!req.session.loggedin) {
        res.redirect('/')
        return
    }
    const data = {
        message: req.query.message,
        status: req.query.status,
        user: req.session.user
    }
    res.render('account', data)
})

app.get('/account/:vardas', (req, res) => {
    res.send('Vardas gautas ir yra: ' + req.params.vardas)
})

app.get('/transfer', (req, res) => {
    const data = {
        number: req.query.account_number,
        recipient: req.query.recipient,
        reference: req.query.reference
    }
    res.render('transfer', data)
})

app.listen(3000)