import express from 'express'
import session from 'express-session'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import mongoose from "mongoose"
import orders from './models/orders.js'
import products from './models/products.js'

await mongoose.connect('mongodb://localhost/orders')

const app = express()
const __dirname = dirname(fileURLToPath(
    import.meta.url))

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

//Express konfiguracijos prapletimas norint priimti POST metodu perduodamus duomenis
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/templates/login.html')
})

app.get('/admin', (req, res) => {

    if (req.session.loggedin) {
        res.sendFile(__dirname + '/templates/admin_uzsakymai.html')
    } else {
        res.redirect('/login')
    }

})



// uzsakymo trynimas

app.delete('/order_delete/:id', async(req, res) => {
    const id = req.params.id
    console.log(id)

    if (req.session.loggedin) {
        try {
            await orders.findByIdAndDelete(id)
            res.sendStatus(200)
        } catch {
            res.sendStatus(500)
        }
    } else {
        console.log(req.session)
        res.redirect('/login')
    }
})





app.post('/api/orders/new', async(req, res) => {
    console.log(req.body)

    try {
        await orders.create(req.body)
        res.status(200).end()
    } catch {
        // res.status(500).end()
        res.sendStatus(500)

    }
})

app.post('/authenticate', (req, res) => {
    if (parseInt(Object.keys(req.body).length) > 0) {
        if (
            req.body.email != '' &&
            req.body.password != '' &&
            req.body.email === credentials.login &&
            req.body.password === credentials.password
        ) {
            // logged = true
            req.session.loggedin = true
            res.sendStatus(200)
            return
        } else {
            res.sendStatus(401)
        }
    }
    res.sendStatus(202)
})

//  uzsakymu paemimas is saraso
app.get('/get_orders_list', async(req, res) => {
    try {
        const orderList = await orders.find()
        res.status(200).json(orderList)
            // console.log(orderList)
    } catch {
        // res.status(500).end()
        res.sendStatus(500)

    }
})

// tasko redagavimas

app.put('/order_edit/:id', async(req, res) => {
    const id = req.params.id
    try {
        await orders.findByIdAndUpdate(id, req.body)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

//*************************** Produktai *************************************** */

app.post('/api/products/new', async(req, res) => {
    //  console.log(req.body)

    try {
        req.body.paveiksliukas = 'http://localhost:3000/images/' + req.body.paveiksliukas
        await products.create(req.body)
        res.status(200).end()
    } catch {
        // res.status(500).end()
        res.sendStatus(500)

    }
})

//  prekiu paemimas is DB
app.get('/get_products_list', async(req, res) => {
    try {
        const productList = await products.find()
        res.status(200).json(productList)
            // console.log(orderList)
    } catch {
        // res.status(500).end()
        res.sendStatus(500)

    }
})

//  prekiu sarasas
app.get('/admin_products', (req, res) => {

    if (req.session.loggedin) {
        res.sendFile(__dirname + '/templates/admin_prekes.html')
    } else {
        res.redirect('/login')
    }

})

// prekes trynimas

app.delete('/product_delete/:id', async(req, res) => {
    const id = req.params.id
    console.log(id)

    if (req.session.loggedin) {
        try {
            await products.findByIdAndDelete(id)
            res.sendStatus(200)
        } catch {
            res.sendStatus(500)
        }
    } else {
        console.log(req.session)
        res.redirect('/login')
    }
})

// tasko redagavimas

app.put('/product_edit/:id', async(req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        await products.findByIdAndUpdate(id, req.body)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})


app.listen(3000)