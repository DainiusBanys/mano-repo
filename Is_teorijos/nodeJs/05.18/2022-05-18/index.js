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

        callback(null, uniqueSuffix + '.' + extension[extension.length - 1])
    }
})

const upload = multer({ 
    storage,
    fileFilter: (req, file, callback) => {
        if(
            file.mimetype === 'image/gif' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png'
        ) {
            callback(null, true)
        } else {
            callback(null, false)
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
app.use('/photos', express.static('uploads'))

const file = './db/database.json'

app.get('/', async (req, res) => {
    const images = await readFile(file, 'utf8')
    res.render('gallery', {images: JSON.parse(images)})
})

app.post('/test', (req, res) => {
    console.log(req.body)
    res.send('Informacija gauta')
})

app.post('/submit-image', upload.array('photo'), async (req, res) => {
    //req.file - Kuomet įkeliamas vienas failas naudojantis upload.single() midleware'u
    //req.files - Kuomet įkeliama daugiau failų

    //console.log(req.files)

    if(!req.files) {
        res.send('Netinkamas failo formatas')
        return
    }

    try {
        const data = await readFile(file, 'utf8')
        let json = JSON.parse(data)

        req.files.map(value => json.push(value.filename))

        //json.push(req.file.filename)

        await writeFile(file, JSON.stringify(json), 'utf8')

        res.send('Nuotrauka sekmingai patalpinta')
    
    } catch {
        res.send('Nepavyko įrašyti nuotraukos į duomenų bazę')
    }
})

app.listen(3000)