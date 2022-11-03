import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import mongoose from "mongoose"
import orders from '../models/orders.js'
import products from '../models/products.js'
const router = express.Router()

await mongoose.connect('mongodb://localhost/orders')

const app = express()
const __dirname = dirname(fileURLToPath(
    import.meta.url))

//Teisingi prisijungimo duomenys
const credentials = {
    login: 'admin@bit.lt',
    password: '1234'
}


// controlleris (router)

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})
router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/templates/login.html')
})

router.get('/admin', (req, res) => {

    if (req.session.loggedin) {
        res.sendFile(__dirname + '/templates/admin_uzsakymai.html')
    } else {
        res.redirect('/login')
    }

})



// uzsakymo trynimas

router.delete('/order_delete/:id', async(req, res) => {
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





router.post('/api/orders/new', async(req, res) => {
    console.log(req.body)

    try {
        await orders.create(req.body)
        res.status(200).end()
    } catch {
        // res.status(500).end()
        res.sendStatus(500)

    }
})

router.post('/authenticate', (req, res) => {
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
router.get('/get_orders_list', async(req, res) => {
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

router.put('/order_edit/:id', async(req, res) => {
    const id = req.params.id
    try {
        await orders.findByIdAndUpdate(id, req.body)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

//*************************** Produktai *************************************** */

router.post('/api/products/new', async(req, res) => {
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
router.get('/get_products_list', async(req, res) => {
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
router.get('/admin_products', (req, res) => {

    if (req.session.loggedin) {
        res.sendFile(__dirname + '/templates/admin_prekes.html')
    } else {
        res.redirect('/login')
    }

})

// prekes trynimas

router.delete('/product_delete/:id', async(req, res) => {
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

router.put('/product_edit/:id', async(req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        await products.findByIdAndUpdate(id, req.body)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

export default router