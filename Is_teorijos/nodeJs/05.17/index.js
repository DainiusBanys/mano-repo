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
    storage,
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype === 'image/gif' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png'
        ) {
            callback(null, true)
        } else {
            callback(new Error('Netinkamas failo formatas'), false)
        }
        // console.log(file)
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
app.use('/photos', express.static('uploads'))

const file = './db/database.json'

app.get('/', (req, res) => {
    res.render('gallery')
})


app.post('/submit-image', upload.single('photo'), async(req, res) => {
    if (!req.file) {
        res.send('Netinkamas failo formatas')
        return

    }
    try {
        const data = await readFile(file, 'utf8')
        let json = JSON.parse(data)
        json.push(req.file.filename)


        await writeFile(file, JSON.stringify(json), 'utf8')
        res.send('Nuotrauka sekmingai patalpinta')
    } catch {
        res.send('Nepavyko irasyti nuotraukos i duomenu baze')
    }
})


app.listen(3000)