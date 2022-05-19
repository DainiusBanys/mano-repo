import express from 'express'
import multer from 'multer'
import { engine } from 'express-handlebars'
import { readFile, writeFile } from 'fs/promises'

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = file.originalname.split('.')
            // console.log(extension[extension.length - 1])
        callback(null, uniqueSuffix + '.' + extension[extension.length - 1])
    }
})

const upload = multer({
    storage: storage,
    filefilter: (req, file, callback) => {
        if (
            file.mimetype === 'image/gif' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png'
        ) {
            callback(null, true)
        } else {
            callback(new Error('Netinkamas failo formatas'), false)
        }
    }
})

const app = express()

//Handlebars sablonu prijungimo konfiguracija
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './templates')

//Express konfiguracijos prapletimas norint priimti POST metodu perduodamus duomenis
app.use(express.urlencoded({
    extended: false
}))

//Statiniu failu perdavimo i narsykle konfiguracijos eilute
app.use('/resources', express.static('assets'))

const file = './db/database.json'

app.get('/', (req, res) => {
    res.send('Uzklausa yra gauta')
})


app.post('/submit-image', upload.single('photo'), (req, res) => {
    res.send(req.body)
})

app.listen(3000)