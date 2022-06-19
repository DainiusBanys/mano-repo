import express from "express"
import mongoose from "mongoose"
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import orders from './models/orders.js'
// import bodyParser from "body-parser"

await mongoose.connect('mongodb://localhost/orders')

const app = express()
    // app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('./'))
const __dirname = dirname(fileURLToPath(
    import.meta.url))

app.use(express.json())
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

//  tasku paemimas is saraso
app.get('/api/tasks/all', async(req, res) => {
    try {
        const taskList = await Tasks.find()
        res.status(200).json(taskList)
    } catch {
        // res.status(500).end()
        res.sendStatus(500)

    }
})

// tasko pridejimas

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

// tasko redagavimas

app.put('/api/tasks/edit/:id', async(req, res) => {
    const id = req.params.id
    try {
        await Tasks.findByIdAndUpdate(id, req.body)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

// tasko trynimas

app.delete('/api/tasks/delete/:id', async(req, res) => {
    const id = req.params.id
    try {
        await Tasks.findByIdAndDelete(id)
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

app.listen(3000)