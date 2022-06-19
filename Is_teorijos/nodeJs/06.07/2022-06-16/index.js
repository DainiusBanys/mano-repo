import express from 'express'
import router from './controller/books.js'

const app = express()

//MVC 
//Model
//View X
//Controller

app.use('/books', router)

app.listen(3000)